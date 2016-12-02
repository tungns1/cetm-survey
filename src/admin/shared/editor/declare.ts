import { Backend } from '../../../shared/';
import { FormGroup } from '@angular/forms';

export interface IEditService<T> {
    api: Backend.HttpApi<T>;
    refresh: () => void;
    form: (u?: T) => FormGroup; 
}

export interface IField {
    name: string;
    title: string;
}