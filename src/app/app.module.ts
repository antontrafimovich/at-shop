import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, CartComponent],
    imports: [BrowserModule, AppRoutingModule, CoreModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
