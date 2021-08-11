import React, { useState, useRef } from 'react';
import { TourBtns } from '../TourBtns/TourBtns';
import controlBtnsOnOfContext from '../helpers/context';
import { isAdmin } from '../helpers/isAdmin';
import ApiService from '../helpers/work-with-bakend';

export function TourBackdrop({ className = null, children, config }) {
  const apiService = new ApiService(config);
  const [isStartAddElements, setIsStartAddElements] = useState(false);
  console.log(isStartAddElements);

  return (
    <controlBtnsOnOfContext.Provider
      value={{ isStartAddElements, apiService: apiService }}
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
