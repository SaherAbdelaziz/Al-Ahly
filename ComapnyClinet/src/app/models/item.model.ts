export class Item{
    id:number=0;
    name:string ="" ;
    description:string ="" ;
    wizardId:number=0 ;

    /**
     *
     */
    constructor(name:string , description:string , id :number, wizardId:number) {
        this.name = name ;
        this.description = description ;
        this.id = id ;
        this.wizardId = wizardId ;
    }
}