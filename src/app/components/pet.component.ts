import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PetService } from '../services/pet.service';
import { PersonaService } from '../services/persona.service';
import { Pet } from '../models/pet';
import { Persona } from '../models/persona';
import { MatSortable, MatTableDataSource, MatSort , MatPaginator } from '@angular/material';
import { PetAddComponent } from '../components/pet-add.component';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'pet-list',
	templateUrl: '../views/pet-list.html',
	providers: [PetService],
	styles: ['.capitalize {text-transform: capitalize;} \
				.div-main {width: 570px; margin:0 auto; border-bottom: 2px inset;} \
			.hr-st{border:none;height: 20px;width: 90%;height: 50px;margin-top: 0;border-bottom: 0px solid #1f1209;box-shadow: 0 20px 20px -20px #333;margin: -50px auto 10px;']

})

export class PetComponent{
	public titulo:string;
	
	public pets: Pet[];
	public personas: Persona[];
    isPopupOpened = true;

    dataSource;
    displayedColumns = ['id_pet','owner','pet_edad','pet_nombre','actions'];

  	
  	applyFilter(filterValue: string) {
    	filterValue = filterValue.trim(); // Remove whitespace
    	filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    	this.dataSource.filter = filterValue;
  	}

  	@ViewChild(MatPaginator) paginator: MatPaginator;
  	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private dialog: MatDialog,
		private _route: ActivatedRoute,
		private _router: Router,
		private _petService: PetService,
		private _personaService: PersonaService
		){
		this.titulo = 'List Pets';
	}

	
	ngOnInit(){
		this.getPet();	
		this.getPersona();	
	}

	getPet(){
		this._petService.getPets().subscribe(
				result => {
				 if (result.status == 200 && result.body.data != "[] data not found"){
        				this.pets = result.body.data;
    					this.dataSource = new MatTableDataSource(this.pets);
    					this.dataSource.paginator = this.paginator;
    					this.dataSource.sort = this.sort;
      				}
				},
				error => {
					console.log(<any>error);
				});
	}
	
	onDeletePet(id){
		if(window.confirm('Are sure you want to delete item '+ id +'?') == true){
			this._petService.delPet(id).subscribe(
				response => {
					if(response.status == 200){
						this.getPet();
					}else{
						console.log("error not del element...");
					}
				},
				error => {
					console.log(<any>error);
				});
		}
	}
	
	addPet() {
	    this.isPopupOpened = true;
	    const dialogRef = this.dialog.open(PetAddComponent, {
	      data: {}
	    });

	    dialogRef.afterClosed().subscribe(result => {
	      this.isPopupOpened = false;
	      this.getPet();
	    }); 
	}
	
  	onEditPet(id: number) {
	    this.isPopupOpened = true;
	    let pet_res = this._petService.getPetID(id).subscribe(
	    	res => { 
	    		//console.log(res.body.data);
	    		let dialogRef;
	    		if(res.status == 200){
	    			pet_res = res.body.data;
	    			//console.log(persona_res);
	    			dialogRef = this.dialog.open(PetAddComponent, {
	    				data: pet_res[0]
	    			}),
	    				    		
	    			dialogRef.afterClosed().subscribe( response =>{
	    				this.isPopupOpened = false;
	    				this.getPet();
	    			})
	    		}
	    	}, 
	    	error => {
				console.log(<any>error);
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
}