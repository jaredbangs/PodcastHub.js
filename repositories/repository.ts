import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

import { SavableItem } from './savableItem';
// import { NotFoundError } from './notFound';

export class Repository<T extends SavableItem> {

    protected readonly db: PouchDB.Database;

    constructor(protected readonly databaseName: string, private readonly instanceConstructor: () => T) {
        this.db = new PouchDB("db_" + databaseName);
    }

    public async deleteAll(): Promise<void> {

        const allDocs = await this.db.allDocs();
        
        Promise.all(allDocs.rows.map((row) => {
            return this.db.remove(row.id, row.value.rev);
        }));

    }
    
    public async has(id: string): Promise<boolean> {

        let found = false;

        try {

            const doc = await this.db.get(id);

            found =  doc !== undefined;

        } catch (err: unknown) {
            
            const pouchError = err as PouchDB.Core.Error;

            if (pouchError !== undefined && pouchError.status === 404) {
                // throw new NotFoundError("" + " not found: " + id);
            } else {
                throw err;
            }
        } 

        return found;
    }

    public async load(id: string): Promise<T> {

        const doc = await this.db.get(id);
        
        return this.getObjectFromDocument(doc);
    }
   	
    public async loadAll(): Promise<T[]> {

        const response = await this.db.allDocs({ include_docs: true });

        const objects: T[] = [];
        
        response.rows.forEach((row: any) => {
            objects.push(this.getObjectFromDocument(row.doc));
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