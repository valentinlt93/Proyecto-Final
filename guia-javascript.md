# Guía de `javascript.js`

El archivo [javascript.js](../javascript.js) da comportamiento a la página: limpia la entrada, identifica algunas marcas, aplica comprobaciones y muestra el resultado. La validación es educativa; no confirma que una tarjeta sea real o pueda pagar.

## 1. Comprobación de Luhn

`validarLuhn(numero)` revisa si los dígitos cumplen el algoritmo de Luhn:

1. Recorre el número desde el último dígito hacia el primero.
2. Duplica uno de cada dos dígitos, empezando por el segundo desde la derecha.
3. Si el resultado de duplicar es mayor que 9, le resta 9.
4. Suma todos los valores. Si la suma es divisible por 10, devuelve `true`.

**Ejemplo sencillo:** si al terminar la suma es `70`, devuelve `true`, porque 70 se divide por 10. Si la suma es `72`, devuelve `false`.

`validarTarjeta(numero)` primero exige que haya solo dígitos. La expresión `/^\d+$/` significa “uno o más dígitos, desde el principio hasta el final”. Si encuentra letras o guiones, devuelve `false`; si no, llama a `validarLuhn`.

## 2. Datos de las marcas

`LARGO_POR_MARCA` guarda la longitud aceptada por este proyecto: 16 dígitos para Visa y Mastercard, y 15 para American Express. `NOMBRE_MARCA` guarda los nombres que se muestran en los mensajes.

`PLACEHOLDER_TARJETA` contiene los puntos que se ven antes de ingresar un número.

## 3. Detectar marca y prefijo

`detectarMarca(numero)` mira los primeros dígitos y devuelve `visa`, `amex`, `mastercard` o `none`.

- Visa empieza por `4`.
- American Express empieza por `34` o `37`.
- Mastercard usa los prefijos contemplados en la expresión: `51`–`55` y `2221`–`2720`.

`esPrefijoCompatible(numero)` comprueba si lo que se ha escrito hasta el momento todavía podría ser un prefijo aceptado. Esto permite avisar pronto si los primeros dígitos no coinciden con las marcas contempladas.

## 4. Mostrar el número de forma legible

`formatearNumero(numero, marca)` separa los dígitos con espacios. Para American Express usa grupos de 4, 6 y 5; para las otras marcas, grupos de hasta 4.

`enmascararNumero(numero, marca)` reemplaza todos los dígitos salvo los últimos cuatro por puntos y luego los agrupa. Por ejemplo, para la entrada de prueba `1234567812345678`, la tarjeta visual muestra `•••• •••• •••• 5678`.

## 5. Reunir las comprobaciones

`verificar(numero)` revisa en orden:

1. Que el campo no esté vacío.
2. Que se reconozca una marca aceptada.
3. Que la longitud coincida con la marca.
4. Que pase el algoritmo de Luhn.

Devuelve un objeto con `ok`, `titulo` y `descripcion`. Por ejemplo, `ok: false` indica que no pasó una comprobación y permite mostrar el mensaje apropiado.

## 6. Conectar con la página

El bloque `if (typeof document !== "undefined")` solo busca elementos HTML cuando el código está ejecutándose en un navegador. Así, las funciones de validación también se pueden probar por separado en un entorno JavaScript sin página.

Dentro del bloque:

- Se buscan el campo, la tarjeta visual y los elementos del mensaje mediante sus `id`.
- `mostrarResultado(...)` actualiza el mensaje, el ícono, los estilos y el atributo accesible `aria-invalid`.
- `actualizarCampo()` quita todo lo que no sea un dígito, limita la entrada a 19 caracteres, detecta la marca y actualiza la vista de la tarjeta.
- Los eventos `input` y `change` ejecutan `actualizarCampo` cuando cambia el campo.
- El evento `submit` evita el envío normal del formulario, ejecuta `verificar` y muestra el resultado.

`preventDefault()` es importante: impide que la página se recargue o intente enviar el formulario.

## Cómo explicarlo en una presentación

Puedes resumir el flujo así: **“Primero limpio la entrada, después identifico la marca y su longitud, y al final compruebo Luhn. El resultado actualiza el mensaje y la tarjeta visual.”**

Aclara que Luhn detecta errores de formato, pero no verifica la existencia, el saldo ni la autorización de una tarjeta.
