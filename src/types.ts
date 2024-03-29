export type RGB = {
    r: number,
    g: number, 
    b: number,
}

export interface Mode {
    isEditMode: boolean,
    walk: FitnessWalk,
}

export interface FitnessWalk {
    id: number,
    date: Date, 
    distance: number,
}

export interface WalkListHandlers { 
    onEdit(walk: FitnessWalk): void, 
    onDelete(id: number): void ,
}
