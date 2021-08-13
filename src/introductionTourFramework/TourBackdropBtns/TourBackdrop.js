import React, { useState, useRef, useEffect } from 'react';
import { TourBtns } from '../TourBtns/TourBtns';
import controlBtnsOnOfContext from '../helpers/context';
import { isAdmin } from '../helpers/isAdmin';
import ApiService from '../helpers/work-with-bakend';

export function TourBackdrop({ className = null, children, config }) {
  const apiService = new ApiService(config);
  const [isStartAddElements, setIsStartAddElements] = useState(false);
  const [elements, setElements] = useState([]);
  console.log(isStartAddElements);
  useEffect(() => {
    apiService.getElements().then(r => setElements(s => [...s, ...r.data]));
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
    </controlBtnsOnOfContext.Provider>
  );
}
