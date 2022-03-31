import { getRequest } from "../api/index.js";
const form = document.querySelector("form");

const loginUser = async () => {
  const emailInput = document.getElementById("email").value;

  const passwordInput = document.getElementById("password").value;

  let formValues = {
    email: emailInput,
    password: passwordInput,
  };

  const URL = "http://localhost:8000/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  };

  const response = await getRequest(URL, options);
  console.log(response);

  const handleSubmitResponse = (data) => {
    if (data) {
      // Remove previously stored user data
      localStorage.clear();
      // Save user _id to LocalStorage
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("username", data.username);
        localStorage.setItem("name", data.name);
      // Show success message
      alert(data.message);
    }
  };

  handleSubmitResponse(response);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser().then((data) => {
    console.log(data);
    // Redirect user to Dasshboard after successful login
    window.location = "http://localhost:8000/dashboard";
  });
});
