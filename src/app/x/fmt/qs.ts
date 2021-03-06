export function Query(search: string) {
    const values: {[index: string]: string} = {};
    if (!search) {
        return values;
    }
    
    search.split('&').forEach(v => {
        const pair = v.split('=');
        values[pair[0]] = pair[1];
    })
    return values;
}