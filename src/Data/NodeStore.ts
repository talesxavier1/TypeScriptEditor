import { ConditionModel } from "../models/ConditionModel";
import { EndExceptioModel } from "../models/EndExceptionModel";
import { EndProcessModel } from "../models/EndProcessModel";
import { ExceptionSubprocessModel } from "../models/ExceptionSubprocessModel";
import { LoggerModel } from "../models/LoggerModel";
import { MulticastInModel } from "../models/MulticastInModel";
import { MultcastOutModel } from "../models/MulticastOutModel";
import { ProcessContainerModel } from "../models/ProcessContainerModel";
import { ReciverModel } from "../models/ReciverModel";
import { ScriptModel } from "../models/ScriptModel";
import { SenderModel } from "../models/SenderModel";
import { StartExceptionModel } from "../models/startExceptionModel";
import { StartProcessModel } from "../models/StartProcessModel";
import { TDataSource } from "../Types/TDataSource";

export class NodeStore {

    private _store: DevExpress.data.ArrayStore<TDataSource, String>;

    private onInserting = (data: TDataSource): void => {
        switch (data.type) {
            case "sender":
                Object.assign(data, new SenderModel(data.ID));
                break;
            case "processContainer":
                Object.assign(data, new ProcessContainerModel(data.ID));
                break;
            case "reciver":
                Object.assign(data, new ReciverModel(data.ID));
                break;
            case "condition":
                Object.assign(data, new ConditionModel(data.ID));
                break;
            case "exceptionSubprocess":
                Object.assign(data, new ExceptionSubprocessModel(data.ID));
                break;
            case "endException":
                Object.assign(data, new EndExceptioModel(data.ID));
                break;
            case "script":
                Object.assign(data, new ScriptModel(data.ID));
                break;
            case "logger":
                Object.assign(data, new LoggerModel(data.ID));
                break;
            case "startException":
                Object.assign(data, new StartExceptionModel(data.ID));
                break;
            case "multicastOut":
                Object.assign(data, new MultcastOutModel(data.ID));
                break;
            case "multicastIn":
                Object.assign(data, new MulticastInModel(data.ID));
                break;
            case "endProcess":
                Object.assign(data, new EndProcessModel(data.ID));
                break;
            case "startProcess":
                Object.assign(data, new StartProcessModel(data.ID));
                break;
            default:
                new Error(`[Erro] tipo "${data.type}" não encontrado.`);
        }
    }

    private errorHandler = (Error: any): void => {
    }

    public getAll = (): Array<TDataSource> => {
        let data: Array<TDataSource> = []
        this._store.load().done((res: Array<TDataSource>) => data = res);
        return data;
    }

    public getByKey = (key?: string): TDataSource | undefined => {
        if (!key) { return }

        let query = this._store.createQuery().filter(["ID", key]);
        let result;
        query.enumerate().always((VALUE: Array<TDataSource>) => {
            if (VALUE.length > 0) {
                result = VALUE[0];
            }
        });
        return result
    }

    constructor(key: string) {
        this._store = new DevExpress.data.ArrayStore<TDataSource, String>({
            key: key,
            data: [],
            onInserting: this.onInserting,
            errorHandler: this.errorHandler
        });
    }

    get store(): DevExpress.data.ArrayStore<TDataSource, String> {
        return this._store
    }
}