interface IHeader {
    name: string;
    title: string;
}

const headers = [{
    name: 'branch',
    title: 'Phòng giao dịch'
}, {
    name: 'c_t',
    title: 'Số lần giao dịch'
}];

const sample = [{
    branch: 'PGD 1',
    c_t: 1
}];


class CsvExporter {
    constructor(private headers: IHeader[]) {};

    export(data: any[], filename: string) {
        let text = data.map(row => {
            return this.headers.map(h => {
                return row[h.name];
            }).join(',');
        }).join('\n');
        // write text
    }
}