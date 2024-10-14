import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

import { SavableItem } from './savableItem';

export class Repository<T extends SavableItem> {

    protected readonly db: PouchDB.Database;

    constructor(databaseName: string, private readonly instanceConstructor: () => T) {
        this.db = new PouchDB("db_" + databaseName);
    }

    public async deleteAll(): Promise<void> {

        const allDocs = await this.db.allDocs();
        
        Promise.all(allDocs.rows.map((row) => {
            return this.db.remove(row.id, row.value.rev);
        }));

    }

    public async load(id: string): Promise<T> {

        const doc = await this.db.get(id);
        
        return this.getObjectFromDocument(doc);
    }
   	
    public async loadAll(): Promise<T[]> {

        const response = await this.db.allDocs();

        const objects: T[] = [];
        
        response.rows.forEach((row: any) => {
            objects.push(this.getObjectFromDocument(row));
        });

        return objects;
	}
    
    public async save(item: T): Promise<void> {
        await this.db.put(item);
    }

    protected async findByRequest(request: PouchDB.Find.FindRequest<object>): Promise<T[]> {
        
        const response = await this.db.find(request);

        return this.getObjectsFromDocuments(response);
    }

    protected getObjectFromDocument(doc: PouchDB.Core.IdMeta & PouchDB.Core.GetMeta): T {
        const o: T = this.instanceConstructor();
        Object.assign(o, doc);
        return o;
    }
    
    protected getObjectsFromDocuments(response: PouchDB.Find.FindResponse<object>): T[] {
        
        const objects: T[] = [];
        
        response.docs.forEach((doc: any) => {
            objects.push(this.getObjectFromDocument(doc));
        });

        return objects;
    }
}