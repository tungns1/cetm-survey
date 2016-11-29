import { AppSocket } from '../../shared/backend/socket';

interface ISocketParams {
    counter_code: string;
    branch_code: string;
}

export var socket = new AppSocket<ISocketParams>("/room/counter/join", ["counter_code", "branch_code"]);
