import { Item } from "./item.model";

export class Wizard{
    id:number=0;
    title : string = "" ;
    items : Array<Item> = []

    /**
     *
     */
    constructor(title:string,items :Array<Item>) {
        this.title = title;
        this.items = items;
    }
}