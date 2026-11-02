# English guide · Bedroom TV

[Español](README.es.md) · [Repository home](../../README.md) · [Screenshots](SCREENSHOTS.md)

## About this version

CleanFrame adaptation for **Samsung TQ48S93DAEXXC**, the 48-inch S93D OLED. Tested on Tizen 9, ARMv7, firmware **T-PTMDDEUC-0090-2130.0**. Other firmware and models need separate verification. Older upstream documents describe a different Samsung The Frame; use this guide and the [project record](PROJECT.md) for this adaptation.

The application interface is Spanish. English documentation does not add an English UI setting.

## Preview and edit on a computer

1. Install Node.js 22.13+ or 24+, and Python 3.10+.
2. Clone this repository and open a terminal in its directory.
3. Run `npm ci`, then `python scripts/preview.py --public-fonts` (use `python3` where appropriate).
4. Open http://localhost:4795/home/. Navigate with arrows, confirm with Enter and return with Escape. Mouse controls also work.
5. Edit files and reload. The browser preview cannot show a real broadcast, launch TV applications or open Samsung settings.

## Remote controls and customization

- **Personalizar** customizes this launcher; **Ajustes TV** opens Samsung quick settings.
- Under **Personalizar → Aplicaciones**, add/remove shortcuts and reorder the carousel. Select Mover, choose the position and save it; a move can be cancelled.
- **TV en directo** (Live TV) can also be added to the carousel. The channel list scrolls vertically; channel queries use batches of at most 15. Browse to preview; press OK or click a channel to tune it and open full-screen TV. The separate Ver a pantalla completa button remains available.
- **Entradas** lists HDMI sources, which can be added to the carousel.
- Under **Personalizar → Entradas HDMI**, select a port to rename it or choose its icon. Guardar saves; Cancelar keeps the previous value. A custom name never changes the physical source mapping.
- Samsung's internal source names are not synchronized live through the public API used here. Use the launcher's name editor for new names.
- Appearance offers wallpapers, light/dark styles, Dock/List layouts and materials. The 11 day/night pairs cover consoles, PC, arcade, PC internals, historical home consoles, historical handhelds, cinema, home cinema, series marathon, script studio and streaming corner.
- Panels offer visible Volver (Back) and Inicio (Home) controls; remote Back remains available. The clock uses 24-hour time and includes the weekday.

## Install on your own TV

1. Install Tizen Studio and the relevant Samsung TV and certificate extensions.
2. Enable Developer Mode in Apps, enter the computer's IP address and restart the TV. Computer and TV must communicate over the local network.
3. Connect with Device Manager or SDB. Use Certificate Manager to create your author/distributor certificates and include your TV's DUID.
4. Generate your own application identity with the official project wizard. Do not reuse another owner's identity or certificates.
5. Read `signing.example.json` and the signing section in [development.md](../development.md). Real local configuration belongs in ignored `.local/` storage.
6. Build the web application with the official tools, apply your own identity to the generated manifest and sign the `.wgt` with your certificate profile. Install using Tizen Studio and verify each feature with the remote.

Upstream signing, installation and native integration tools retain reference-machine assumptions and some depend on POSIX utilities. **They are not an unattended Windows installer.** The public unsigned `.wgt` is for inspection and still requires your own signing process. Personal signed packages are excluded.

App installation and native Home replacement are separate operations. Samsung's last-app option may restore Netflix or YouTube. The owner confirmed launcher startup with Start with Smart Hub enabled and Autorun Last App disabled, retaining the custom native Home and home-app assignment. Other power states and future firmware remain unverified. Do not run native helpers for another model without reviewing their guards and saving the exact original recovery values. Restore those values before uninstalling native integration or changing its app identity.

## Checks and future changes

```sh
node node_modules/eslint/bin/eslint.js app
python scripts/check.py
node --test scripts/test-device.mjs
python scripts/check-public.py
python scripts/export-public.py
```

Device-adapter tests use simulated APIs and never connect to hardware. Adaptation-specific browser checks are in `scripts/bedroom-tests/`; see their README. Historical upstream browser tests are not this variant's acceptance baseline. `check:tools` needs a POSIX environment because it imports `pty/termios`; it cannot run natively on Windows.

Before modifying, read `AGENTS.md`, `docs/development.md` and `docs/interaction-behaviour.md`. Preserve ES5 runtime compatibility and check 1920×1080 and 1280×720, navigation, Back/Home, saving and cancellation. Retain the existing owner's private certificates, app identity and recovery baseline. A GitHub checkout cannot recreate an owner's signed installation if their certificates have been lost.
