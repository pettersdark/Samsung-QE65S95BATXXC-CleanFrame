# Guía en español · TV del dormitorio

[English](README.en.md) · [Inicio del repositorio](../../README.md) · [Capturas](SCREENSHOTS.md)

## Qué es esta versión

Adaptación de CleanFrame para Samsung **TQ48S93DAEXXC**, S93D OLED de 48 pulgadas. Probada en Tizen 9, ARMv7, firmware **T-PTMDDEUC-0090-2130.0**. Otras versiones y modelos necesitan sus propias pruebas. Los documentos antiguos del proyecto original describen una Samsung The Frame distinta; para esta adaptación manda esta guía y el [registro del proyecto](PROJECT.md).

La interfaz está en español. Traducir la documentación no cambia el idioma de la aplicación.

## Probar y modificar en el PC

1. Instala Node.js 22.13+ o 24+ y Python 3.10+.
2. Clona este repositorio y abre una terminal en su carpeta.
3. Ejecuta `npm ci` y después `python scripts/preview.py --public-fonts` (`python3` si tu sistema lo usa).
4. Abre http://localhost:4795/home/. Usa flechas para moverte, Intro para aceptar y Escape para volver. También puedes usar el ratón.
5. Edita los archivos y recarga la página. La vista previa no reproduce una emisión real ni abre aplicaciones o ajustes de Samsung.

## Uso con el mando

- **Personalizar** abre los ajustes de nuestro menú; **Ajustes TV** abre los ajustes rápidos de Samsung.
- En **Personalizar → Aplicaciones**, añade o elimina accesos y cambia el orden del carrusel. Usa Mover, elige la posición y guarda; puedes cancelar el movimiento.
- **TV en directo** también se puede añadir al carrusel. La lista de canales se desplaza verticalmente y las consultas se realizan en bloques de hasta 15. Recorre la lista para previsualizar; pulsa OK o haz clic en un canal para sintonizarlo y verlo a pantalla completa. También se conserva el botón Ver a pantalla completa.
- **Entradas** muestra las fuentes HDMI. Puedes añadirlas al carrusel.
- En **Personalizar → Entradas HDMI**, selecciona el puerto, cambia su nombre o elige su icono. Confirma con Guardar; Cancelar conserva el valor anterior. El nombre no altera el puerto físico.
- Los nombres editados dentro de Samsung no se sincronizan en tiempo real mediante la API pública usada aquí. Para nuevos nombres utiliza el editor de la aplicación.
- En apariencia, selecciona un fondo, modo claro/oscuro, diseño Dock/Lista y material. Hay 11 parejas día/noche: consolas, PC, arcade, interior de PC, consolas de sobremesa históricas, portátiles históricas, cine, cine en casa, maratón de series, estudio de guion y rincón de streaming.
- Los paneles ofrecen Volver e Inicio; el botón de retroceso del mando sigue funcionando. La hora usa 24 horas y muestra el día de la semana.

## Instalar en una TV propia

1. Instala Tizen Studio y las extensiones de TV y certificados de Samsung que correspondan.
2. Activa Developer Mode en Apps, introduce la IP del PC y reinicia la TV. PC y TV deben poder comunicarse por la red local.
3. Conecta la TV con Device Manager o SDB. Crea tus certificados de autor/distribuidor e incluye el DUID de tu TV mediante Certificate Manager.
4. Crea una identidad propia con el asistente oficial de proyectos. No reutilices la identidad ni los certificados de otro propietario.
5. Consulta `signing.example.json` y la sección de firma de [development.md](../development.md). La configuración real debe permanecer en `.local/`.
6. Construye el proyecto web con las herramientas oficiales, aplica la identidad propia al manifiesto generado y firma el `.wgt` con tu perfil. Instálalo mediante Tizen Studio y comprueba cada función con el mando.

Los scripts originales de firma, instalación e integración nativa contienen supuestos del equipo de referencia y algunos usan herramientas POSIX. **No son un instalador automático para Windows.** El `.wgt` público sin firmar sirve para inspección, y no sustituye la firma con tus certificados. No se incluye el paquete personal firmado.

Instalar la app y sustituir Inicio son operaciones distintas. La opción Samsung de abrir la última app puede restaurar Netflix o YouTube. El propietario confirmó el arranque con Iniciar con Smart Hub activado e Iniciar última aplicación desactivado, conservando nuestra asignación nativa de Inicio. Otros estados y futuros firmwares siguen sin verificar. No ejecutes los ayudantes nativos de otro modelo sin revisar sus protecciones y guardar una copia exacta de los valores originales. Restaura los valores originales antes de desinstalar una integración nativa o cambiar su identidad.

## Comprobaciones y futuras mejoras

```sh
node node_modules/eslint/bin/eslint.js app
python scripts/check.py
node --test scripts/test-device.mjs
python scripts/check-public.py
python scripts/export-public.py
```

Las pruebas del adaptador usan una TV simulada y no se conectan a hardware. Las pruebas de navegador de esta adaptación están en `scripts/bedroom-tests/`; consulta su README. Los tests históricos de navegador del proyecto original no son la referencia de aceptación de esta variante. `check:tools` requiere un entorno POSIX por su uso de `pty/termios` y no se ejecuta de forma nativa en Windows.

Antes de modificar, lee `AGENTS.md`, `docs/development.md` y `docs/interaction-behaviour.md`. Mantén JavaScript ES5 para la TV y prueba 1920×1080 y 1280×720, navegación, Volver/Inicio, guardado y cancelación. Conserva certificados, identidad y copia de recuperación privados del propietario existente. Una copia de GitHub no permite reconstruir una instalación personal si se han perdido sus certificados.
