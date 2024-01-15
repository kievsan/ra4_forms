import { FitnessWalk } from '../../types';
import { fitnessWalksBaseData  as walkings } from "../../models/Trainings";

import classes from './css/main.module.css'


export default function List(handlers: { 
    onEdit(walk: FitnessWalk): void, 
    onDelete(id: number): void 
}) {
    const { onEdit: handlerEdit } = handlers;
    const { onDelete: handlerDel } = handlers;

    function Walking(walk: FitnessWalk) { // функция отрисовки элемента        
        return (
            <li key={walk.id}>
                <span>{walk.date.toString()}</span>
                <span>{walk.distance}</span>
                <div>
                    <button onClick={ () => handlerEdit(walk) }><i className='material-icons'>
                        edit</i></button>
                    <button onClick={ () => handlerDel(walk.id) }><i className='material-icons'>
                        delete</i></button>
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
                { walkings.list.map(walk => Walking(walk)) }
            </ul>
        </div>
    );
}
