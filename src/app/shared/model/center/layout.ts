
export interface UI {
    style: any;
    layout: any;
    resources: any;
    navigations: any;
    language: string;
}

export interface ILayout {
    id?: string;
    mtime?: number;
    type: 'kiosk' | 'screen' | 'feedback';
    tag: string;
    name: string;
    ui: UI;
    resources: any;
    style: any;
}