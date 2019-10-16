import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'hello',
  template: `<h1>Test saisie de champs</h1>
   <form [formGroup]="testInput" (ngSubmit)="onFormSubmit()" autocomplete="off">

     <div style="position:absolute; left: 0%;top: 15%;right: 0;bottom: 0;">
     <p>Votre nom : </p>
     <input type="text" id="nom" [formControl]="testInput.get('nom')" maxlength="10" />
    
     <div *ngIf="(submitted || nom.touched) && nom.errors?.required" class="help-block">
                Veuillez saisir un nom.
     </div>
      
      <div *ngIf="(submitted || nom.touched) && nom.errors?.pattern" class="help-block">
                  La saisie comporte des caractères non autorisés
      </div>
     </div>
     

     <div style="position:absolute; left: 0%;top: 30%;right: 0;bottom: 0;">
     <p>Votre prénom : </p> 
     <input type="text" id="prenom" [formControl]="testInput.get('prenom')" maxlength="10"/>
     <div *ngIf="(submitted || prenom.touched) && prenom.errors?.required" class="help-block">
                Veuillez saisir un prenom.
     </div>
      
      <div *ngIf="(submitted || prenom.touched) && prenom.errors?.pattern" class="help-block">
                  La saisie comporte des caractères non autorisés
      </div>
    </div> 
    
    <div style="position:absolute; left: 60%;top: 50%;right: 0;bottom: 0;"> 
    <button type="submit"  >submit</button>
    </div>
    
    </form>
  `,
  styles: [`h1 { font-family: Lato;}`]
})
export class HelloComponent implements OnInit {
  @Input() name: string;
  testInput: FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.testInput = this.fb.group({
      nom: ['', { validators: [Validators.required , Validators.maxLength(10),  Validators.pattern("^[a-zA-Zà-ÿÀ-Ÿ '-]*$")], updateOn: 'blur'}],
      prenom: ['', { validators: [Validators.required , Validators.maxLength(10),  Validators.pattern("^[a-zA-Zà-ÿÀ-Ÿ '-]*$")], updateOn: 'blur'}]
    })
  }

get nom() { return this.testInput.get('nom'); }
get prenom() { return this.testInput.get('prenom'); }

  
  onFormSubmit(): void {
    this.submitted = true;
    console.log("form valid : "+ this.testInput.valid);
    if (this.testInput.valid)
    {
    console.log(this.testInput.value)
    }
  }
}
