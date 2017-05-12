import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class DynamicInjectorService {
  public initData: any;
  public formGroup: FormGroup;
  constructor() { }

}
