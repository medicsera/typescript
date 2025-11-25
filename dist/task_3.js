"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUserId(value) {
    return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
function getUserProfile(id) {
    console.log(`User profile for id: ${id}`);
}
const fValue = "9a1b12e4-df33-4d56-9a0b-123456789abc";
const sValue = "123";
if (isUserId(fValue)) {
    getUserProfile(fValue);
}
else
    console.log("Invalig user id");
if (isUserId(sValue)) {
    getUserProfile(sValue);
}
else
    console.log("Invalig user id");
//# sourceMappingURL=task_3.js.map