import React from 'react';
import s from './Button.module.css';

const Button = ({ children, onClick, id }) => (
  <button
    id={id ? id : ''}
    className={s.Button}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
