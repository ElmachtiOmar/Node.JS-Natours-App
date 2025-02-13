/* eslint-disable*/
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { reviewScroll } from './reviewScroll';

const mapBox = document.getElementById('map');
const slider = document.querySelector('.reviews');
const loginForm = document.querySelector('.form');
const logOutBtn = document.querySelector('.nav__el--logout');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
if (slider) {
  reviewScroll(slider);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);
