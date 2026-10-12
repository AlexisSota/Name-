# Para ti, app para mi enamorada

App Android con ambiente de cueva oscura (inspirada en el estilo de Hollow Knight, con personajes originales).
Es una página web empaquetada con Capacitor, que se compila a un APK.

## 1. Personalizar

Edita solo `www/content.js`:

- `nombreElla` y `tuNombre`
- `fechaInicio`: desde cuándo están juntos (alimenta el contador)
- `zonas`: cada zona es una pantalla con título, texto y foto opcional
- `final`: el mensaje de la banca

Para agregar fotos, ponlas en `www/fotos/` y escribe la ruta en la zona, por ejemplo `"fotos/nosotros.jpg"`.

Para probarla rápido en el computador, abre `www/index.html` en el navegador (mejor en vista móvil).

## 2. Generar el APK (sin instalar nada, con GitHub)

1. Crea un repositorio nuevo en GitHub y sube esta carpeta completa.
2. Entra a la pestaña **Actions**, elige **Build APK** y pulsa **Run workflow**.
3. Al terminar (unos 5 minutos), abre la ejecución y descarga el archivo **para-ti-apk**. Dentro está `app-debug.apk`.
4. Pásale el APK a ella por WhatsApp, Drive o cable. Al abrirlo, Android le pedirá permitir instalar apps de origen desconocido.

## 2b. Generar el APK en tu computador (alternativa)

Requisitos: Node 20+, Android Studio (con JDK 21).

```
npm install
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

El APK queda en `android/app/build/outputs/apk/debug/app-debug.apk`.

## Cambiar el ícono

Después de `npx cap add android`, reemplaza los íconos en `android/app/src/main/res/mipmap-*`
(o usa Android Studio: clic derecho en `res` > New > Image Asset).

## Para actualizar contenido

Cambia `www/content.js`, vuelve a compilar y envía el APK nuevo. Ella lo instala encima de la anterior sin perder nada.
