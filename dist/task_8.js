"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookMemoryRepository {
    constructor() {
        this.items = [];
    }
    create(item) {
        this.items.push(item);
    }
    findById(id) {
        return this.items.find(book => book.id === id);
    }
    update(id, updates) {
        const index = this.items.findIndex(book => book.id === id);
        if (index === -1)
            return;
        const updated = { ...this.items[index], ...updates };
        this.items[index] = updated;
    }
    delete(id) {
        this.items = this.items.filter(book => book.id !== id);
    }
}
const repo = new BookMemoryRepository();
repo.create({ id: "1", title: "2025", author: "Name", year: 2025 });
console.log(repo);
repo.update("1", { year: 2026 });
console.log(repo.findById("1"));
repo.delete("1");
//# sourceMappingURL=task_8.js.map