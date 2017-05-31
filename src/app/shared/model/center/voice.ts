 interface IPlayItem {
    type: "url" | "data" | "sleep";
    value: string;
}

interface IPlayList {
    folder: string;
    files: string[];
    items: IPlayItem[];
    format: string;
}

export interface IVoiceList {
    id: string;
    name: string;
    i18n: { [index: string]: IPlayList };
    behavior?: {
        sleep_second?: number;
        max_queue_length?: number;
    }
}