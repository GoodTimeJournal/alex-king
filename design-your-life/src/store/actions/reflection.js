import axios from 'axios';

export const GET_REFLECTIONS = 'GET_REFLECTIONS';
export const GET_REFLECTIONS_COMPLETE = 'GET_REFLECTIONS_COMPLETE';
export const GET_REFLECTIONS_FAIL = 'GET_REFLECTIONS_FAIL';
export const ADD_REFLECTION = 'ADD_REFLECTION';
export const ADD_REFLECTION_COMPLETE = 'ADD_REFLECTION_COMPLETE';
export const ADD_REFLECTION_FAIL = 'ADD_REFLECTION_FAIL';
export const OPEN_REFLECTION = 'OPEN_REFLECTION';
export const UPDATE_REFLECTION = 'UPDATE_REFLECTION';
export const UPDATE_REFLECTION_COMPLETE = 'UPDATE_REFLECTION_COMPLETE';
export const UPDATE_REFLECTION_FAIL = 'UPDATE_REFLECTION_FAIL';
export const DELETE_REFLECTION = 'DELETE_REFLECTION';
export const DELETE_REFLECTION_COMPLETE = 'DELETE_REFLECTION_COMPLETE';
export const DELETE_REFLECTION_FAIL = 'DELETE_REFLECTION_FAIL';

const baseURL = 'https://polar-plateau-24996.herokuapp.com';

export const getReflections = token => dispatch => {
  dispatch({
    type: GET_REFLECTIONS
  });

  axios
    .get(`${baseURL}/reflections`, { headers: { Authorization: token } })
    .then(res =>
      dispatch({
        type: GET_REFLECTIONS_COMPLETE,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const addReflection = (token, reflection) => dispatch => {
  dispatch({
    type: ADD_REFLECTION
  });
  axios
    .post(`${baseURL}/reflections`, reflection, {
      headers: { Authorization: token }
    })
    .then(res =>
      dispatch({
        type: ADD_REFLECTION_COMPLETE
      })
    )
    .then(() =>
      axios
        .get(`${baseURL}/reflections`, { headers: { Authorization: token } })
        .then(res =>
          dispatch({
            type: GET_REFLECTIONS_COMPLETE,
            payload: res.data
          })
        )
    )
    .catch(err =>
      dispatch({
        type: ADD_REFLECTION_FAIL,
        error: err
      })
    );
};

export const openReflection = reflection => {
  return {
    type: OPEN_REFLECTION,
    payload: reflection
  };
};

export const updateReflection = reflection => dispatch => {
  axios
    .put(
      `http://localhost:5000/api/user/reflection/${reflection.id}`,
      reflection
    )
    .then(res =>
      dispatch({
        type: UPDATE_REFLECTION_COMPLETE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: UPDATE_REFLECTION_FAIL,
        error: err
      })
    );
};

export const deleteReflection = (token, id) => dispatch => {
  dispatch({ type: DELETE_REFLECTION });
  axios
    .delete(`${baseURL}/reflections/${id}`, {
      headers: { Authorization: token }
    })
    .then(res =>
      dispatch({
        type: DELETE_REFLECTION_COMPLETE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: DELETE_REFLECTION_FAIL,
        payload: err
      })
    );
};
