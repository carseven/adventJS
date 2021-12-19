/**
 * https://adventjs.dev/challenges/18
 */
export default function fixFiles(files) {
    const countRepeatedFile = {}
    return files.map(file => {
        countRepeatedFile[file] = ++countRepeatedFile[file] || 0;
        return countRepeatedFile[file] > 0 ? `${file}(${countRepeatedFile[file]})` : file
    });
}
