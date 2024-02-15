// actions.js
export const SET_NAME = 'SET_NAME';

// Action Creator
export const setName = (name) => {
    //console.log(name);
    return {
      type: SET_NAME,
      payload: name,
    };
  };
  