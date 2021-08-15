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
  console.log(ctx.elements);
  ctx.elements.forEach(element => {
    console.log(
      document.querySelector(element.path),
      'description: ',
      element.description,
    );
  });
  // const testApi = ctx.apiService.getElements().then(console.log);
  //! Example how to get element
  // ctx.apiService.getElements().then(r => {
  //   console.log(r.data);
  //   ctx.apiService.searchNewElements(r.data);
  //   // r.data.data.elements.array.forEach(element => {
  //   //   console.log(element);
  //   // });
  // });
  //! Example how to delete element
  // ctx.apiService.delElement('6116c9bcad9fb632e4ff6b91');

  const addDescription = async text => {
    setDescription(text);
    addElement(path, text, ctx.setElements);
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
            // if(element)
            if (
              ctx.elements.some(
                el => document.querySelector(el.path) === element,
              )
            ) {
              console.log('element in DB', element);
              element.classList.add(`${styles.SelectClass}`);
            }
            console.log(element.attributes);
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
