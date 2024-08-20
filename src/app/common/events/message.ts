export class Message {
    private _data: any = null;
    private _error: boolean = false;

    constructor(public name: string, data?: any, error?: boolean) {
        if(data) {
            this._data = data;
        }
        if(error) {
            this._error = error;
        }
    }

    set data(value: any) {
        this._data = value;
    }

    set error(value: boolean) {
        this._error = value;
    }

    get data(): any {
        return this._data;
    }

    get error(): boolean {
        return this._error;
    }
}