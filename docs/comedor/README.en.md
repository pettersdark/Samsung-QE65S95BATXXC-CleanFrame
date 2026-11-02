# English guide · Dining-room TV

[Español](README.es.md) · [Repository](../../README.md) · [Screenshots](SCREENSHOTS.md)

## Target and evidence

Samsung QE65S95BATXXC, 65-inch S95B OLED (2022), firmware T-PTMDEUC-1720.7. SDB confirmed Tizen 6.5 ARMv7/32-bit. The owner confirmed general launcher operation and the requested test: broadcast TV at power-on, then our app on physical Home. See the [project record](PROJECT.md) for evidence limits.

## Preview and edit

1. Install Node.js 22.13+ or 24+, and Python 3.10+.
2. Clone this repository, run `npm ci`, then `python scripts/preview.py --public-fonts` (`python3` where appropriate).
3. Open http://localhost:4795/home/. Use arrows, Enter and Escape. The browser cannot launch real Samsung apps or broadcasts.
4. Read `AGENTS.md`, `docs/development.md`, `docs/interaction-behaviour.md` and this record first. Older documents describe different TVs; retain exact-device guards for native work.

## Controls

- Personalizar customizes the launcher; Ajustes TV opens Samsung quick settings.
- Añadir y ordenar adds installed apps, HDMI and optional Live TV shortcuts without the former nine-item limit. The order column scrolls with remote focus; moving, saving, removing and undo remain available beyond the first screen.
- The carousel retains fixed-size cards and scrolls. List layout navigates vertically. Failed writes preserve the previous saved state.
- Entradas HDMI allows per-port names and icons. Samsung source aliases are not synchronized live through the public API used here.
- Live TV: browse to preview; OK/click tunes and enters full-screen. The separate Ver a pantalla completa button remains. Errors, cancelled and superseded requests cannot trigger a late handoff.
- Crunchyroll, SmartTV Club and Twitch use bundled monochrome marks only when installed. Theme ink adapts to the background. There are 22 wallpapers, a 24-hour clock and weekday.

## Install on another TV

Install Tizen Studio Web IDE, Samsung TV extensions and Samsung Certificate Extension using Package Manager. Enable Developer Mode with the computer's actual IP, connect with SDB and verify model, firmware and capability. Create your own certificates including the TV's DUID and use an SDK-generated app identity. Real signing configuration belongs in ignored `.local/signing.json`, based on `signing.example.json`.

Build/sign with the official tools and your own identity/profile. The owner's SDK and profiles are not in Git; historical signing scripts have POSIX assumptions and are not an unattended Windows installer. Preserve an existing installation's author certificate and identity for updates.

## Physical Home and power-on are separate

On this S95B a temporary .NET Core 3.1 helper assigned only the native Home operation to our app. Original values were captured privately, and restore/reapply were tested. The helper does not write startup preferences. The owner reported Start with Smart Hub and Autorun Last App disabled, then confirmed broadcast TV at power-on and our app on physical Home.

Sanitized source is in `scripts/native-home/s95b-2022/`. Replace identity placeholders, verify exact model/firmware before staging, and preserve a private recovery baseline. Do not run the other TVs' .NET 6/Tizen 9 helpers here. Restore native routing using the matching private recovery tool before uninstalling. No root or security-policy changes are required.

## Validation

`npm run check` validates code/resources and the simulated device adapter. Current browser checks live in `scripts/bedroom-tests/` (the shared interface's historical name); see its README. They cover 49 edited shortcuts, 310 saved records and light/dark branding at 1080p/720p. Simulated adapter tests do not contact a TV. `check:tools` needs POSIX APIs, so it cannot run natively on Windows. Before publication run `python scripts/check-public.py` and `python scripts/export-public.py`.
