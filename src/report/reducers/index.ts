import { IFocus, ReportFilter } from '../model';

export interface IAppState {
    filter: ReportFilter;
    focus: IFocus;
}

export const ACTION = {
    FILTER_BRANCH: 'FILTER_BRANCH',
    FILTER_INIT: 'FILTER_INIT',
    FOCUS_UPDATE: 'FOCUS_UPDATE'
}

import { Action, ActionReducer } from '@ngrx/store';

function FilterReducer(state: ReportFilter = new ReportFilter(), action: Action) {
    switch (action.type) {
        case ACTION.FILTER_INIT:
            const filter = action.payload;
            return new ReportFilter(filter);
        case ACTION.FILTER_BRANCH:
            const branch_id = action.payload;
            return state.UpdateBranch(branch_id).Clone();
        default:
            return state;
    }
}

function focusReducer(state: IFocus = {}, action: Action) {
    switch (action.type) {
        case ACTION.FOCUS_UPDATE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export const Reducers = {
    filter: FilterReducer,
    focus: focusReducer
}