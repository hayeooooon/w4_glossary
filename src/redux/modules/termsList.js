// termsList.js
import {db} from '../../firebase';
import {collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc} from 'firebase/firestore'


// action
const LOAD = 'termsList/LOAD';
const CREATE = 'termsList/CREATE';
const DELETE = 'termsList/DELETE';
const UPDATE = 'termsList/UPDATE';
const LOADTOEDIT = 'termsList/LOADTOEDIT'
const initialState = {
  list: [],
}

// action creator
export function loadTerms(terms){
  return {type: LOAD, terms}
}
export function loadToEdit(term){
  return {type: LOADTOEDIT, term}
}
export function createTerms(new_term){
  return {type: CREATE, new_term}
}
export function deleteTerms(id){
  return {type: DELETE, id}
}
export function updateTerms(id, new_term){
  return {type: UPDATE, id, new_term}
}




// middlewares
export const loadTermsFB = () => {
  return async function(dispatch){
    const data = await getDocs(collection(db, 'terms'))
    const terms = [];
    data.forEach(v=>terms.push({...v.data(), id: v.id}));
    
    dispatch(loadTerms(terms))
  }
}

// export const loadTermToEditFB = (id) => {
//   return async function(dispatch){
//     const _docRef = doc(db, 'terms', id);
//     const docRef = await getDoc(_docRef);
//     dispatch(loadToEdit(docRef.data()));
//   }
// }

export const createTermsFB = (new_item) => {
  return async function(dispatch){
    const docRef = await addDoc(collection(db, 'terms'), new_item)
    const _new = await getDoc(docRef);
    const new_term = {..._new.data(), id: _new.id};
    // dispatch(createTerms(new_term))
  }
}

export const deleteTermsFB = (id) => {
  return async function(dispatch, getState){
    const docRef = doc(db, 'terms', id);
    const term_id = docRef.id;
    await deleteDoc(docRef);

    console.log(term_id)
    dispatch(deleteTerms(term_id))
  }
}

export const updateTermsFB = (id, new_item) => {
  return async function(dispatch){
    const docRef = doc(db, 'terms', id);
    await updateDoc(docRef, {...new_item});
    dispatch(updateTerms(id, new_item));

  }
}

// reducer
export default function reducer(state = initialState, action = {}){
  switch(action.type) {
    case 'termsList/LOAD': {
      return {list: [...action.terms]};
    }
    // case 'termsList/LOADTOEDIT': {
    //   console.log('load to edit!');
    //   return {list: action.term};
    // }
    case 'termsList/CREATE': {
      console.log('create!')
      const new_terms = [...state.list, action.new_term];
      return {list: new_terms};
    }
    case 'termsList/DELETE': {
      console.log('delete!!')
      const new_terms = [...state.list].filter((v,i)=>{
        return v.id !== action.id;
      })
      return {list: new_terms};
    }
    case 'termsList/UPDATE': {
      console.log('update!!')
      const _terms = [...state.list];
      const new_terms = _terms.map(v=>{
        if(v.id === action.id){
          return v = {...action.new_term, id: v.id};
        }else{
          return v;
        }
      })
      console.log(new_terms)
      return {list: new_terms};
    }
    default: {
      return state;
    }
  }
}