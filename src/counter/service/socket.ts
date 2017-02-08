import { SharedService } from '../../shared/';

interface ISocketParams {
    counter_code: string;
    branch_code: string;
}

export var socket = new SharedService.Backend.AppSocket("/room/counter/join", ["counter_code", "branch_code"]);
