import React, { useState, useRef, useEffect, useReducer } from 'react';

import { TourBtns } from '../TourBtns/TourBtns';
import controlBtnsOnOfContext from '../helpers/context';
import { isAdmin } from '../helpers/isAdmin';
import ApiService from '../helpers/work-with-bakend';
import ModalMain from '../ModalMain/ModalMain';

import '../Interface/Interface';

function reducer(state, action) {
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
  const [isAdminT, dispatch] = useReducer(reducer, false);
  console.log(isAdminT);

  useEffect(() => {
    runOnKeys(dispatch, 'KeyL', 'KeyS', 'KeyD');
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
      }}
    >
      <div className={className}>
        {children}
        {isAdmin() && (
          <TourBtns changeIsStartAddElements={setIsStartAddElements} />
        )}
      </div>

      {isAdminT && <ModalMain dispatch={dispatch} />}
    </controlBtnsOnOfContext.Provider>
  );
}

// function onKeyPressClick(e) {
//   if (e.code !== 'KeyL') return;

//   window.addEventListener('keydown', onKeydownClick);

//   console.log(e);
// }

// function onKeydownClick(e) {
//   console.log(11111111111111111111111111111111111111, e);
//   if (e.code !== 'keyS') {
//     window.removeEventListener('keydown', onKeydownClick);
//   } else {
//     window.addEventListener('keyup', onKeyUp);
//     console.log(e);
//   }
// }

// function onKeyUp(e) {
//   if (e.code !== 'KeyD') {
//     window.removeEventListener('keydown', onKeydownClick);
//     window.removeEventListener('keyup', onKeyUp);
//   } else {
//     console.log('it working');
//     window.removeEventListener('keydown', onKeydownClick);
//     window.removeEventListener('keyup', onKeyUp);
//   }
// }

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

    // dispatch();
    func({ type: 'on' });
  });

  document.addEventListener('keyup', function (event) {
    pressed.delete(event.code);
  });
}
