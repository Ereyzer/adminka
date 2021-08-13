import React, { useRef, useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import styles from './TourBtns.module.css';
import controlBtnsOnOfContext from '../helpers/context';

export function TourBtns({ changeIsStartAddElements }) {
  const ctx = useContext(controlBtnsOnOfContext);
  const [status, setStatus] = useState(false);
  const [side, setSide] = useState('false');
  useEffect(() => {
    changeIsStartAddElements(status);
  }, [status]);

  // console.log(ctx);

  const startStopFunc = event => {
    // this.testClick = !this.testClick;
    console.log(this.testClick);
  };
  const onConsol = () => {
    // const elements = window.localStorage.getItem('elements');
    // console.log(ctx.apiService);
    console.log(ctx.elements);
    ctx.apiService.postElements(ctx.elements);
    // console.log(elements);
  };

  return createPortal(
    <div className={styles[`${side ? 'BlockBottom' : 'BlockTop'}`]}>
      <button
        onClick={() => setStatus(s => !s)}
        id="switch-work-administrator"
        className={styles.ButtonStart}
      >
        {status ? 'stop' : 'start'}
      </button>
      <button
        onClick={onConsol}
        className={styles.ButtonStart}
        id="add-selected-items"
      >
        add selected items
      </button>
      <button onClick={() => setSide(s => !s)}>{side ? '▲' : '▼'}</button>
    </div>,
    document.getElementById('tour-buttons-container'),
  );
}
