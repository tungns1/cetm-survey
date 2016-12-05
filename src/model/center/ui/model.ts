import {IStyle} from './style';

interface IRenderValue {
    name: string;
    data: any;
}

export interface UI {
    id?: string;
    tag?: string;
    renders?: IRenderValue[];
    children?: UI[];
    style?: IStyle;
    attrs?: { [index: string]: string };
    data?: { [index: string]: any };
}
