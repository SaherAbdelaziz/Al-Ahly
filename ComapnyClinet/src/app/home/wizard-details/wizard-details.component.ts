import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-wizard-details',
  templateUrl: './wizard-details.component.html',
  styleUrls: ['./wizard-details.component.css']
})
export class WizardDetailsComponent implements OnInit {

  @Input('items')items: Item[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
