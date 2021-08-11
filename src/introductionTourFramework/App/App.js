import React, { useRef, useEffect, useState, useContext } from 'react';
import { isAdmin } from '../helpers/isAdmin';
import styles from './App.module.css';
import controlBtnsOnOfContext from '../helpers/context';
import { ModalForInput } from '../NewElementForSelect/ModalForInput';
import ReactDOM from 'react-dom';
import { addElement } from '../helpers/infoelemens/addElement';

function App({ title, children, className = null }) {
  const ctx = useContext(controlBtnsOnOfContext);
  // const [isStart, setIsStart] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const backdropRef = useRef(null);
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  // const test = JSON.parse(localStorage.getItem('elements'));
  // test.forEach(element => {
  //   const el = document.querySelector(element.path);
  //   console.log(el);
  // });

  // const testApi = ctx.apiService.getElements().then(console.log);
  ctx.apiService.getElements().then(r => {
    console.log(r.data.data.elements);
    // r.data.data.elements.array.forEach(element => {
    //   console.log(element);
    // });
  });

  const addDescription = async text => {
    setDescription(text);
    addElement(path, text);
  };
  const selectElement = e => {
    if (!isAdmin()) return;
    if (!ctx.isStartAddElements) return;
    // console.log(e.nativeEvent.path);
    const element = e.target;
    // console.log(e.target.id);
    if (
      element.id === 'switch-work-administrator' ||
      element.id === 'add-selected-items'
    )
      return;

    element.classList.add(`${styles.SelectClass}`);
    console.log(e.nativeEvent.path);
    setPath(e.nativeEvent.path);

    setIsModal(true);
  };

  useEffect(() => {
    // if (!ctx.isStartAddElements) return;
    // console.log(backdropRef.current);
    function noopElements(ref) {
      let nodeArr = [];

      if (ref.children) {
        const elements = ref.children;
        // console.log(elements);
        for (const element of elements) {
          //! баг якщо вже є дісаблед

          if (!ctx.isStartAddElements) {
            element.removeAttribute('disabled');
            element.classList.remove(`${styles.Clear}`);
            element.classList.remove(`${styles.SelectClass}`);
          } else {
            // element.onFocus = selectElement;
            element.setAttribute('disabled', 'true');
            element.classList.add(`${styles.Clear}`);
          }

          nodeArr.push(...[element, ...noopElements(element)]);
        }
        return nodeArr;
      }
    }

    console.log(noopElements(backdropRef.current));
  }, [ctx.isStartAddElements]);

  // useMemo(() => function, input)
  return (
    <div
      className={className}
      tour-attribute={title}
      // onMouseEnter={selectElement}
      onClick={selectElement}
      ref={backdropRef}
    >
      {children}
      {isModal && (
        <ModalForInput
          addDescription={addDescription}
          closeModal={setIsModal}
        />
      )}
    </div>
  );
}

export default App;
