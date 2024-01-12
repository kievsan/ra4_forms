import React, { useState } from 'react';
import { RGB } from '../../types';

import classes from './css/main.module.css'


export default function InputColor({DEF_COLOR='#34495e', ERR_COLOR='#fa4549'}) : JSX.Element {
    const TARGET = 'Задайте #цвет';

    const ERR_DARK = errDark(ERR_COLOR);

    const [ color, setColor ] = useState({
      hex: DEF_COLOR, rgb: 'rgb(52, 73, 94)', 
      real: DEF_COLOR, dark: '#203550', 
    });

    const handlerInputColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      
      const hex = event.target.value.trim().toLowerCase();
      setColor(prevColor => ({...prevColor, hex: hex}));

      const rgb = getRGB(hex);
      if (rgb) {
          setColor(prevColor => ({...prevColor, rgb: getReal(rgb), real: getReal(rgb), dark: getDark(rgb)}));
      } else if (hex.length > 6) {
          setColor(prevColor => ({...prevColor, rgb: 'Ошибка!', real: ERR_COLOR, dark: ERR_DARK}));
      } else {
          setColor(prevColor => ({...prevColor, rgb: TARGET, dark: color.real}));
      }
    }
    
    return (
        <form className={classes['root']} style={{backgroundColor: color.real}}>
          <div>
            <input className={classes['input']} type='text' placeholder={TARGET} value={color.hex} 
            onChange={handlerInputColorChange}/>
            <div className={classes['output']} style={{backgroundColor: color.dark}}>{color.rgb}</div>
          </div>
        </form>
    )
}

//************************************************************************************ */
const regex = (str: string) => /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(str);

const darker = (colorNum: number, delta: number) => {
  const MIN = 20, MAX = 50;
  delta ??= MIN;
  delta = delta > MIN ? delta : MIN;
  delta = delta < MAX ? delta : MAX;
  return colorNum - delta > 0 ? colorNum - delta : 0;
};

const getDark = (rgb: RGB) => `rgb(${darker(rgb.r, 30)}, ${darker(rgb.g, 30)}, ${darker(rgb.b, 30)}`;
const getReal = (rgb: RGB) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const getRGB = (hex: string): RGB | null => {
  const HEX = regex(hex);
      return HEX ? {
          r: parseInt(HEX[1], 16),
          g: parseInt(HEX[2], 16),
          b: parseInt(HEX[3], 16)
      } : null;
}

const errDark = (err_color: string): string => {
  const rgb = getRGB(err_color);
  return rgb ? getDark(rgb) : err_color;
}
