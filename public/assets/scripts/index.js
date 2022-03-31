import { getRequest } from "../api/index.js";

const wrapper = document.querySelector(".wrapper");

const URL = "http://localhost:8000/";
const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getUsers = async () => {
  const users = await getRequest(URL, options);
  console.log(users);
  createUser(users);
};

getUsers();

const createUser = (users) => {
  const userList = users.users;
  userList.forEach((user) => {
    wrapper.insertAdjacentHTML(
      "afterbegin",
      `<a target="_blank" href='http://localhost:8000/${user.username}'>
      <div class="user">
    <div class="name"> ${user.name}</div>
    <div class="email"> ${user.email}</div>
  </div>
  </a>`
    );
  });
};
