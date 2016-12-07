import {Backend} from '../shared/';

export const socket = new Backend.AppSocket("/room/monit/join", []);