import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona';
import { MatSortable, MatTableDataSource, MatSort , MatPaginator } from '@angular/material';
import { PersonaAddComponent } from '../components/persona-add.component';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'persona-list',
	templateUrl: '../views/persona-list.html',
	providers: [PersonaService],
	styles: ['.capitalize {text-transform: capitalize;} \
				.div-main {width: 570px; margin:0 auto; border-bottom: 2px inset;} \
			.hr-st{border:none;height: 20px;width: 90%;height: 50px;margin-top: 0;border-bottom: 0px solid #1f1209;box-shadow: 0 20px 20px -20px #333;margin: -50px auto 10px;']


})

export class PersonaComponent{
	public titulo:string;
	
	public personas: Persona[];
    isPopupOpened = true;

    dataSource;
    displayedColumns = ['id_persona','persona_nombre','persona_apellido','persona_edad','persona_ciudad','actions'];

  	
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
		private _personaService: PersonaService
		){
		this.titulo = 'List Persona';
	}

	ngOnInit(){
		this.getPersona();
	}

	getPersona(){
		this._personaService.getPersonas().subscribe(
				result => {
				 if (result.status == 200 && result.body.data != "[] data not found"){
	    				this.personas = result.body.data;
	    				this.dataSource = new MatTableDataSource(this.personas);
	    				this.dataSource.paginator = this.paginator;
	    				this.dataSource.sort = this.sort;
      				}
				},
				error => {
					console.log(<any>error);
				});
	}
	
	onDeletePersona(id){
		if(window.confirm('Are sure you want to delete item '+ id +'?') == true){
			this._personaService.delPersona(id).subscribe(
				result => {
					if(result.status == 200){
						this.getPersona();
					}else{
						console.log("error not del element...");
					}
				},
				error => {
					console.log(<any>error);
				});
		}
	}
	
	addPersona() {
	    this.isPopupOpened = true;
	    const dialogRef = this.dialog.open(PersonaAddComponent, {
	      data: {}
	    });

	    dialogRef.afterClosed().subscribe(result => {
	      this.isPopupOpened = false;
	      this.getPersona();
	    }); 
	}

  	onEditPersona(id: number) {
	    this.isPopupOpened = true;
	    let persona_res = this._personaService.getPersonaID(id).subscribe(
	    	result => { 
	    		//console.log(res.data[0]);
	    		let dialogRef;
	    		if(result.status == 200){
	    			persona_res = result.body.data;
	    			//console.log(persona_res);
	    			dialogRef = this.dialog.open(PersonaAddComponent, {
	    				data: persona_res[0]
	    			}),
	    				    		
	    			dialogRef.afterClosed().subscribe( response =>{
	    				this.isPopupOpened = false;
	    				this.getPersona();
	    			})
	    		}
	    	}, 
	    	error => {
				console.log(<any>error);
			});
  	}
}