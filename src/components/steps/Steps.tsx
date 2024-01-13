import React, { useState } from "react";
import PropTypes from "prop-types";

import List from "./TrainingWalks";
import { walksBaseData  as walks } from "../../models/Trainings";
import { HomeWalk } from "../../types";

import classes from './css/main.module.css'

let dateValue = '';
let distanceValue = ''; 


export default function Steps() {

    const [walk, setWalk] = useState({
        input_date: '',
        input_distance: '',
    })

    const [itemList, setItemList] = useState([]); // <List />

    const handlerDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWalk(prevWalk => ({...prevWalk, input_date: event.target.value}));

    }

    const handlerDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWalk(prevWalk => ({...prevWalk, input_distance: event.target.value}));

    }

    const handlerSubmit = (event: any) => { // "Enter"
        event.preventDefault();
        if ((dateValue !== '') && (distanceValue !== '')) {
        }
    }

    const handlerAddClick = (event: any) => { // "добавить"
        event.preventDefault();
        if ((dateValue !== '') && (distanceValue !== '')) {
        }
    }

    const handlerDelClick = (event: any) => { // КРЕСТИК "удалить"
        const { target } = event;
        const id = target.parentElement.id;
        console.log('removed ID = ', id);   //
        setItemList(itemList.filter((item: HomeWalk) => item.id !== id));
    }


    return (
    <main className={classes["content"]}>
        <div className={classes["card"]}>
            <div className={classes["tasks"]} id="tasks">
            <form className={classes["tasks__control"]} onSubmit={handlerSubmit} id="tasks__form">

                <label htmlFor="input__date">Дата (ДД.ММ.ГГ)
                    <input className={classes["tasks__input"]} name="input__date" id="input__date" 
                        type="text" 
                        placeholder="Введите дату"
                        value={walk.input_date}
                        onChange={handlerDateChange} />
                </label>

                <label htmlFor="input__distance">Пройдено (км)
                    <input className={classes["tasks__input"]} name="input__distance" id="input__distance" 
                        type="text" 
                        placeholder="Введите расстояние"
                        value={walk.input_date}
                        onChange={handlerDistanceChange} />
                </label>

            </form>
            <List itemList={itemList} onDel={handlerDelClick}/>
            </div>
        </div>
    </main>
    )
}
