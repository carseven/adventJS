/* 
Santa Claus is starting to receive a lot of letters but they have some formatting problems. To improve readability, he will write a program that given a text, formats it according to the following rules:
* Remove spaces at the beginning and end of the prase
* Remove multiple spaces and leave only one
* Leave a space after each comma and point
* Remove spaces before comma or point
* Questions must only end with a question mark
* The first letter of each sentence must be capitalized
* Put the word "Santa Claus" in uppercase if it appears in the letter
* Put a point at the end of the sentence if it does not have punctuation

Letters are written in English and here we have an example:
```
fixLetter(` hello,  how are you??     do you know if santa claus exists?  i really hope he does!  bye  `)
// Hello, how are you? Do you know if Santa Claus exists? I really hope he does! Bye.

fixLetter("  Hi Santa claus. I'm a girl from Barcelona , Spain . please, send me a bike.  Is it possible?")
// Hi Santa Claus. I'm a girl from Barcelona, Spain. Please, send me a bike. Is it possible?
```
Note:
* You do not have to worry about punctuation marks other than comma, point or question mark.
* Make sure you respect break lines and original whitespaces.
*/

function fixLetter(letter: string): string {
  return (
    letter
      // ✓ Eliminar espacios al inicio y al final
      .trim()
      // ✓ Las preguntas sólo deben terminar con un signo de interrogación
      .replace(/([.,?!])(?=\1)/g, "")
      // ✓ Quitar espacios antes de coma o punto
      .replace(/(\s+([,.?!]))/g, (m, $1, $2) => $2)
      // ✓ Dejar un espacio después de cada coma, punto o interrogación
      .replace(/([!?.,])\s+/g, "$1 ")
      // ✓ La primera letra de cada oración debe estar en mayúscula
      .replace(/(^|[.!?]\s+)([a-z])/g, (m, $1, $2) => $1 + $2.toUpperCase())
      .replace(/(^[a-z])/g, (m, $1) => $1.toUpperCase())
      // ✓ Eliminar múltiples espacios en blanco y dejar sólo uno
      .replace(/\s+/g, " ")
      // ✓ Poner en mayúscula la palabra "Santa Claus" si aparece en la carta
      .replace(/(santa claus)/gi, "Santa Claus")
      // ✓ Poner un punto al final de la frase si no tiene puntuación
      .replace(/([A-z])$/, (m, $1) => `${$1}.`)
  );
}

describe("Day 16", () => {
  test("Test 1", () => {
    expect(
      fixLetter(
        ` hello,  how are you??     do you know if santa claus exists?  i really hope he does!  bye  `
      )
    ).toBe(
      "Hello, how are you? Do you know if Santa Claus exists? I really hope he does! Bye."
    );
  });

  test("Test 2", () => {
    expect(
      fixLetter(
        "  Hi Santa claus. I'm a girl from Barcelona , Spain . please, send me a bike.  Is it possible?"
      )
    ).toBe(
      "Hi Santa Claus. I'm a girl from Barcelona, Spain. Please, send me a bike. Is it possible?"
    );
  });

  test("Test 3", () => {
    expect(fixLetter("  hi    santa    claus ")).toBe("Hi Santa Claus.");
  });

  test("Test 4", () => {
    expect(
      fixLetter("  hi    santa    claus . santa claus is the best  ")
    ).toBe("Hi Santa Claus. Santa Claus is the best.");
  });

  test("Test 5", () => {
    expect(fixLetter("  hi    santa    claus ??")).toBe("Hi Santa Claus?");
  });

  test("Test 6", () => {
    expect(
      fixLetter("Hey santa Claus .  I want a bike.   I want a videogame! ")
    ).toBe("Hey Santa Claus. I want a bike. I want a videogame!");
  });
});
