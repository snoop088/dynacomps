import { Component, OnInit, NgModuleFactory, ComponentFactory, 
  ComponentFactoryResolver, Injector, ReflectiveInjector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuilderService } from '../builder.service'; 
import { DynamicInjectorService } from "app/dynamic-injector.service";

@Component({
  selector: 'se-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.css']
})
export class HolderComponent implements OnInit {

  dynaAssetForm: FormGroup; // main form wrapper
  formModel: {};
  dynamicComponent;
  dynamicModule: NgModuleFactory<any>;
  dynamicInjector: Injector;
  constructor(private fb: FormBuilder, private builder: BuilderService, 
    private injector: Injector, private dynamicInjectorService: DynamicInjectorService) { }

  ngOnInit() {
    this.dynaAssetForm = this.fb.group({
      'header': this.fb.group({}), // controls coming from template specific solution
      'normal' : ['Normal Input', Validators.required]
    });
    this.genDynaComp();
  }
  formSubmit() {
    this.formModel = this.dynaAssetForm.value;
  }
  private genDynaComp() {
    const tmpl = `
      <p>Hi There, How Are YOU?</p>
      {{dynaData.initData.pencho}}
      <se-custom-demo></se-custom-demo>
    `;
    const style = `p { font-size: 2rem }`;

    

    // const providers = ReflectiveInjector.resolve([DynamicInjectorService]);
    this.dynamicInjectorService.formGroup = this.dynaAssetForm;
    this.dynamicInjectorService.initData = {'pencho': 'is rather good'};
    // this.dynamicInjector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);
    this.dynamicComponent = this.builder.buildComponent(tmpl, style);
    this.dynamicModule = this.builder.createDynamicModule(this.dynamicComponent);
  }
}
