import { HomeWalk } from '../../types';

import classes from './css/main.module.css'


export default function List(props: { itemList: Array<HomeWalk>; onDel?: any; }) {  // отрисовка списка

    const { itemList } = props;
    const { onDel: handlerDelClick } = props;
 
    function Item(item: HomeWalk) { // отрисовка элемента

        const { id, date_str, distance } = item;

        return (
            <div className={classes["task"]} id={id} key={id}>
                <div className={classes["task__title"]}>{date_str}</div>
                <div className={classes["task__title"]}>{distance}</div>
                <a href="#" className={classes["task__edit"]}>&#9998;</a>
                <a href="#" className={classes["task__remove"]} onClick={handlerDelClick}>&times;</a>
            </div>
        )
    }   
    
    return (
        <div className={classes["tasks__list"]} id="tasks__list">
            {itemList.map((item: HomeWalk) => Item(item))}
        </div>
    );
}
