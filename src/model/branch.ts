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
    { name: 'Hội sở', value: 3 },
    { name: 'Tỉnh/Thành', value: 2 },
    { name: 'Chi nhánh', value: 1 },
    { name: 'Phòng giao dịch', value: 0 }
]