import { ShapeModel } from "./ShapeModel.js"

export interface IDataConverterModel {
}

export class DataConverterModel extends ShapeModel implements IDataConverterModel {
    constructor(ID?: string) {
        super("dataConverter", ID);
    }
}