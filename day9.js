/**
 * https://adventjs.dev/challenges/09
 */
export default function groupBy(collection, it) {
    // ¡No olvides compartir tu solución en redes!
    let groupByObj = {}
    collection.forEach(item => {
        let index = (typeof it === 'function') ? it(item) : item[it];
        groupByObj[index] = groupByObj[index] ?? [];
        groupByObj[index].push(item)
    });
    return groupByObj;
}
