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

export class Customers {
    constructor(private v: ICustomer) {

    }
    id=this.v.id;
    email=this.v.email;
    code=this.v.code;
    date_of_birth=this.v.date_of_birth;
    first_name=this.v.first_name;
    last_name=this.v.last_name;
    phone_number=this.v.phone_number;
    nationality=this.v.nationality;
    vip_code=this.v.vip_code;
    segment=this.v.segment;
    get full_name(){
        console.log(this.v.full_name)
        if(this.v.full_name!=undefined){
            return this.v.full_name
        }else{
            return this.first_name+' '+this.last_name;
        }
    }
    get short_name(){
        return this.v.short_name;
    }
    
}
