import React, { useState } from 'react';

import { FitnessWalk } from '../../types';
import { Walkings, fitnessWalksBaseData  as walkings } from "../../models/Trainings";

import classes from './css/main.module.css'


export default function Steps() {

    const [walkList, setWalkList] = useState(walkings);
    //const [form, setForm] = useState({date: '', distance: ''});
    const [form, setForm] = useState({
        date: new Date(),
        distance: 0.0,
    })
    
    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    };

    const handlerSubmit = (event: React.FormEvent) => {            
            event.preventDefault();

            form.distance = form.distance < 0 ? form.distance = 0 : form.distance;

            walkings.Add({ id: 0, date: new Date(form.date), distance: (+form.distance) });
            setWalkList(walkings);
            setForm({date: new Date(), distance: 0.0});
    };

    const handlerDel = (id: number) => {
        walkings.Del(id);
        setWalkList(walkings);
    };

    const handlerEdit = (walk: FitnessWalk) => {
        walkings.Edit(walk);
        setWalkList(walkings);
        setForm({date: new Date(), distance: 0.0});
    };
    
    return(
        <>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor='date'>Дата</label>
                    <input type='date' id='date' name='date' value={form.date.toString()} onChange={handlerChange} required></input>
                </div>                
                <div>
                    <label htmlFor='distance'>Пройдено (км)</label>
                    <input type='number' id='distance' name='distance' value={form.distance} onChange={handlerChange} required></input>
                </div>

                <button type='submit'>OK</button>
            </form>

            <div className={classes['walkings']}>
                <div className={classes['walkings-headers']}>
                    <div>Дата (ДД.ММ.ГГ)</div>
                    <div>Пройдено (км)</div>
                    <div>Действия</div>
                </div>

                <ul className={classes['workouts-data']}>
                    {
                        walkList.list.map(walk => 
                            <li key={walk.id}>
                                <span>{walk.date.toLocaleString('ru-RU',).substring(0,10)}</span>
                                <span>{walk.distance}</span>
                                <div>
                                    <button onClick={ () => handlerEdit(walk)}><i className='material-icons'>edit</i></button>
                                    <button onClick={ () => handlerDel(walk.id)}><i className='material-icons'>delete</i></button>
                                </div>
                            </li>
                        )
                    }
                </ul>


            </div>
        </>
    );
}
