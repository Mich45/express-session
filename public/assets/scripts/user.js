import { getRequest } from "../api/index.js";
const loader = document.querySelector(".loader");
const emailHTML = document.querySelector(".email");
const usernameHTML = document.querySelector(".username");
const photoHTML = document.querySelector(".photo");
const linkHTML = document.querySelector(".btn-link");

// const user_id = localStorage.getItem("user_id");
const username = localStorage.getItem("username");

const URL = document.URL;
const option = {
  header: {
    "Content-Type": "application/json",
  },
};

const getUser = async () => {
  let responseData = await getRequest(URL, option);
  return responseData;
};

getUser().then((data) => {
  console.log(data);
  function updateDOM(userData) {
    if (userData) {
      console.log(userData);
      loader.style.display = "none";
      usernameHTML.innerHTML = `${userData.user.name}`;
      emailHTML.innerHTML = `${userData.user.email}`;
      photoHTML.innerHTML = `${userData.user.username[0].toUpperCase()}`;
    }
  }
  updateDOM(data);
});

if (username) {
  if (URL.split("/")[3] === username) {
    linkHTML.textContent = "Dashboard";
    linkHTML.setAttribute("href", "http://localhost:8000/dashboard");
  } else {
    linkHTML.textContent = "Follow";
  }
}
