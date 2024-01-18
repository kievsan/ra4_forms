import React, { useState } from 'react';

import { FitnessWalk } from '../../types';
import { nullFitnessWalk, typeDate, isNullDate } from './Steps';

export interface Props {
    startWalk: FitnessWalk, 
    onEdit(walk: FitnessWalk, date: Date, distance: number): void,
    onAdd(walk: FitnessWalk): void,
};


export default function Form({startWalk, onEdit, onAdd}: Props) {
    const [walk, setForm] = useState<FitnessWalk>(startWalk);
    //const [newWalk, setNewWalk] = useState<FitnessWalk>(nullFitnessWalk);

    console.log(
        'render Input:  distance = ', walk.distance, ', date = ', walk.date);
    
    const handlerDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm(prevForm => ({...prevForm, [name]: startWalk.id ? startWalk.date : value}));
    };
    
    const handlerNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        startWalk.distance = 0;
        setForm(prevForm => ({...prevForm, [name]: validFloat(value)}));
    };

    const handlerSubmit = (event: React.FormEvent) => {  
        event.preventDefault();
        startWalk.id
            ? onEdit(startWalk, new Date(walk.date), (+walk.distance)) 
            : onAdd({id: 0, date: new Date(walk.date), distance: (+walk.distance)});
        setForm(nullFitnessWalk);
    };
    
    return(
        <form onSubmit={handlerSubmit}>
            <div>
                <label htmlFor='date'>Дата</label>
                <input type='date' id='date' name='date' max={typeDate(new Date())} 
                    value={ typeDate(startWalk.id === 0 ? walk.date : startWalk.date) }
                    onChange={handlerDateChange} required/>
            </div>                
            <div>
                <label htmlFor='distance'>Пройдено (км)</label>
                <input type='number' id='distance' name='distance' min='0' max='10' step='0.5' 
                    value={ walk.distance === 0 ? startWalk.distance : walk.distance}
                    onChange={handlerNumberChange} required/>
            </div>
            <button type='submit'>OK</button>
        </form>
    );
}

const validFloat = (num: string): number => {
    const fnum = parseFloat(num) ?? 0.0;
    return fnum > 0 ? fnum : 0.0;    
}
