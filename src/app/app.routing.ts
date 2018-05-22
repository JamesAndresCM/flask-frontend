import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { PersonaComponent } from './components/persona.component';
import { PersonaAddComponent } from './components/persona-add.component';
import { PetComponent } from './components/pet.component';
import { ErrorComponent } from './components/error.component';


const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'persona', component: PersonaComponent},
	{path: 'pet', component: PetComponent},
	{path: 'persona-add', component: PersonaAddComponent},
	{path: '**',component: ErrorComponent }
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);