export interface IBranch {
    id?: string;
    mtime?: number;
    code?: string;
    name?: string;

    parent?: string;
    level?: number;

    _checked?: boolean;
    _shown?: boolean;
    parent_name?: string;
}


export const BranchLevels = [
    { name: 'LABEL_ROOT', value: 3 },
    { name: 'AREA', value: 2 },
    { name: 'LABEL_BRACH', value: 1 },
    { name: 'LABEL_SUB_BRANCH', value: 0 }
]