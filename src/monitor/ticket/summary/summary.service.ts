import { socket, Summary, ISummary } from '../backend';
import { AddSummary, RefreshSummary } from './summary.model';
import { Branch } from '../../shared';

socket.Subscribe<ISummary>("/summary/update", AddSummary);

export function SummaryOnBranch(branches: string[]) {
    if (branches.length == 1) {
        if (branches[0].trim() === 'all') {
            const allBranches = [];
            Branch.Branches.forEach(branch => {
                if (branch.level < 1) {
                    allBranches.push(branch.id);
                }
            })
            branches = allBranches;
        }
    }

    socket.Send<ISummary[]>("/summary", { branches }).subscribe(RefreshSummary);
}