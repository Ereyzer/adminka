import React, { useEffect, useReducer, useContext, useState } from 'react';
// import { createPortal } from 'react-dom';
import styles from './CreateWrapper.module.css';
import controlBtnsOnOfContext from '../helpers/context';
import Button from '../Button/Button';

export function CreateWrapper({ element }) {
  const ctx = useContext(controlBtnsOnOfContext);
  const [isContextMenu, dispatchIsContextMenu] = useReducer(ctx.reducer, false);
  const [state, setState] = useState('');
  //   console.log('sraka');
  useEffect(() => {
    const addContextMenu = event => {
      event.preventDefault();
      event.stopPropagation();
      // alert('Контекстное меню кнопки');
      dispatchIsContextMenu({ type: 'on' });
      console.log(event.target.nodeName);
      setState(event.target);
      selectElement(event);
    };
    document.addEventListener('contextmenu', addContextMenu);
    return () => {
      document.removeEventListener('contextmenu', addContextMenu);
    };
  }, []);
  const selectElement = e => {
    if (ctx.isAdminB) return;
    if (!ctx.isStartAddElements) return;
    console.log(e.target);
    // console.log(state.nativeEvent);
    const element = e.target;
    console.log(e);
    if (
      element.id === 'switch-work-administrator' ||
      element.id === 'add-selected-items'
    )
      return;

    element.classList.add(`${styles.SelectClass}`);
    console.log(e.path);
    // setPath(e.nativeEvent.path);

    // setIsModal(true);
  };
  return (
    // <div id="sraka" className={styles.CustomWrapper}>
    <Button onClick={selectElement}>{state.nodeName}</Button>
    // {/* </div> */}
  );
}
