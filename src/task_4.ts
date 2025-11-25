function addTag(tags: readonly string[], tag: string): string[] {
    if (tags.includes(tag)) { 
        return [...tags]
    }
    return [...tags, tag]
}


function removeTag(tags: readonly string[], tag: string): string[] {
    return tags.filter(t => t !== tag)
}


function mergeTags(tags1: readonly string[], tags2: readonly string[]): string[] {
    const set = new Set([...tags1, ...tags2])
    return [...set]
}


const tags1: readonly string[] = ["papa","mama"]
const tags2: readonly string[] = ["sina, doch"]

const added = addTag(tags1,"mama2")
console.log(added)

const removed = removeTag(tags1, "papa")
console.log(removed)

const merged = mergeTags(tags1,tags2)
console.log(merged)
