import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';



//Rutas
import { APP_ROUTING } from './app.routes';
//COMPONENTES
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { MantenaiceComponent } from './components/mantenaice/mantenaice.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatsComponent } from './components/chats/chats.component';
import { EnviarHaciaComponent } from './components/enviar-hacia/enviar-hacia.component';
import { LoginComponent } from './components/login/login.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavbarComponent,
    LoadingComponent,
    HomeComponent,
    MantenaiceComponent,
    FooterComponent,
    ChatsComponent,
    EnviarHaciaComponent,
    LoginComponent,
    CiudadesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
