import { Injectable, Component, Input, NgModule, Compiler, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CustomCompsModule } from './custom-comps/custom-comps.module';
import { DynamicInjectorService } from 'app/dynamic-injector.service';

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
    class CustomDynamicComponent {
      @Input() public initData: any;
      @Input() public formGroup: FormGroup;
      constructor(public dynaData: DynamicInjectorService){
      }
    };
    return CustomDynamicComponent;
  }
  private createComponentModule(dynamicComponent: any) {
    @NgModule({
      imports: [CustomCompsModule],
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
  public createDynamicModule(dynamicComponent) {
    const module = this.compiler.compileModuleSync(this.createComponentModule(dynamicComponent));
    // const factory = this.resolver.resolveComponentFactory(dynamicComponent);
    return module;
  }
  // public createInjector(initData: any, formGroup: FormGroup) {
  //   @Injectable()
  //   class dynamicInjector {
  //     injectorInitData = initData;
  //     formGroup: FormGroup;
  //   }
  //   return dynamicInjector;
  // }
}
