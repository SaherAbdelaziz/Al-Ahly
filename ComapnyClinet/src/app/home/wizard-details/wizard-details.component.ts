import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemEnum } from 'src/app/models/item.enum';
import { Item } from 'src/app/models/item.model';
import { WizardDetailsService } from 'src/app/services/wizard-details.service';

@Component({
  selector: 'app-wizard-details',
  templateUrl: './wizard-details.component.html',
  styleUrls: ['./wizard-details.component.css']
})
export class WizardDetailsComponent implements OnInit {
  itemEnum = ItemEnum;
  @Input('items')items: Item[]=[];
  @Output('itemChangedEmiiter') itemChangedEmiiter = new EventEmitter<{item:Item , state:number}>();
  constructor(private wizardDetailsService:WizardDetailsService) { }

  ngOnInit(): void {
  }

  checItem(item:Item , state:number){
    console.log(item.id) ;
    this.itemChangedEmiiter.emit({item , state});
  }
  

}
