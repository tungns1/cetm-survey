export interface ICustomer {
    id?: string;
    email: string;
    code: string;
    date_of_birth: number;
    full_name: string;
    first_name: string;
    last_name: string;
    short_name: string;
    phone_number: number;
    nationality: string;
    vip_code: string;
    segment: string;
}

export class Customer {
    constructor(private v: ICustomer) { }
    id = this.v.id;
    email = this.v.email;
    code = this.v.code;
    date_of_birth = this.v.date_of_birth;
    first_name = this.v.first_name;
    last_name = this.v.last_name;
    phone_number = this.v.phone_number;
    nationality = this.v.nationality;
    vip_code = this.v.vip_code;
    segment = this.v.segment;
    full_name = this.v.full_name || this.first_name + ' ' + this.last_name;
    short_name = this.v.short_name;
}
