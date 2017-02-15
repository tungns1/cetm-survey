import { Injectable, ValueProvider } from '@angular/core';

@Injectable()
export class AppState {
    constructor(private name: string) { }

    get AppName() {
        return this.name;
    }
    
    toProvider() {
        return <ValueProvider>{
            provide: AppState,
            useValue: this
        }
    }
}