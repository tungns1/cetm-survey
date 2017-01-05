import { socket } from './socket';

function SendStatus(status: string) {
    socket.Send("/status", {
        status: status
    }).subscribe();
}

export function Welcome() {
    SendStatus("welcome");
}

export function Stop() {
    SendStatus("stop");
}