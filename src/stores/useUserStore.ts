import { defineStore } from "pinia";

interface User {
    email: string,
    password: string
}

interface CurrentUser {
    email: string
}

interface AuthResult {
    error?: string,
    success?: boolean
}

interface UserState {
    currentUser: CurrentUser | null,
    users: User[]
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        currentUser: null,
        users: [],
    }),

    actions: {
        register(email: string, password: string): AuthResult {
            if (!/\S+@\S+\.\S+/.test(email)) {
                return {error: "Некорректный email"}
            }

            if (this.users.some((u) => u.email === email)) {
                return {error: "Данный email уже зарегистрирован"}
            }

            this.users.push({email,password})
            this.currentUser = {email}

            return {success: true}
        },

        login(email: string, password: string): AuthResult {
            const currEmail = this.users.find((u) => u.email === email)

            if (!currEmail){
                return {error: "Такой пользователь не зарегистрирован"}
            } else {
                const user = this.users.find((u) => u.email === email && u.password === password)
            
                if (!user){
                    return {error: "Неверный пароль"}
                }

                this.currentUser = {email}
                return {success: true}
            }
        },

        logout(): void {
            this.currentUser = null
        }
    },

    persist: true,
});