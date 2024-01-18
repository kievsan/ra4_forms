import { FitnessWalk, WalkListHandlers } from '../../types';
import { fitnessWalksBaseData  as walkings } from "../../models/Trainings";

import classes from './css/main.module.css'


export default function List({onEdit, onDelete}: WalkListHandlers) {

    function Walking(walk: FitnessWalk) { // функция отрисовки прогулки        
        return (
            <li key={walk.id}>
                <span>{walk.date.toString()}</span>
                <span>{walk.distance}</span>
                <div>
                    <button onClick={ () => onEdit(walk) }><i className='material-icons'>
                        edit</i></button>
                    <button onClick={ () => onDelete(walk.id) }><i className='material-icons'>
                        delete</i></button>
                </div>
            </li>
        )
    }

    return ( // список совершенных прогулок
        <div className={classes['walkings']}>
            <div className={classes['walkings-headers']}>
                <div>Дата</div>
                <div>Пройдено (км)</div>
                <div>Действия</div>
            </div>
            <ul className={classes['walkings-data']}>
                { walkings.all.map(walk => Walking(walk)) }
            </ul>
        </div>
    );
}
