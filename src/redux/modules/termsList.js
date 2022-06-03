// termsList.js
import {db} from '../../firebase';
import {collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc} from 'firebase/firestore'


// action
const LOAD = 'termsList/LOAD';
const CREATE = 'termsList/CREATE';
const DELETE = 'termsList/DELETE';
const UPDATE = 'termsList/UPDATE';
const initialState = {
  list: [],
}

// action creator
export function loadTerms(terms){
  return {type: LOAD, terms}
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


export const createTermsFB = (new_item) => {
  return async function(dispatch){
    const docRef = await addDoc(collection(db, 'terms'), new_item)
    const _new = await getDoc(docRef);
    const new_term = {...new_item, id: _new.id};
    await dispatch(createTerms(new_term));
    window.location.href = '/';
  }
}

export const deleteTermsFB = (id) => { 
  return async function(dispatch, getState){
    const docRef = doc(db, 'terms', id);
    const term_id = docRef.id;
    await deleteDoc(docRef);
    dispatch(deleteTerms(term_id))
  }
}

export const updateTermsFB = (id, new_item) => {
  return async function(dispatch){
    const docRef = doc(db, 'terms', id);
    const prevDone = (await getDoc(docRef)).data().done;
    await updateDoc(docRef, {...new_item});
    await dispatch(updateTerms(id, new_item));
    // 공부 완료 상태만 변경됐을 경우에는 메인으로 이동하는 스크립트 작동하지 않도록 분기 처리
    if(prevDone === new_item.done) window.location.href = '/'; 
  }
}

// reducer
export default function reducer(state = initialState, action = {}){
  switch(action.type) {
    case 'termsList/LOAD': {
      console.log('load!')
      return {list: [...action.terms]};
    }
    case 'termsList/CREATE': {
      console.log('create!')
      const new_terms = [...state.list, action.new_term];
      return {list: new_terms};
    }
    case 'termsList/DELETE': {
      console.log('delete!')
      const new_terms = [...state.list].filter((v,i)=>{
        return v.id !== action.id;
      })
      return {list: new_terms};
    }
    case 'termsList/UPDATE': {
      console.log('update!')
      const _terms = [...state.list];
      const new_terms = _terms.map(v=>{
        if(v.id === action.id){
          return v = {...action.new_term, id: v.id};
        }else{
          return v;
        }
      })
      return {list: new_terms};
    }
    default: {
      return state;
    }
  }
}