import React, { useReducer, useEffect, useContext } from 'react';
import JoyRide, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

const TOUR_STEPS = [
  {
    target: '[tour-attribute="formForAddContacts"] form input[name="name"]',
    content: 'Write the name of the subscriber',
    disableBeacon: true,
  },

  {
    target: '.MuiButton-label',
    content: 'Save the contact',
  },
  {
    target: '.Filter_Input__2-B-n',
    content: 'Start typing a contact name to filter',
  },
  {
    target: '[tour-attribute="listOfContacts"] ul li div',
    content: 'You can delete a contact',
  },
];

const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, run: true };
    case 'RESET':
      return { ...state, stepIndex: 0 };
    case 'STOP':
      return { ...state, run: false };
    case 'NEXT_OR_PREV':
      return { ...state, ...action.payload };
    case 'RESTART':
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};

const Tour = () => {
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (!localStorage.getItem('tour')) {
      dispatch({ type: 'START' });
    }
  }, []);

  const callback = data => {
    const { action, index, type, status } = data;

    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: 'STOP' });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: 'NEXT_OR_PREV',
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  const startTour = () => {
    dispatch({ type: 'RESTART' });
  };

  return (
    <>
      <button className="btn btn-primary" onClick={startTour}>
        Start Tour
      </button>

      <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        showProgress={true}
        styles={{
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonNext: {
            backgroundColor: 'rgba(0, 139, 139, 0.845)',
            color: 'bisque',
          },
          buttonBack: {
            marginRight: 10,
          },
          buttonClose: {
            color: 'red',
          },
          buttonSkip: {
            backgroundColor: 'bisque',
            color: 'rgb(0, 139, 139)',
          },
        }}
        locale={{
          last: 'End tour',
          skip: 'Close tour',
        }}
      />
    </>
  );
};

export default Tour;
