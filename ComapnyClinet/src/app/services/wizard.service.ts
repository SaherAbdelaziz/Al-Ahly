import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Wizard } from "../models/wizard.model";

@Injectable({
    providedIn: 'root'
})

export class WizardService {
    baseUrl: string = "";
    /**
     *
     */
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getAllWizards() {
        return this.http.get<Wizard[]>(this.baseUrl + 'api/Wizards')
    }
    DeleteWizard(id:number) {
        return this.http.delete<void>(this.baseUrl + `api/Wizards/${id}`)
    }

    AddWizard(wizard:Wizard) {
       
        return this.http.post<Wizard>(this.baseUrl + 'api/Wizards', wizard)
    }
}