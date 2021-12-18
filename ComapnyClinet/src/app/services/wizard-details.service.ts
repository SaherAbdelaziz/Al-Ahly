import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Item } from "../models/item.model";

@Injectable({
    providedIn: 'root'
})

export class WizardDetailsService {
    baseUrl: string = "";
    /**
     *
     */
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getAllItems() {
        return this.http.get<Item[]>(this.baseUrl + 'api/Items/')
    }

    AddItem(item:Item) {
        return this.http.post<Item>(this.baseUrl + 'api/Items', item)
    }
    UpdateItem(item:Item , id:number) {
        return this.http.put<void>(this.baseUrl + `api/Items/${id}`, item)
    }
    DeleteItem(id:number){
        return this.http.delete<void>(this.baseUrl + `api/Items/${id}`)
    }
    
}