# Guía de `index.html`

Este archivo arma el contenido de la página. HTML define qué elementos existen; el CSS les da estilo y JavaScript hace que respondan a lo que escribe la persona.

## 1. Información inicial

`<!DOCTYPE html>` indica que se usa HTML moderno. `<html lang="es">` informa que el contenido está en español.

Dentro de `<head>` se encuentran datos que no aparecen como contenido principal:

- `charset="UTF-8"` permite mostrar correctamente letras y símbolos.
- `viewport` ayuda a que la página se adapte a celulares.
- `<title>` define el nombre que aparece en la pestaña del navegador.
- `<link rel="stylesheet" href="styles.css">` conecta [styles.css](../styles.css).

## 2. Contenido principal

`<main>` contiene el contenido principal de la página. Dentro está `.card-container`, que agrupa la tarjeta visual y el formulario.

El atributo `data-brand="none"` indica que todavía no se detectó una marca. JavaScript lo cambia a `visa`, `amex` o `mastercard`; CSS usa ese valor para cambiar los colores y mostrar el logo correspondiente.

## 3. Vista de la tarjeta

El bloque `.card` muestra una tarjeta decorativa. Contiene los logos, el número que se ve en pantalla y datos de ejemplo del titular y vencimiento.

- `id="numero-visual"` permite que JavaScript actualice el número mostrado.
- `aria-hidden="true"` indica que esta tarjeta es decorativa para las tecnologías de asistencia; el resultado importante se informa en el formulario.

La tarjeta no representa una tarjeta real: sus datos son de muestra.

## 4. Formulario

El formulario contiene el campo para ingresar el número, el botón de verificación y el área donde aparece el resultado.

- `<label for="numero-tarjeta">` conecta el texto de la etiqueta con el campo del mismo `id`.
- `inputmode="numeric"` sugiere un teclado numérico en celulares.
- `maxlength="19"` limita lo que se puede escribir; JavaScript también aplica su propio límite.
- `autocomplete="cc-number"` da una pista al navegador sobre el tipo de dato.
- `novalidate` evita que el navegador muestre sus propios mensajes de validación: el proyecto muestra los suyos.
- El formulario no tiene `action` ni `name`, y JavaScript cancela su envío. Así, la comprobación ocurre en la página, no en un servidor.

El bloque `#estado` usa `role="status"` y `aria-live="polite"` para que los lectores de pantalla puedan anunciar el resultado cuando cambia.

## 5. Conexión con JavaScript

Al final, `<script src="javascript.js"></script>` carga [javascript.js](../javascript.js), el código que limpia y verifica el número. Se coloca después del contenido para que los elementos de la página ya existan cuando JavaScript los busca.

## Recorrido de ejemplo

1. La persona escribe un número en el campo.
2. JavaScript cambia el texto de la tarjeta y actualiza el estado.
3. Al presionar **Verificar tarjeta**, el formulario muestra el resultado dentro de la página.
