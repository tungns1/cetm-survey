export class AppService {
    constructor(private name: string) {}

    get AppName() {
        return this.name;
    }
}