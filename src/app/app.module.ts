import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8090',
        realm: 'udemyRealm',
        clientId: 'prod-app'
      },
      initOptions: {
      /*  onLoad :'login-required',
        checkLoginIframe: true*/  //methode louta 5ir : optimisation communication entre angular w keycloack
         onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [

    {
      provide: APP_INITIALIZER,  //used to indicate that this provider is responsible for initializing the application.
      useFactory: initializeKeycloak,  //specifies the factory function that will be used to create the instance of the service
      multi: true,  //can provide multiple instances of the service. In this case, it is used to allow multiple instances of the APP_INITIALIZER token.
      deps: [KeycloakService]  //specifies the dependencies of the factory function. In this case, the factory function depends on the KeycloakService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
