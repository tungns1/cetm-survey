export interface IBranch {
    id?: string;
    mtime?: number;
    code?: string;
    name?: string;

    parent?: string;
    level?: number;

    _checked?: boolean;
    _shown?: boolean;

    dtime?: number;
    external_id?: string;
    settings?: Object;
}

