const form = document.querySelector("form");

let responseData;

const createUser = async () => {
  const nameInput = document.getElementById("name").value;

  const userNameInput = document.getElementById("username").value;

  const emailInput = document.getElementById("email").value;

  const passwordInput = document.getElementById("password").value;

  let formValues = {
    name: nameInput,
    username: userNameInput.toLowerCase(),
    email: emailInput,
    password: passwordInput,
  };

  await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  })
    .then((response) => response.json())
    .then((data) => {
      responseData = data;
      console.log(responseData);
    });
  return responseData;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createUser().then(() => {
     // Redirect user to Login after showing success message
     window.location = "http://localhost:8000/login";
  })
});
