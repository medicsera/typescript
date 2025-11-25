"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addTag(tags, tag) {
    if (tags.includes(tag)) {
        return [...tags];
    }
    return [...tags, tag];
}
function removeTag(tags, tag) {
    return tags.filter(t => t !== tag);
}
function mergeTags(tags1, tags2) {
    const set = new Set([...tags1, ...tags2]);
    return [...set];
}
const tags1 = ["papa", "mama"];
const tags2 = ["sina, doch"];
const added = addTag(tags1, "mama2");
console.log(added);
const removed = removeTag(tags1, "papa");
console.log(removed);
const merged = mergeTags(tags1, tags2);
console.log(merged);
//# sourceMappingURL=task_4.js.map