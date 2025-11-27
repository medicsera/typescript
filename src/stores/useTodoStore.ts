import { defineStore } from "pinia";

export interface Task {
    id: number,
    text: string,
    completed: boolean
}

interface TodoState {
    tasks: Task[]
}

export const useTodoStore = defineStore('todo', {
    state: (): TodoState => ({
        tasks:[],
    }),

    actions: {
        addTask(task: Task): void {
            this.tasks.push(task)
        },

        editTask({id, text}: {id: number; text: string}): void {
            const t = this.tasks.find((e) => e.id === id)
            
            if (t) t.text = text;
        },

        deleteTask(id: number): void {
            this.tasks = this.tasks.filter((t) => t.id !== id)
        },

        toggleComplete(id: number): void {
            const t = this.tasks.find((e) => e.id === id);

            if (t) t.completed = !t.completed;
        }
    },

    persist: true,
})