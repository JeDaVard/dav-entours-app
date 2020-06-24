export function sikTypeNames (value) {
    if (Array.isArray(value)) {
        return value.map(sikTypeNames)
    } else if (value !== null && typeof(value) === "object") {
        const newObject = {}
        for (const property in value) {
            if (property !== '__typename') {
                newObject[property] = sikTypeNames(value[property])
            }
        }
        return newObject
    } else {
        return value
    }
}