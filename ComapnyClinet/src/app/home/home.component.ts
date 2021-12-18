import { Component, Inject } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { Wizard } from '../models/wizard.model';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { WizardService } from '../services/wizard.service';
import { NgForm } from '@angular/forms';
import { WizardDetailsService } from '../services/wizard-details.service';
import { ItemEnum } from '../models/item.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})


export class HomeComponent {

  Submit: boolean = false;
  loading: boolean = true;
  item: Item = new Item("", "", 0, 0);
  itemEnum = ItemEnum;

  stepStates = { normal: STEP_STATE.normal, disabled: STEP_STATE.disabled, error: STEP_STATE.error, hidden: STEP_STATE.hidden };
  themes = [THEME.default, THEME.arrows, THEME.circles, THEME.dots];
  stepIndexes: Array<number> = [];
  selectedTheme?: THEME;
  selectedStepIndex: number = 0;

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ],
    }
  };


  wizards: Array<Wizard> = [];
  currentWizardIId: number = 0;
  constructor(private ngWizardService: NgWizardService, private wizardService: WizardService,
    private wizardDetailsService: WizardDetailsService) {

  }


  ngOnInit() {
    this.getAllWizards();
    this.selectedTheme = this.config.theme;
    this.selectedStepIndex = this.config.selected ? this.config.selected : 0;

    this.ngWizardService.stepChanged()
      .subscribe({
        next: (args) => {
        }
      });

  }
  getAllWizards() {
    this.wizardService.getAllWizards().subscribe(response => {
      this.wizards = response;
      this.loading = false;
    });
  }


  resutItem() {
    this.item = new Item("", "", 0, 0)
  }

  addWizard() {
    let wizard: Wizard = new Wizard(`Step ${this.wizards.length + 1}`, [])
    this.wizardService.AddWizard(wizard).subscribe(response => {
      this.wizards.push(response);
      this.loading = true;
      this.getAllWizards();
    });

  }
  deleteWizard(id: number) {
    this.wizardService.DeleteWizard(id).subscribe(response => {
      this.loading = true;
      this.getAllWizards();
    });
  }

  public save(form: NgForm) {
    this.Submit = true;
    if (form.valid) {
      if (this.item) {
        if (this.item.id != 0) { // edit mode
          this.wizardDetailsService.UpdateItem(this.item, this.item.id).subscribe(response => {
            let itemIndex = this.wizards[this.selectedStepIndex].items.findIndex(x => x.id == this.item.id);
            this.wizards[this.selectedStepIndex].items[itemIndex] = this.item;
            this.loading = true;
            this.getAllWizards();
          });
        }

        else { // add mode

          this.item.wizardId = this.currentWizardIId;
          this.wizardDetailsService.AddItem(this.item).subscribe(response => {
            this.wizards[this.selectedStepIndex].items.push(this.item);
            this.loading = true;
            this.getAllWizards();
          });
        }


      }

    }
  }
  deleteItem(item:Item){
    this.wizardDetailsService.DeleteItem(item.id).subscribe(response => {
      this.wizards[this.selectedStepIndex].items = 
      this.wizards[this.selectedStepIndex].items.filter(x => x.id != this.item.id);
        
      this.loading = true;
      this.getAllWizards();
    });
  }

  onItemChange(event: any) {
    if (event.state == this.itemEnum.View)
      this.item = { ...event.item };
    else if (event.state == this.itemEnum.Delete) {
      this.deleteItem(event.item);
    }
  }



  // Wizard functions
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  show(event?: Event) {

  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }


  stepChanged(args: StepChangedArgs) {

    this.selectedStepIndex = args.step.index;
    this.currentWizardIId = this.wizards[this.selectedStepIndex].id;
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

  themeSelected() {
    if (this.selectedTheme)
      this.ngWizardService.theme(this.selectedTheme);
  }

  stepIndexSelected() {
    if (this.selectedStepIndex)
      this.ngWizardService.show(this.selectedStepIndex);
  }
}

