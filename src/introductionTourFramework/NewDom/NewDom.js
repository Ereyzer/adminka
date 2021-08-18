import React, { useRef, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import controlBtnsOnOfContext from '../helpers/context';
import { NewDomElement } from './NewDomElement';
import { v4 as uuidv4 } from 'uuid';
import { element } from 'prop-types';
import styles from './NewDom.module.css';

export function NewDom({ reference }) {
  const ctx = useContext(controlBtnsOnOfContext);
  const newDomRef = useRef(null);
  console.log(reference.innerHTML);

  const selectElement = e => {
    e.stopPropagation();
    e.preventDefault();
    if (ctx.isAdminB) return;
    if (!ctx.isStartAddElements) return;

    const element = e.target;

    if (
      element.id === 'switch-work-administrator' ||
      element.id === 'add-selected-items'
    )
      return;

    ctx.setPath(e.nativeEvent.path);

    ctx.setIsModalDescription(true);
  };
  useEffect(() => {
    function noopElements(ref) {
      let nodeArr = [];
      if (ref.children) {
        const elements = ref.children;
        for (const element of elements) {
          //   element.onclick = selectElement;
          nodeArr.push(
            ...[ReactDOM.findDOMNode(element), ...noopElements(element)],
          );
        }
        return nodeArr;
      }
    }

    console.log(noopElements(newDomRef.current));
  }, [newDomRef]);
  return (
    <div
      className={styles.NewDomBackdrop}
      onClick={selectElement}
      ref={newDomRef}
      newdom-attribute="new-dom"
      dangerouslySetInnerHTML={createMarkup(reference.innerHTML)}
    />
  );
}
function createMarkup(text) {
  console.log('createMarkup');
  return { __html: text };
}
