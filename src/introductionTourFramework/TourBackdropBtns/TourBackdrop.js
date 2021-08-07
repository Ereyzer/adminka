import React, { useState } from 'react';
import { TourBtns } from '../TourBtns/TourBtns';
import controlBtnsOnOfContext from '../helpers/context';
import { isAdmin } from '../helpers/isAdmin';
export function TourBackdrop({ className = null, children }) {
  const [isStartAddElements, setIsStartAddElements] = useState(false);
  console.log(isStartAddElements);

  return (
    <controlBtnsOnOfContext.Provider value={isStartAddElements}>
      <div className={className}>
        {children}
        {isAdmin() && (
          <TourBtns changeIsStartAddElements={setIsStartAddElements} />
        )}
      </div>
    </controlBtnsOnOfContext.Provider>
  );
}
