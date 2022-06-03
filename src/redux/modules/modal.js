// modal.js

// action
const TOGGLE = 'modal/TOGGLE';

const initialState = {
  status: false,
  item: null,
}

// action creator
export function toggleModal(modal){
  return {type: TOGGLE, modal}
}

// reducer
export default function reducer(state = initialState, action = {}){
  switch(action.type) {
    case 'modal/TOGGLE': {
      return {status: action.modal.status, item: action.modal.item};
    }
    default: {
      return state;
    }
  }
}