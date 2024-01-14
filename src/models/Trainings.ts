import { FitnessWalk } from '../types';


export class Walkings {
    private _mainStart = new Date();
    private _mainDescription = "Тренировочные пешие прогулки";
    private _mainStructure: string; 

    private _tranings = new Array<FitnessWalk>(); // дефолтное значение списка занятий

    constructor(structure: string) {
        this._mainStructure = structure;
        // Make singleton
        if ('instance' in Walkings) return Object.getOwnPropertyDescriptor(Walkings, 'instance')?.value;
        Object.assign(Walkings, { instance: this });
    }

    public get Info() {
        return {
            description: this._mainDescription, 
            start: this._mainStart, 
            structure: this._mainStructure, 
        }
    }

    public get list(): FitnessWalk[] {
        return this._tranings;
    }

    public Edit(walk: FitnessWalk, date: Date, distance: number) {
        const idx = this._tranings.indexOf(walk);
        if (idx === -1) {
            this.Add(walk);
        } else {
            walk.distance = (+distance);
            walk.distance > 0 ? this._tranings[idx] = walk : this.Del(walk.id);
        }
    }

    public Del(id: number) {
        this._tranings = this._tranings.filter(walk => walk.id != id);
    }

    public Add(walk: FitnessWalk): number {
        let len = this._tranings.length;
        walk.distance = (+walk.distance);
        if (walk.distance <= 0) return len;
        const existing_walk = this.walkByDate(walk.date);
        if (existing_walk) {
            const idx = this._tranings.indexOf(existing_walk);
            this._tranings[idx].distance += walk.distance;
        } else {
            walk.id = this._newId();
            this._tranings.push(walk);
            len += 1;
            this.sortDescDate();
        }        
        return len;
    }

    private _newId(): number {
        const el = this._tranings.reduce( (prev, it) => prev.id > it.id ? prev : it, {id: 0} );
        return Number(el.id)+ 1;
    }

    public sortAscDate(): void {
        this._tranings.sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        })
    }

    public sortDescDate(): void {
        this._tranings.sort((a, b) => {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
        })
    }

    public walkByID(id: number): FitnessWalk | undefined {
        return this._tranings.find(walk => walk.id === id);
    }

    public walkByDate(date: Date): FitnessWalk | undefined {
        return this._tranings.find(walk => walk.date === date);
    }
}

export const fitnessWalksBaseData = new Walkings("Дата / Пройдено (км)");
