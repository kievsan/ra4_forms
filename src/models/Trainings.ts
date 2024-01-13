import { nanoid } from 'nanoid';


export class Walks {
    private _mainStart: Date = new Date();
    private _mainDescription: string = "Тренировочные пешие прогулки";
    private _mainStructure: string; 
    
    private _tranings = []; // дефолтное значение списка занятий

    constructor(structure: string) {
        this._mainStructure = structure;
        // Make singleton
        if ('instance' in Walks) return Object.getOwnPropertyDescriptor(Walks, 'instance')?.value;
        Object.assign(Walks, { instance: this });
    }

    public get Info() {
        return {
            description: this._mainDescription, 
            start: this._mainStart, 
            structure: this._mainStructure, 
        }
    }

}

export const walksBaseData = new Walks("Дата / Пройдено (км)");
