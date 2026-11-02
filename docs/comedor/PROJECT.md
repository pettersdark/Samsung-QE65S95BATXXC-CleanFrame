# TV Comedor · S95B

Samsung QE65S95BATXXC, S95B OLED de 65 pulgadas (2022). Firmware fotografiado T-PTMDEUC-1720.7. SDB confirmó Tizen 6.5, ARMv7 y 32 bits el 2 de noviembre de 2026. Conexión conseguida desde el PC original después de la prueba desde el portátil y de volver a la dirección de red por cable. No se ha aislado la causa del rechazo inicial.

Samsung QE65S95BATXXC, 65-inch S95B OLED (2022). Reported firmware T-PTMDEUC-1720.7; SDB confirmed Tizen 6.5 and ARMv7/32-bit on 2 November 2026. Desktop connection succeeded after the laptop test and returning to the wired address. The original connection failure has not been isolated.

Copia independiente basada en la versión del dormitorio 16161bf, incluyendo los 22 fondos y la selección de canal con OK/clic para verlo a pantalla completa. El foco mantiene la vista previa. La app consulta sus propias aplicaciones instaladas, sin nombres HDMI importados de otra TV.

Independent copy based on bedroom revision 16161bf, including 22 backgrounds and explicit channel activation for full-screen TV. Focus retains preview. Apps are discovered from this TV, without importing other TVs' installed-app inventory or HDMI names.

Estado confirmado por el propietario: menú funcionando; al encender aparece la TDT y Casa abre TV Comedor. Los valores originales se guardaron antes de asignar únicamente la operación nativa de Casa; se probaron restauración exacta y reaplicación. En el menú, el propietario dejó desactivados Iniciar con Smart Hub e Iniciar última aplicación. La prueba no garantiza todos los estados, fuentes externas ni firmware futuro.

Owner-confirmed state: launcher works; power-on shows broadcast TV and physical Home opens TV Comedor. Original values were captured before assigning only the Home operation; restore/reapply passed. The owner reported Start with Smart Hub and Autorun Last App disabled. This test does not guarantee every power state, external source or future firmware.

Identidad, certificados, IP y recuperación permanecen en archivos privados excluidos de Git. La configuración existente está en .local/s95b del proyecto local CleanFrame; la configuración de firma de esta copia está en .local/signing.json.

## Unlimited carousel and monochrome apps / Carrusel sin límite y apps monocromas · 2026-11-02

Removed the nine-shortcut Home limit and the 256-record restore truncation. Existing Home order is preserved, with the same initial default selection size. Users can add installed apps and available HDMI/Live TV shortcuts without an application-imposed maximum. The order editor scrolls independently, preserves focus, and supports moving/removing/undoing entries beyond the old limit. Storage failures retain the previous saved state.

Se elimina el límite de nueve accesos y el recorte de restauración a 256 registros. Se conservan el orden guardado y el tamaño de la selección inicial. Se pueden añadir apps instaladas y accesos HDMI/TDT disponibles sin máximo impuesto por la app. El editor desplaza su columna de orden y mantiene foco, mover/quitar/deshacer más allá del límite anterior. Los fallos de almacenamiento conservan el estado guardado anterior.

Added bundled theme-aware Crunchyroll and SmartTV Club marks, using their installed IDs or exact normalized names. Sources/licences are recorded in ADDITIONAL-SOURCES.json and third-party notices. Browser validation covers 49 interactively added/reordered shortcuts, a 310-entry saved catalogue with discovery unavailable, reload, long-list navigation, editor visibility, and both icons in light/dark at 1080p/720p. The owner accepted the update.

Se añaden marcas monocromas de Crunchyroll y SmartTV Club a partir de IDs/nombres reales. Fuentes y condiciones constan en los registros de recursos. Las pruebas de navegador cubren 49 accesos añadidos/ordenados, 310 guardados sin consulta disponible, recarga, navegación, visibilidad del editor e iconos claros/oscuros a 1080p/720p. El propietario da por válida esta actualización.

## Twitch and release archive / Twitch y archivo final

Twitch now resolves to a bundled monochrome Simple Icons mark through its actual installed ID or normalized name, with cached-name fallback. Browser checks cover theme-aware ink and preserved long lists. This icon update is part of the S95B checkout; the bedroom and games repositories were published independently with their validated previous icon set.

Twitch usa una marca monocroma empaquetada de Simple Icons, resuelta por ID instalado o nombre normalizado, incluyendo nombres guardados. Se ha probado su tinta por tema y la conservación de listas largas. Este cambio de Twitch pertenece a la copia S95B; dormitorio y juegos se publicaron por separado con su conjunto anterior validado.

Archive validation / Validación del archivo · 2026-11-02: ES5 lint, widget/resource checks, 22 simulated adapter tests, long-carousel/three-brand browser coverage, documentation links, public-source checks and unsigned public-font export passed. The sanitized .NET Core 3.1 Home template compiled successfully. Twitch was visually reviewed in browser preview; physical Home and broadcast-TV startup were confirmed by the owner before the icon-only update. Hosted checks run after publication.

Pasaron sintaxis ES5, recursos, 22 tests del adaptador, navegador para carrusel largo/tres marcas, enlaces, escaneo de publicación y exportación pública sin firmar. La plantilla .NET Core 3.1 compiló. Twitch se revisó visualmente en navegador; el propietario confirmó Casa y TDT al encender antes de este cambio de icono. GitHub ejecuta sus comprobaciones después de publicar.
