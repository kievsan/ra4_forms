import React, { useState } from 'react';

import { FitnessWalk, Mode } from '../../types';
import { fitnessWalksBaseData  as walkings } from "../../models/Trainings";

import List from './WalkList';


export default function Steps(props: {}) {
    const [form, setForm] = useState({
        date: new Date(),
        distance: 0,
    });
    const [modeSwitch, setSwitch] = useState({
        isEditMode: false,
        walk: nullFitnessWalk,
    });
    
    const handlerDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    };
    
    const handlerNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm(prevForm => ({...prevForm, [name]: validFloat(value)}));
    };

    const handlerSubmit = (event: React.FormEvent) => {            
        event.preventDefault();        
        modeSwitch.isEditMode 
            ? walkings.Edit(modeSwitch.walk, form.date, form.distance) 
            : walkings.Add({ id: 0, date: form.date, distance: form.distance });
        setForm({date: new Date(), distance: 0});
        setSwitch({isEditMode: false, walk: nullFitnessWalk});
    };

    const handlerDel = (id: number): void => {
        walkings.Del(id);
        setForm({date: new Date(), distance: 0});
    };

    const handlerEdit = (walk: FitnessWalk): void => {
        setSwitch(mode(true, walk));
        setForm({date: walk.date, distance: walk.distance});
    };
    
    return(
        <>
        <form onSubmit={handlerSubmit}>
            <div>
                <label htmlFor='date'>Дата</label>
                <input type='date' id='date' name='date' value={form.date.toString()} onChange={handlerDateChange} required/>
            </div>                
            <div>
                <label htmlFor='distance'>Пройдено (км)</label>
                <input type='number' id='distance' name='distance' value={form.distance} onChange={handlerNumberChange} required/>
            </div>
            <button type='submit'>OK</button>
        </form>
        <List onEdit={handlerEdit} onDelete={handlerDel} />
        </>
    );
}

const validFloat = (num: string): number => {
    const fnum = parseFloat(num) ?? 0.0;
    return fnum > 0 ? fnum : 0.0;    
}

const mode = (isEdit: boolean, walk: FitnessWalk): Mode => {
    return {
        isEditMode: isEdit, 
        walk: isEdit ? walk : nullFitnessWalk
    };
}

const nullFitnessWalk: FitnessWalk = { id: 0, date: new Date(), distance: 0 }
