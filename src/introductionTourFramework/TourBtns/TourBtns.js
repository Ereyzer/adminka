import React, { useRef, useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import styles from './TourBtns.module.css';

export function TourBtns({ changeIsStartAddElements }) {
  // const ctx = useContext();
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
    const arr = window.localStorage.getItem('arr');
    console.log(arr);
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
