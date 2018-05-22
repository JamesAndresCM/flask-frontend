import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PersonaService } from '../services/persona.service';
import { Validators } from '@angular/forms';
import { Persona } from '../models/persona';


@Component({
  selector: 'add-persona',
  templateUrl: '../views/persona-add.html'
})
export class PersonaAddComponent  {
    public _personaForm: FormGroup;
    public persona: Persona;

    constructor(
        private _formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<PersonaAddComponent>,
        private _personaService: PersonaService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.persona = new Persona(0,'','',0,'');
        }

    onNoClick(): void {
        this.dialogRef.close();
    }
  

    ngOnInit() {
        this._personaForm = this._formBuilder.group({
            id_persona: [this.data.id_persona],
            persona_nombre: [ this.data.persona_nombre, [Validators.required]],
            persona_apellido: [ this.data.persona_apellido, [Validators.required]],
            persona_edad: [ this.data.persona_edad, [Validators.required]],
            persona_ciudad: [ this.data.persona_ciudad , [Validators.required]],
            });
    }


    onSubmit(){
        this.persona = this._personaForm.value;
        if (this.persona.id_persona == null){
            this._personaService.addPersona(this.persona).subscribe(
                response => {
                    if(response.status == 200){
                        this.dialogRef.close();
                    }else{
                        console.log(response);
                    }
                },
                error => {
                    console.log(<any>error);
                });
        }else{
            this._personaService.editPersona(this.persona.id_persona,this.persona).subscribe(
                response => {
                    if(response.status == 200){
                        this.dialogRef.close();
                    }else{
                        console.log(response);
                    }
                },
                error => {
                    console.log(<any>error);
                });
        }
    }
}