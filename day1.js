export default function contarOvejas(ovejas) {
    const nameRegex = new RegExp('[aA][nN]')
    return ovejas.filter((it) => it.color === 'rojo' && nameRegex.test(it.name));
}