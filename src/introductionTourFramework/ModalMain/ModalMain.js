import { useContext } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import controlBtnsOnOfContext from '../helpers/context';
import Button from '../Button/Button';
import ListElement from '../ListElement/ListElement';

import s from './ModalMain.module.css';

const ModalMain = ({ dispatch }) => {
  const context = useContext(controlBtnsOnOfContext);

  const onFinishClick = () => {
    dispatch({ type: 'off' });
  };

  return createPortal(
    <div className={s.Modal}>
      <Button>Start</Button>
      <Button onClick={onFinishClick}>Finish</Button>
      {context?.elements?.length > 0 && <ListElement />}
    </div>,
    document.getElementById('tour-buttons-container'),
  );
};

ModalMain.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default ModalMain;
