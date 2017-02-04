import { socket } from '../backend';

export function FocusOnBranch(branch_id: string) {
    socket.Send("/focus", {
        branch_id
    }).subscribe();
}

export function Unfocus() {
    socket.Send("/focus", {
        branch_id: ''
    }).subscribe();
}