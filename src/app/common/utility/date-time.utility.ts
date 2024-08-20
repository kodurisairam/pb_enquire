export interface IPickerDate {
    year: number;
    month: number;
    day: number;
}
export function convertFromPickerDate(dt: IPickerDate | any): Date {
    let res: Date = null;
    if(dt && dt.year && dt.month && dt.day) {
        res = new Date(dt.year, dt.month - 1, dt.day);
    }
    return res;
}

export function convertToPickerDate(dt: Date): any {
    let res = {year: null, month: null, day: null};
    if(!dt) {
        return;
    }
    dt = new Date(dt);
    res.year = dt.getFullYear();
    res.month = dt.getMonth() + 1;
    res.day = dt.getDate();
    return res;
}