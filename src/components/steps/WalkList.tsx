import { FitnessWalk } from '../../types';
import { strDate } from './Steps';

import classes from './css/main.module.css';


export interface Props {
    walkList: FitnessWalk[],
    onEdit(walk: FitnessWalk): void, 
    onDelete(id: number): void 
};

export default function List({walkList, onEdit, onDelete}: Props) {

    function Walking(walk: FitnessWalk) { // функция отрисовки прогулки
        console.log('render Walk', walk.date, ' : ', walk.distance);
        
        return (
            <li key={walk.id}>
                <span>{strDate(walk.date)}</span>
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
                { walkList.map(walk => Walking(walk)) }
            </ul>
        </div>
    );
}
