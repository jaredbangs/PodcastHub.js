import PouchDB from 'pouchdb';
import { SavableItem } from './savableItem';

export class Repository<T extends SavableItem> {

    private readonly db: PouchDB.Database;

    constructor(databaseName: string) {
        this.db = new PouchDB(databaseName);
    }

    public async deleteAll(): Promise<void> {

        const allDocs = await this.db.allDocs();
        
        Promise.all(allDocs.rows.map((row) => {
            return this.db.remove(row.id, row.value.rev);
        }));

    }

    public async load(id: string): Promise<T> {
        return await this.db.get(id);
    }

    public async save(item: T): Promise<void> {
        await this.db.put(item);
    }
}