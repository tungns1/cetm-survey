
export interface IForm {
    id: string
    mtime: number,
    dtime: number,
    name: string,
    service_id:string,
    form_html: string,
    item_forms: any 
}
export interface IItemForm {
    id_col: string,
    name: string,
    type_item: string,
    num: number,
    location: any

}

export interface IColForm {
    id?: string;
    mtime?: number;
    dtime: number;
    col_name: string;
    description: string;
    type: string

}