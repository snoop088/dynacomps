import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SeComponent } from './se.component';
import { HolderComponent } from './holder/holder.component';

import { BuilderService } from './builder.service';
import { DynamicInjectorService } from "app/dynamic-injector.service";

@NgModule({
  declarations: [
    SeComponent,
    HolderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [BuilderService, DynamicInjectorService],
  bootstrap: [SeComponent]
})
export class SeModule { }
