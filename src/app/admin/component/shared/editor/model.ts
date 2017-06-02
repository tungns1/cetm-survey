// type TableActionName = "add" | "edit" | "remove"

export interface ITableField {
    name: string;
    title: string;
}

export interface ITableAction {
    action: string;
    value: any;
}
