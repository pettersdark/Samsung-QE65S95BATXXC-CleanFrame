const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CLEANFRAME_BROWSER_CHANNEL ? { channel: process.env.CLEANFRAME_BROWSER_CHANNEL } : {}) });
  try {
    const page = await browser.newPage();
    await page.addInitScript(() => {
      window.__calls = []; window.__pendingTunes = []; window.__pendingHides = [];
      window.__tuneMode = 'success'; window.__holdHide = false;
      window.tizen = {
        application: {
          getAppsInfo: ok => ok([{ id: 'org.tizen.netflix-app', name: 'Netflix', show: true }]),
          getCurrentApplication: () => ({ appInfo: { id: 'nClrkHome1.FrameHome' } }),
          launch: (id, ok) => { window.__calls.push(['launch', id]); ok(); }
        },
        systeminfo: { getPropertyValue: (name, ok) => ok({ connected: [{ type: 'TV', number: 0 }], disconnected: [] }) },
        tvwindow: {
          getSource: () => ({ type: 'TV', number: 0 }),
          setSource: (source, ok) => { window.__calls.push(['source']); ok(source); },
          show: ok => { window.__calls.push(['preview']); ok(); },
          hide: ok => { window.__calls.push(['hide']); if (window.__holdHide) window.__pendingHides.push(ok); else ok(); }
        },
        tvchannel: {
          getChannelList: ok => ok([{ major: 1, minor: 0, channelName: 'La 1' }, { major: 3, minor: 0, channelName: 'TV3' }]),
          tune: (channel, listener) => {
            window.__calls.push(['tune', channel.major]);
            if (window.__tuneMode === 'pending') window.__pendingTunes.push({ channel, listener });
            else if (window.__tuneMode === 'no-signal') listener.onnosignal();
            else listener.onsuccess(channel);
          }
        }
      };
    });
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(process.env.CLEANFRAME_PREVIEW_URL || 'http://127.0.0.1:4795/home/');
    await page.waitForFunction(() => ShoreQA.ready() && !ShoreQA.state().catalog.loading);
    async function open() {
      await page.evaluate(() => ShoreQA.activate('util.live'));
      await page.waitForFunction(() => !document.getElementById('liveTVDialog').hidden && document.querySelectorAll('#liveTVChannels button').length === 2);
      await page.waitForFunction(() => window.__calls.some(c => c[0] === 'preview'));
      await page.evaluate(() => { window.__calls = []; });
    }
    async function assertNoViewer() {
      assert.equal(await page.evaluate(() => window.__calls.some(c => c[0] === 'launch' && c[1] === 'org.tizen.tv-viewer')), false);
    }
    for (const width of [1920, 1280]) {
      await page.setViewportSize({ width, height: width === 1920 ? 1080 : 720 });
      await open();
      await page.locator('#liveTVChannels button').nth(0).hover();
      await page.waitForTimeout(700); await assertNoViewer();
      await page.locator('#liveTVChannels button').nth(1).focus();
      await page.waitForFunction(() => window.__calls.some(c => c[0] === 'tune' && c[1] === 3));
      await assertNoViewer(); assert.equal(await page.locator('#liveTVDialog').isVisible(), true);
      await page.evaluate(() => { window.__calls = []; });
      if (width === 1920) await page.keyboard.press('Enter');
      else await page.locator('#liveTVChannels button').nth(1).click();
      await page.waitForFunction(() => window.__calls.some(c => c[0] === 'launch' && c[1] === 'org.tizen.tv-viewer'));
      const calls = await page.evaluate(() => window.__calls);
      assert.deepEqual(calls.filter(c => c[0] === 'tune'), [['tune', 3]]);
      assert.ok(calls.findIndex(c => c[0] === 'tune') < calls.findIndex(c => c[0] === 'hide'));
      assert.equal(calls.filter(c => c[0] === 'launch').length, 1);
      assert.equal(await page.locator('#liveTVDialog').isVisible(), false);
    }
    // A tuning error retains the list; it must never open the wrong channel full-screen.
    await open(); await page.evaluate(() => { window.__tuneMode = 'no-signal'; });
    await page.locator('#liveTVChannels button').nth(0).click();
    await page.waitForFunction(() => document.getElementById('liveTVStatus').textContent.includes('no tiene señal'));
    await assertNoViewer(); assert.equal(await page.locator('#liveTVDialog').isVisible(), true);
    await page.locator('#liveTVClose').click();
    // Back cancels a late successful acknowledgement.
    await open(); await page.evaluate(() => { window.__tuneMode = 'pending'; });
    await page.locator('#liveTVChannels button').nth(0).click();
    await page.locator('#liveTVClose').click();
    await page.evaluate(() => { const p = window.__pendingTunes.shift(); p.listener.onsuccess(p.channel); });
    await assertNoViewer();
    // Only the most recent explicit selection may hand off to the viewer.
    await open();
    await page.locator('#liveTVChannels button').nth(0).click();
    await page.locator('#liveTVChannels button').nth(1).click();
    await page.evaluate(() => { const p = window.__pendingTunes.shift(); p.listener.onsuccess(p.channel); });
    await assertNoViewer();
    await page.evaluate(() => { const p = window.__pendingTunes.shift(); p.listener.onsuccess(p.channel); });
    await page.waitForFunction(() => window.__calls.some(c => c[0] === 'launch'));
    // The original full-screen button remains an independent route.
    await open(); await page.locator('#liveTVFullscreen').click();
    await page.waitForFunction(() => window.__calls.some(c => c[0] === 'launch'));
    // Reopening the list cancels a previous handoff waiting for preview hide.
    await open(); await page.evaluate(() => { window.__holdHide = true; });
    await page.locator('#liveTVFullscreen').click();
    await open();
    await page.evaluate(() => { window.__holdHide = false; window.__pendingHides.shift()(); });
    await assertNoViewer(); assert.equal(await page.locator('#liveTVDialog').isVisible(), true);
    assert.deepEqual(errors, []);
    console.log('PASS: hover/focus only preview; Enter/click tunes then opens full-screen at 1080p/720p; separate button retained; failed, superseded and cancelled tunes cannot open a viewer.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
