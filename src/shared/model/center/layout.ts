import { UI } from '../ui/';

export interface ILayout {
    id?: string;
    mtime?: number;
    type: 'kiosk' | 'screen';
    tag: string;
    name: string;
    ui: UI;
    style: string;
}
