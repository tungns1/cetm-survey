export interface IQizAnswer {
    content: string;
    point: number;
    icon?: string;
    link?: number;
}

export interface IQuestion {
    content: string;
    type: 'single' | 'multiple' | 'anwser';
    point: number;
    manded: boolean;
    answers?: IQizAnswer[];
    link?: number;
}

export interface ISurvey {
    id?: string;
    name: string;
    questions: IQuestion[];
}