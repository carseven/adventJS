/*
Para evitar perder datos cuando el servidor se cae, Papa Noel ha decidido hacer backups incrementales. Un hacker llamado S4vitelf le esta ayudando.

Por un lado, tenemos el timestamp de cuándo se hizo el último backup.

También tenemos los cambios que se han realizado en un array de arrays. Cada array interno contiene dos elementos: el id del archivo modificado y el timestamp de la modificación.

Tienes que crear un programa que devuelva un array con los id de los archivos que tendríamos que hacer backup porque han sido modificados desde el último backup. Ejemplo:
```
const lastBackup = 1546300800
const changes = [
  [ 1, 1546300800 ],
  [ 2, 1546300800 ],
  [ 1, 1546300900 ],
  [ 1, 1546301000 ],
  [ 3, 1546301100 ]
]

getFilesToBackup(lastBackup, changes) // => [ 1, 3 ]
// El archivo con id 1 ha sido modificado dos veces
// después del último backup.

// El archivo con id 2 no ha sido modificado después
// del último backup.

// El archivo con id 3 ha sido modificado una vez
// después del último backup.

// Tenemos que hacer una copia de seguridad
// de los archivos 1 y 3.
```
Recuerda que:

* Devuelve la id de los archivos que han sido modificados después del último backup.
* Devuelve un array vacío si no hay archivos que hacer backup.
*/

type FileChanges = [number, number][];

function getFilesToBackup(lastBackup: number, changes: FileChanges): number[] {
  const filesToBackUp = changes
    .filter((fileChanges) => fileChanges[1] > lastBackup)
    .map((fileChanges) => fileChanges[0]);
  return [...new Set<number>(filesToBackUp)].sort((a, b) => a - b);
}

describe("Day 13", () => {
  test("Test 1", () => {
    const lastBackup = 1546300800;
    const changes: FileChanges = [
      [1, 1546300800],
      [2, 1546300800],
      [1, 1546300900],
      [1, 1546301000],
      [3, 1546301100],
    ];

    expect(getFilesToBackup(lastBackup, changes)).toEqual([1, 3]);
  });

  test("Test 2", () => {
    expect(
      getFilesToBackup(1546300600, [
        [1, 1546300800],
        [2, 1546300800],
        [1, 1546300900],
        [1, 1546301000],
        [3, 1546301100],
      ])
    ).toEqual([1, 2, 3]);
  });

  test("Test 3", () => {
    const changes = getFilesToBackup(1556300600, [
      [1, 1546300800],
      [2, 1546300800],
      [1, 1546300900],
      [1, 1546301000],
      [3, 1546301100],
    ]);
    expect(changes).toEqual([]);
    expect(changes.length).toEqual(0);
  });

  test("Test 4", () => {
    const changes = getFilesToBackup(1556300600, []);
    expect(changes).toEqual([]);
    expect(changes.length).toEqual(0);
  });
});
