import { Component } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { Wizards } from '../models/wizard.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})


export class HomeComponent {
  wizards: Array<Wizards> = [{
    title: "firstTitle", description: "firstDesc", content: "firstContent",
    items: [{ name: "item1", description: "item1Desc" }, { name: "item2", description: "item2Desc" }]
  },
  { title: "secondTitle", description: "secondDesc", content: "secondContent", items: [] },
  { title: "thirdTitle", description: "thirdDesc", content: "thirdContent", items: [] },
  { title: "forthTitle", description: "forthDesc", content: "forthContent", items: [] }];

  stepStates = { normal: STEP_STATE.normal, disabled: STEP_STATE.disabled, error: STEP_STATE.error, hidden: STEP_STATE.hidden };
  themes = [THEME.default, THEME.arrows, THEME.circles, THEME.dots];
  stepIndexes: Array<number> = [];
  selectedTheme?: THEME;
  selectedStepIndex?: number;

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ],
    }
  };

  constructor(private ngWizardService: NgWizardService) {
    //this.setstepIndexes();
  }

  ngOnInit() {
    this.selectedTheme = this.config.theme;
    this.selectedStepIndex = this.config.selected;

    this.ngWizardService.stepChanged()
      .subscribe({
        next: (args) => {
          console.log('catching step change - method 2');
        }
      });

  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
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
  // setstepIndexes() {
  //   for (let i = 0; i < Wizards.length; i++) {

  //     this.stepIndexes.push(i);
  //   }
  // }
}

