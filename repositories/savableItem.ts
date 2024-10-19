
export interface SavableItem {
    _id: string;
    isSavableItemDocument: boolean;
    // _rev: string | undefined;
}

export class SavableItemBase implements SavableItem {
    public _id: string = "";
    public isSavableItemDocument: boolean = true;

    constructor(id: string){
        this._id = id;
    }
}