import { Component, OnInit, NgModuleFactory, ComponentFactory, AfterViewInit, 
  ViewContainerRef, ViewChild, ModuleWithComponentFactories, ComponentRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuilderService } from '../builder.service'; 
import { DynamicInjectorService } from 'app/dynamic-injector.service';

@Component({
  selector: 'se-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.css']
})
export class HolderComponent implements OnInit, AfterViewInit {

  dynaAssetForm: FormGroup; // main form wrapper
  formModel: {};
  dynamicComponent;
  dynamicModule: NgModuleFactory<any>;
  @ViewChild('dynaComp', {read: ViewContainerRef}) 
    private dynaCompPlaceHolder: ViewContainerRef;
  
  constructor(private fb: FormBuilder, 
    private builder: BuilderService) { }
    
  ngOnInit() {
    this.dynaAssetForm = this.fb.group({
      'header': this.fb.group({}), // controls coming from template specific solution
      'normal' : ['Normal Input', Validators.required]
    });
  }
  ngAfterViewInit() {
    this.genDynaComp();
  }
  formSubmit() {
    this.formModel = this.dynaAssetForm.value;
  }
  private genDynaComp() {
    const tmpl = `
      <p>Hi There, How Are YOU?</p>
      {{dynaData.pencho}}
      <se-custom-demo></se-custom-demo>
      <div [formGroup]="formGroup.controls['header']">
        <input type="text" formControlName="testInput" id="testInput" name="testInput">
      </div>
    `;
    const style = `p { font-size: 2rem }`;

    const componentType: Component = this.builder.buildComponent(tmpl, style);
    const factory: ModuleWithComponentFactories<any> =
      this.builder.createComponentFactory(this.builder.createComponentModule(componentType));
    const componentFactory: ComponentFactory<any> = factory.componentFactories.find(factory => {
      return factory.componentType === componentType;
    });
    const componentRef: ComponentRef<any> = this.dynaCompPlaceHolder.createComponent(componentFactory);
    componentRef.instance.dynaData = {'pencho': 'is cool'};
    componentRef.instance.formGroup = this.dynaAssetForm;
    componentRef.changeDetectorRef.detectChanges();
  }
}
