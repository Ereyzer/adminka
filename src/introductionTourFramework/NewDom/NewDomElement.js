import React from 'react';

export function NewDomElement({ localName, classList, children }) {
  console.log({ localName, classList, children });
  return <div>{React.createElement(`${localName}`, null, children)}</div>;
}
