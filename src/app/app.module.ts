import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { PersonaService } from './services/persona.service';
import { PetService } from './services/pet.service';



//components
import { HomeComponent } from './components/home.component';
import { PersonaComponent } from './components/persona.component';
import { PersonaAddComponent } from './components/persona-add.component';
import { PetComponent } from './components/pet.component';
import { PetAddComponent } from './components/pet-add.component';
import { ErrorComponent } from './components/error.component';

//routing
import { routing,appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonaComponent,
    PersonaAddComponent,
    PetComponent,
    PetAddComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule
  ],
  entryComponents: [PersonaAddComponent,PetAddComponent],
  providers: [PersonaService,PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
