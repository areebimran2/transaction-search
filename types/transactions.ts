export interface Query {
    devtime0: number;
    devtime1: number;
    atmId: number[];
    aidId?: number;
    pan?: string;
    ref?: string;
}

export interface AID {
    id: number;
    aid: string;
}

export const devtime0Default: number = 20200511000000
export const devtime1Default: number = 20260320235959

export const parseDevTime = (devTime: number): string => {
    // devTime format is YYYYMMDDhhmmss, need to convert it to a string representation

    const s = devTime.toString();
    const year = parseInt(s.slice(0, 4));
    const month = parseInt(s.slice(4, 6)) - 1;
    const day = parseInt(s.slice(6, 8));

    return new Date(year, month, day).toISOString().slice(0, 10);
}

export const fullParseDevTime = (devTime: number): string => {
    const date = parseDevTime(devTime);

    const s = devTime.toString().substring(8);
    const hour = s.slice(0, 2);
    const minute = s.slice(2, 4);
    const second = s.slice(4, 6);

    return `${date} ${hour}:${minute}:${second}`;
}