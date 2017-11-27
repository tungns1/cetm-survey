
export interface ILedStatus {
    addr: number;
    cmd: string;
    text?: string;
}

export const LED_STATUS = {
    WELCOME: "welcome",
    STOP: "stop",
    SHOW: "show"
}
