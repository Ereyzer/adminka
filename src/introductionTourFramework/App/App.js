import React, { useRef, useEffect, useState, useContext } from 'react';
import { isAdmin } from '../helpers/isAdmin';
import styles from './App.module.css';
import controlBtnsOnOfContext from '../helpers/context';
import { ModalForInput } from '../NewElementForSelect/ModalForInput';
import ReactDOM from 'react-dom';
import { addElement } from '../helpers/infoelemens/addElement';
import { CreateWrapper } from '../adminkaInterface/CreateWrapper';
import { myFunc } from '../adminkaInterface/myFunc';

function App({ title, children, className = null }) {
  const ctx = useContext(controlBtnsOnOfContext);

  const backdropRef = useRef(null);
  const [description, setDescription] = useState('');

  const [state, setstate] = useState(null);
  const [targetEl, setTargetEl] = useState(null);
  const addDescription = async text => {
    setDescription(text);
    addElement(ctx.path, text, ctx.setElements);
  };

  return (
    <div
      className={className}
      tour-attribute={title}
      // onMouseEnter={selectElement}
      // onClick={selectElement}
      ref={backdropRef}
    >
      {children}
      {ctx.isModalDescription && (
        <ModalForInput
          addDescription={addDescription}
          closeModal={ctx.setIsModalDescription}
        />
      )}
    </div>
  );
}

export default App;
