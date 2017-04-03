
import {IResource} from './resource.model';
import {InjectionToken} from '@angular/core';

export const ResourceToken = new InjectionToken("Resource");

export interface IResourceForm extends IResource<any> {
  name: string;
  editable: boolean;
}