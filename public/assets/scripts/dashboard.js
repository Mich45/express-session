import { getRequest } from "../api/index.js";
const welcomeHTML = document.querySelector(".welcome");

const form = document.querySelector('form');

const username = localStorage.getItem("username");

const URL = `http://localhost:8000/${username}`;

const fetchUser = async () => {
  const result = await getRequest(URL);
  return result;
};
fetchUser().then((result) => {
    updateDOM(result);
});

const updateDOM = (data) => {
  console.log(data);
  welcomeHTML.textContent = `Welcome to your dashboard, ${data.user.name}!`;
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.clear();

    // window.location = 'http://localhost:8000/';
})
