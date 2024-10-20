
export interface SavableItem {
    _id: string;
    isSavableItemDocument: boolean;
    // _rev: string | undefined;
}

type SavableItemExistingIdConstructor<T> = new (id: string) => T;

export class SavableItemBase implements SavableItem {
    public _id: string = "";
    public isSavableItemDocument: boolean = true;

    constructor(id: string){
        this._id = id;
    }

    protected findSavableItemInArray<T extends SavableItemBase>(
        instanceConstructor: SavableItemExistingIdConstructor<T>,
        arrayToSearch: T[], 
        predicate: (e: T) => boolean): T | undefined {
        
        const arrayEntry = arrayToSearch.find(predicate);

        if (arrayEntry === undefined){
        return undefined;
        } else if (arrayEntry instanceof instanceConstructor) {
        return arrayEntry;
        } else if ((arrayEntry as SavableItem)._id !== undefined) {
            const item = new instanceConstructor((arrayEntry as SavableItem)._id);
            Object.assign(item, arrayEntry);
            return item;
        } else {
            return undefined;
        }
    }

}