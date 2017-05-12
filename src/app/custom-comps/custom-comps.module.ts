import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDemoComponent } from './custom-demo/custom-demo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CustomDemoComponent],
  exports: [CustomDemoComponent]
})
export class CustomCompsModule { }
