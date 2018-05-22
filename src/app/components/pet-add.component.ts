import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PetService } from '../services/pet.service';
import { PersonaService } from '../services/persona.service';
import { Validators } from '@angular/forms';
import { Pet } from '../models/pet';
import { Persona } from '../models/persona';


@Component({
  selector: 'add-pet',
  templateUrl: '../views/pet-add.html'
})
export class PetAddComponent  {

    public _petForm: FormGroup;
    public pet: Pet;
    public personas: Persona[];

    constructor(
        private _formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<PetAddComponent>,
        private _petService: PetService,
        private _personaService: PersonaService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.pet = new Pet(0,'',0,0);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
  

    ngOnInit(){
        this.getPersona();
        this._petForm = this._formBuilder.group({
        id_pet: [this.data.id_pet],
        pet_nombre: [ this.data.pet_nombre, [Validators.required]],
        pet_edad: [ this.data.pet_edad, [Validators.required]],
        owner: [ this.data.owner , [Validators.required]],
        });
    }

    getPersona(){
        this._personaService.getPersonas().subscribe(
                result => {
                 if (result.status == 200){
                        this.personas = result.body.data;
                    }
                },
                error => {
                    console.log(<any>error);
                });
    }

    onSubmit(){
        this.pet = this._petForm.value;
        console.log(this.pet);
        
        if (this.pet.id_pet == null){
            this._petService.addPet(this.pet).subscribe(
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
        else{
            this._petService.editPet(this.pet.id_pet,this.pet).subscribe(
                response => {
                    console.log(response);
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