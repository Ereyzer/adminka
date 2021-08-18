import { style } from '@material-ui/system';
import { element } from 'prop-types';
import React from 'react';

import reactDom from 'react-dom';
import styles from '../App/App.module.css';

export function myFunc(e) {
  const element = e.target;
  element.classList.add(`${styles.Clear}`);
  // element.onClick = () => console.log(element);
  console.log([element]);
  console.log(e.eventPhase);
  //   element.addEventListener('mouseover', e => myFunc(e.target));
}
