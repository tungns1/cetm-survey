
export function TwoDigit(n: number): string {
    n = Math.floor(n);
    return (n > 9 ? '' : '0') + n;
}
