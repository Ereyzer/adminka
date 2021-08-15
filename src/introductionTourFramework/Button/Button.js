import React from 'react';
import s from './Button.module.css';

const Button = ({ children, onClick }) => (
  <button className={s.Button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
