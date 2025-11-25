interface Repository<T> {
    create(item: T): void;
    findById(id: string): T | undefined;
    update(id: string, updates: Partial<T>): void;
    delete(id: string): void;
}

interface MemoryRepository<T extends { id: string }> extends Repository<T> { }

type Book = {
    id: string;
    title: string;
    author: string;
    year: number;
}

class BookMemoryRepository implements MemoryRepository<Book> {
    private items: Book[] = [];

    create(item: Book): void {
        this.items.push(item)
    }

    findById(id: string): Book | undefined {
        return this.items.find(book => book.id === id)
    }

    update(id: string, updates: Partial<Omit<Book, 'id'>>): void {
        const index = this.items.findIndex(book => book.id === id);
        if (index === -1) return;

        const updated = { ...this.items[index], ...updates } as Book;
        this.items[index] = updated;
    }
    delete(id: string): void {
        this.items = this.items.filter(book => book.id !== id)
    }
}


const repo = new BookMemoryRepository();

repo.create({ id: "1", title: "2025", author: "Name", year: 2025 });

console.log(repo)

repo.update("1", { year: 2026 });

console.log(repo.findById("1"));

repo.delete("1");