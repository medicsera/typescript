type UserId = string & { readonly brand: unique symbol }

function isUserId(value: unknown): value is UserId {
    return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function getUserProfile(id: UserId) {
    console.log(`User profile for id: ${id}`)
}

const fValue: unknown = "9a1b12e4-df33-4d56-9a0b-123456789abc"
const sValue: unknown = "123"

if (isUserId(fValue)) {
    getUserProfile(fValue)
} else
    console.log("Invalig user id")

if (isUserId(sValue)) {
    getUserProfile(sValue)
} else
    console.log("Invalig user id")

