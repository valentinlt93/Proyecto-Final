# Guía de `styles.css`

El archivo [styles.css](../styles.css) controla la apariencia de la página: colores, tamaños, espacios, estados y adaptación a pantallas pequeñas. No realiza la validación del número; eso lo hace [javascript.js](../javascript.js).

## 1. Colores reutilizables

En `:root` se definen variables como `--bg` (fondo), `--text` (texto), `--success` (éxito) y `--error` (error).

Una variable se usa con `var(...)`. Por ejemplo, `background: var(--bg)` aplica el color de fondo definido en `--bg`. Esto ayuda a mantener los colores consistentes y facilita cambiarlos.

## 2. Colores según la marca

Las reglas `[data-brand="visa"]`, `[data-brand="amex"]` y `[data-brand="mastercard"]` cambian el color de acento según el valor de `data-brand` en el HTML.

JavaScript actualiza ese atributo cuando reconoce los primeros dígitos. CSS usa el cambio para adaptar el botón, la tarjeta y el logo.

## 3. Reglas generales y estructura

El selector `*` aplica una base común a todos los elementos. `box-sizing: border-box` hace que el ancho incluya el relleno y el borde, lo que vuelve más fácil calcular tamaños.

Las reglas de `body`, `.page` y `.card-container` centran el contenido y limitan su ancho para que no se extienda demasiado en pantallas grandes.

## 4. Apariencia de la tarjeta

Las reglas de `.card` crean la tarjeta con degradado, bordes redondeados y sombra. Las variantes por marca cambian su fondo.

Las clases `.chip`, `.brand-logo` y sus variantes dibujan el chip y los logos con CSS. `.card-number-display` y `.card-bottom` organizan el número visible y los datos de ejemplo.

La regla `.brand-logo { display: none; }` oculta los logos; las reglas específicas de cada marca muestran solo el que corresponde.

## 5. Errores y formulario

`.card-container.has-error` resalta y mueve brevemente la tarjeta cuando hay un error. La animación se define en `@keyframes sacudir`.

Las reglas `.checkout-form`, `.form-group`, `.btn-verify` y `.status-box` dan estilo al formulario, al campo, al botón y al área de resultado.

Las clases `.status-box.valid` y `.status-box.invalid` cambian los colores del resultado. JavaScript agrega o quita esas clases según lo que se haya comprobado.

## 6. Adaptación y movimiento

`@media (max-width: 560px)` reduce algunos tamaños para que la tarjeta y el formulario se vean mejor en celulares.

`@media (prefers-reduced-motion: reduce)` desactiva la animación de error si el sistema operativo de la persona indica que prefiere menos movimiento.

## Cómo explicarlo en una presentación

Puedes señalar que el CSS separa el diseño de la lógica: **“JavaScript informa el estado mediante clases y atributos; CSS decide cómo se ve cada estado.”** Por ejemplo, cuando JavaScript agrega `invalid`, el resultado aparece con colores de error.
