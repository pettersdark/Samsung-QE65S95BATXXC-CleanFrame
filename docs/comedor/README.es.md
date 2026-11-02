# Guía en español · TV Comedor

[English](README.en.md) · [Repositorio](../../README.md) · [Capturas](SCREENSHOTS.md)

## Destino y resultados

Samsung QE65S95BATXXC, S95B OLED 65 pulgadas (2022), firmware T-PTMDEUC-1720.7. SDB confirmó Tizen 6.5 ARMv7/32 bits. El propietario confirmó el menú y la prueba de TDT al encender y Casa para abrir nuestra app. Consulta el [registro](PROJECT.md) para los límites de esta evidencia.

## Probar y modificar

1. Instala Node.js 22.13+ o 24+ y Python 3.10+.
2. Clona el repositorio, ejecuta `npm ci` y `python scripts/preview.py --public-fonts` (`python3` si corresponde).
3. Abre http://localhost:4795/home/. Flechas para navegar, Intro para aceptar y Escape para volver. La vista previa no abre aplicaciones ni emisiones reales de Samsung.
4. Lee `AGENTS.md`, `docs/development.md`, `docs/interaction-behaviour.md` y este registro antes de modificar. Los documentos antiguos describen otras TVs: conserva las protecciones del modelo y firmware de esta unidad.

## Uso

- Personalizar cambia nuestro menú; Ajustes TV abre los ajustes rápidos Samsung.
- Añadir y ordenar permite incorporar apps instaladas, HDMI y TV en directo. No hay límite artificial de nueve accesos. La lista de orden se desplaza con el mando; Mover/Guardar posición, Quitar y Deshacer funcionan también al final de listas largas.
- El carrusel conserva su tamaño de tarjeta y se desplaza; Lista ofrece navegación vertical. Los fallos de guardado conservan el estado anterior.
- En Entradas HDMI puedes editar nombres e iconos por puerto. Los nombres Samsung no se sincronizan en directo mediante la API pública usada aquí.
- TV en directo: recorrer canales previsualiza; OK o clic sintoniza y abre pantalla completa. También puedes usar Ver a pantalla completa. Los errores y peticiones canceladas no provocan aperturas posteriores.
- Crunchyroll, SmartTV Club y Twitch usan logos monocromos; solo aparecen si la app está instalada. La tinta se adapta al fondo. Hay 22 fondos, hora de 24 horas y día de la semana.

## Instalar en otra TV

Instala Tizen Studio Web IDE y las extensiones Samsung TV y Samsung Certificate Extension mediante Package Manager. Activa Developer Mode con la IP real del PC, conecta por SDB y confirma modelo, firmware y capability. Crea certificados propios con el DUID de tu TV y una identidad de app generada por el SDK. La configuración real se guarda en `.local/signing.json`, basada en `signing.example.json`.

Construye/firma mediante las herramientas oficiales con tu identidad y certificados. El SDK y los perfiles del propietario no están en Git; los scripts históricos de firma incluyen supuestos POSIX y no son un instalador automático Windows. Conserva la identidad y el certificado de autor para actualizar una instalación existente.

## Casa y encendido: dos funciones separadas

En esta S95B, un ayudante temporal .NET Core 3.1 asignó únicamente la operación nativa de Casa a nuestra app. Se consultaron y guardaron los originales y se probó restaurar/reaplicar. El ayudante no escribe preferencias de arranque. El propietario dejó desactivadas Iniciar con Smart Hub e Iniciar última aplicación y confirmó TDT al encender, seguida de nuestra app al pulsar Casa.

La fuente saneada está en `scripts/native-home/s95b-2022/`. Requiere sustituir los ejemplos por tu identidad, verificar el modelo/firmware antes de ejecutar y conservar una copia privada de recuperación. No aplicar los ayudantes .NET 6/Tizen 9 de las otras TVs. Antes de desinstalar una integración, restaura su asignación original con las herramientas privadas correspondientes. No se requiere root ni cambiar políticas de seguridad.

## Validación

`npm run check` comprueba código/recursos y adaptador simulado. Las pruebas actuales de navegador están en `scripts/bedroom-tests/` (nombre histórico de la interfaz compartida); su README explica cómo ejecutarlas. Incluyen 49 accesos editados, 310 registros guardados y logos en temas claro/oscuro a 1080p/720p. Las pruebas del adaptador no conectan a una TV. `check:tools` requiere POSIX; Windows nativo no dispone de `pty/termios`. Antes de publicar: `python scripts/check-public.py` y `python scripts/export-public.py`.
