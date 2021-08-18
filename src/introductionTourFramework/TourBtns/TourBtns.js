import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useReducer,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './TourBtns.module.css';
import controlBtnsOnOfContext from '../helpers/context';
import Button from '../Button/Button';
import { CreateWrapper } from '../adminkaInterface/CreateWrapper';

export function TourBtns({ changeIsStartAddElements }) {
  const ctx = useContext(controlBtnsOnOfContext);
  const [status, setStatus] = useState(false);
  const [side, setSide] = useState(false);

  useEffect(() => {
    changeIsStartAddElements(status);
  }, [status]);

  // console.log(ctx);

  const addSelectItem = () => {
    // const elements = window.localStorage.getItem('elements');
    // console.log(ctx.apiService);
    console.log(ctx.elements);
    // ctx.apiService.postElements(ctx.elements);
    // console.log(elements);\
    ctx.dispatchModal({ type: 'on' });
    ctx.dispatchButton({ type: 'off' });
  };

  return createPortal(
    <div className={styles[`${side ? 'BlockBottom' : 'BlockTop'}`]}>
      <Button
        onClick={() => setStatus(s => !s)}
        id="switch-work-administrator"
        className={styles.ButtonStart}
      >
        {status ? 'stop' : 'start'}
      </Button>
      <Button
        onClick={addSelectItem}
        className={styles.ButtonStart}
        id="add-selected-items"
      >
        add selected items
      </Button>
      <Button onClick={() => setSide(s => !s)}>{side ? '▲' : '▼'}</Button>
      <CreateWrapper />
    </div>,
    document.getElementById('tour-buttons-container'),
  );
}
