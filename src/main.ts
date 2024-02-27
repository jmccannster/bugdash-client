import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MySocketService } from './app/services/my-socket.service';

//const config: SocketIoConfig = { url: 'http://192.168.1.154:5000', options: {} };
const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };




bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, SocketIoModule.forRoot(config), AppRoutingModule),
        MySocketService
    ]
})
  .catch(err => console.error(err));
