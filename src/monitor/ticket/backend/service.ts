import { socket } from '../backend';

// FocusOnBranch: only listen for this branch
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

// SummaryOnBranch: listen for summary on these branches
export function SummaryOnBranch(branches: string[]) {
    socket.Send("/summary", {
        branches
    }).subscribe();
}
