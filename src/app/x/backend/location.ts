let path = document.location.pathname;
let origin = document.location.origin;

export function AppLocation() {
    return `${origin}${path}`;
}