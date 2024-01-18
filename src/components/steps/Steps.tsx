import { useState } from 'react';

import { FitnessWalk } from '../../types';

import Form from "./WalkInputForm"
import List from "./WalkList";

interface Props { baseWalkList: FitnessWalk[] };


export default function Steps({ baseWalkList }: Props) {

    const [state, SetState] = useState({
        walkings: baseWalkList,
        current: nullFitnessWalk,
    });
    const {walkings, current} = state;

    console.log(
        'render Steps:  records = ', walkings.length, 
        ' :  distance = ', current.distance, 
        ',  date = ', current.date.toString()
    );

    const handlerDelete = (id: number): void => {
        SetState(prev => ({ ...prev, 
            current: nullFitnessWalk, 
            walkings: prev.walkings.filter(walk => walk.id !== id) 
        }))
    };

    const SetCurrent = (walk: FitnessWalk): void => {
        console.log(
            'ЗАПОЛНЯЕМ ФОРМУ! SetCurrent():   ' + 
            'distance: ', typeof(walk.distance), current.distance, 
            '  =>  ', typeof(walk.distance), walk.distance, 
            ',    date: ', typeof(walk.date), strDate(current.date), 
            '  =>  ', typeof(walk.date) , strDate(walk.date)
        );
        SetState(prev => ({ ...prev, current: walk }));
    };

    const handlerEdit = (walk: FitnessWalk, date: Date, distance: number): void => {
        const idx = walkings.indexOf(walk);
        if (idx !== -1) {
            walk.distance = (+distance);
            walk.distance <= 0 ? handlerDelete(walk.id) : SetState(prev => ({...prev, 
                walkings: prev.walkings.map((thisWalk, i) => i === idx ? walk : thisWalk),
                current: nullFitnessWalk
            }));
        } else {
            SetCurrent(nullFitnessWalk);
        }        
    };

    const handlerAdd = (walk: FitnessWalk): void => {
        if (walk.distance <= 0) return;

        SetState(prev => {
            const new_walkings = prev.walkings.map(this_walk => {
                if ( walk.id === 0 && strDate(walk.date) === strDate(this_walk.date) ) {
                    walk.distance += this_walk.distance;
                    walk.id = this_walk.id;
                    return walk;
                }
                return this_walk;
            });

            if (walk.id) return { ...prev, walkings: new_walkings, current: nullFitnessWalk };
            
            walk.id = newId();
            return { ...prev, 
                walkings: [...new_walkings, walk].sort(sortDescDate), 
                current: nullFitnessWalk
            };
        });
    }

    const newId = (): number => {
        const el = walkings.reduce( (prev, it) => prev.id > it.id ? prev : it, {id: 0} );
        return Number(el.id)+ 1;
    }

    return (
        <>
          <Form startWalk={current} onEdit={handlerEdit} onAdd={handlerAdd} />
          <List walkList={walkings} onEdit={SetCurrent} onDelete={handlerDelete} />      
        </>
      );
}

export const nullFitnessWalk: FitnessWalk = { id: 0, date: new Date(), distance: 0 }

export const strDate = (date: any): string => {
    const d = new Date(date);
    return (
        `0${ d.getDate() }`.slice(-2) + '.' + 
        `0${ d.getMonth() + 1 }`.slice(-2) + '.' + 
        d.getFullYear()
    );
}

export const typeDate = (date: any): string => {
    const d = new Date(date);
    return (
        d.getFullYear() + '-' + 
        `0${ d.getMonth() + 1 }`.slice(-2) + '-' + 
        `0${ d.getDate() }`.slice(-2)
    );
}

export const isNullDate = (date: any): boolean => typeDate(date) === typeDate(nullFitnessWalk.date);

export const sortAscDate = (a: any, b: any) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
}

export const sortDescDate = (a: any, b: any) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
}
