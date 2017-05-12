import { Injectable, Component, Input, NgModule, Compiler, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomCompsModule } from './custom-comps/custom-comps.module';
import { DynamicInjectorService } from 'app/dynamic-injector.service';
import { CommonModule } from "@angular/common";

@Injectable()
export class BuilderService {
  constructor(private compiler: Compiler, private resolver: ComponentFactoryResolver) { 
  }
  public buildComponent(template: string, styles: string) {
    @Component({
      selector: 'se-dyna',
      template: template,
      styles: [styles]
    })
    class CustomDynamicComponent implements OnInit {
      @Input() public initData: any;
      @Input() public formGroup: FormGroup;
      constructor(){
      }
      ngOnInit(){
        const fg = this.formGroup.get('header') as FormGroup;
        fg.addControl('testInput', new FormControl('Init Value', Validators.required));
      }
      public getControl(controlName: string): FormControl {
        return this.formGroup.get(['header', controlName]) as FormControl;
      }
    };
    return CustomDynamicComponent;
  }
  public createComponentModule(dynamicComponent: any) {
    @NgModule({
      imports: [CustomCompsModule, FormsModule, ReactiveFormsModule, CommonModule],
      declarations: [
        dynamicComponent
      ],
      entryComponents: [dynamicComponent]
    })
    class RuntimeComponentModule {
    }
    // a module for just this Type
    return RuntimeComponentModule;
  }
  // public createDynamicModule(dynamicComponent) {
  //   const module = this.compiler.compileModuleSync(this.createComponentModule(dynamicComponent));
  //   // const factory = this.resolver.resolveComponentFactory(dynamicComponent);
  //   return module;
  // }
  public createComponentFactory(module) {
    return this.compiler.compileModuleAndAllComponentsSync(module);
  }

}
