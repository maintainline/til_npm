import axios from "axios";

const photoURL = "https://jsonplaceholder.typicode.com/photos";
const getPhotos = async () => {
  try {
    const res = await axios.get(photoURL);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const getPhoto = async id => {
  try {
    const res = await axios.get(`${photoURL}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const postPhoto = async data => {
  try {
    const res = await axios.post(photoURL, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const deletePhoto = async id => {
  try {
    const res = await axios.delete(`${photoURL}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const putPhoto = async (id, data) => {
  try {
    const res = await axios.put(`${photoURL}/${id}`, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
const patchPhoto = async (id, {}) => {
  try {
    const res = await axios.patch(`${photoURL}/${id}`, {});
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
export { getPhotos, getPhoto, postPhoto, deletePhoto, putPhoto, patchPhoto };
