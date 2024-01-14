import React, { useState } from 'react';

import { FitnessWalk } from '../../types';
import { fitnessWalksBaseData  as walkings } from "../../models/Trainings";

import classes from './css/main.module.css'


export default function List(handlers: any) {
    const { onDelete, onEdit } = handlers;

    function WalkList(walk: FitnessWalk) { // функция отрисовки элемента        
        return (
            <li key={walk.id}>
                <span>{walk.date.toLocaleDateString().substring(0,10)}</span>
                <span>{walk.distance}</span>
                <div>
                    <button onClick={ () => onEdit(walk)}><i className='material-icons'>edit</i></button>
                    <button onClick={ () => onDelete(walk.id)}><i className='material-icons'>delete</i></button>
                </div>
            </li>
        )
    }

    return (
        <div className={classes['walkings']}>
            <div className={classes['walkings-headers']}>
                <div>Дата (ДД.ММ.ГГ)</div>
                <div>Пройдено (км)</div>
                <div>Действия</div>
            </div>
            <ul className={classes['walkings-data']}>
                { walkings.list.map(walk => List(walk)) }
            </ul>
        </div>
    );
}
