"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepFreeze(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (Object.isFrozen(obj)) {
        return obj;
    }
    Object.getOwnPropertyNames(obj).forEach((prop) => {
        const value = obj[prop];
        if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
            deepFreeze(value);
        }
    });
    return Object.freeze(obj);
}
const data = {
    name: "MyApp",
    config: {
        theme: "light",
        features: {
            darkMode: false,
            beta: true
        }
    },
    tags: ["web", "vue", "scss"],
};
const frozenData = deepFreeze(data);
try {
    frozenData.config.theme = "dark";
}
catch (e) {
    console.log("Объект действительно заморожен!");
}
console.log(frozenData);
//# sourceMappingURL=task_9.js.map