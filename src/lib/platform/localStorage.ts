import { ClassProvider, Injectable, Inject } from '@angular/core';
import { AbstractStorageStrategy } from './storage';

@Injectable()
export class LocalStorageStragey extends AbstractStorageStrategy {
    readRaw(key: string) {
        return localStorage.getItem(key);
    }

    saveRaw(key: string, value: string) {
        return localStorage.setItem(key, value);
    }
}