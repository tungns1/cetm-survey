
export interface UI {
    style: string;
    layout: any;
    resources: any;
    navigations: any;
    language: string;
}

export interface ILayout {
    id?: string;
    mtime?: number;
    type: 'kiosk' | 'screen';
    tag: string;
    name: string;
    ui: UI;
    resources: any;
    style: string;
}
