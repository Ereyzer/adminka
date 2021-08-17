import React, { useState, useRef, useEffect, useReducer } from 'react';

import { TourBtns } from '../TourBtns/TourBtns';
import controlBtnsOnOfContext from '../helpers/context';
// import { isAdmin } from '../helpers/isAdmin';
import ApiService from '../helpers/work-with-bakend';
import ModalMain from '../ModalMain/ModalMain';
import '../Interface/Interface';
// const ModalMain = React.lazy(() =>
//   import('../ModalMain/ModalMain' /* webpackChunkName: "modal-view" */),
// );
import Tour from '../Tour/Tour';

function reducer(state, action) {
  console.log('state', state);
  switch (action.type) {
    case 'on':
      return true;
    case 'off':
      return false;
    default:
      throw new Error();
  }
}

export function TourBackdrop({ className = null, children, config }) {
  const apiService = new ApiService(config);
  const [isStartAddElements, setIsStartAddElements] = useState(false);
  const [elements, setElements] = useState([]);
  const [isAdminM, dispatchModal] = useReducer(reducer, false);
  const [isAdminB, dispatchButton] = useReducer(reducer, false);
  console.log(isAdminM);

  useEffect(() => {
    runOnKeys(dispatchModal, 'KeyL', 'KeyS', 'KeyD');
    // if (keyListener.current) {
    //   console.log('s');
    //   window.addEventListener('keypress', onKeyPressClick);
    // }
    // keyListener.current = false;
    apiService.getElements().then(r => setElements(s => [...s, ...r.data]));
    console.log('fetch');
  }, []);
  return (
    <controlBtnsOnOfContext.Provider
      value={{
        isStartAddElements,
        apiService: apiService,
        elements,
        setElements,
        dispatchModal,
        dispatchButton,
      }}
    >
      <div className={className}>
        {children}
        <Tour />
        {isAdminB && (
          <TourBtns changeIsStartAddElements={setIsStartAddElements} />
        )}
      </div>

      {isAdminM && (
        <ModalMain
          dispatchModal={dispatchModal}
          dispatchButton={dispatchButton}
        />
      )}
    </controlBtnsOnOfContext.Provider>
  );
}

function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function (event) {
    pressed.add(event.code);

    for (let code of codes) {
      // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    // dispatchModal();
    func({ type: 'on' });
  });

  document.addEventListener('keyup', function (event) {
    pressed.delete(event.code);
  });
}
