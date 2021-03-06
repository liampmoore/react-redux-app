import axios from "axios";


export const FETCH_DATA = "FETCH_DATA";
export const UPDATE_RESULTS = "UPDATE_RESULTS";
export const SET_ERROR = "SET_ERROR";
export const getData = (query) => dispatch => {
console.log("ACTION: FETCH_DATA")
  dispatch({ type: FETCH_DATA });
  axios
    .get(`https://pixabay.com/api/?key=15324760-6eb23fcba13a8f624ea79af00&q=${query}&image_type=photo`)
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_RESULTS, payload: res.data.hits });
      res.data.hits.length === 0 && dispatch({type: SET_ERROR, payload: "Couldn't find any results for that."})
    })
    .catch(err => {
      console.error("error fetching data from api, err: ", err);
      dispatch({ type: SET_ERROR, payload: "There seems to be an issue with the server. Try again later." });
    });
};
