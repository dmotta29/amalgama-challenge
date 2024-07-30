import { useState } from "react";
import "./login.css";

//Aca en este componente se esta haciendo la logica para hacer el handle de login/logout usando el token que nos da el post request
//Hay varias cosas que refactorizaria pero por falta de tiempo no lo puedo hacer. Lo dejo asi funcionando

export const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  const handleLogIn = () => {
    setError(false);
    const data = new URLSearchParams({
      email: userData.email,
      password: userData.password,
    });

    fetch(
      "https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setError(true);
        throw new Error("Something went wrong");
      })
      .then((data) => setToken(data));
  };

  const handleInputChange = (e) => {
    const enteredText = e.target.value;
    const type = e.target.type;
    setUserData((prevState) => ({
      ...prevState,
      [type]: enteredText,
    }));
  };

  const handleLogOut = (e) => {
    setToken('')
  };

  return (
    <div>
      {token.length === 0 ? (
        <div>
          <h1>Log In</h1>
          <div className="login-container">
            <input
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <button onClick={handleLogIn}>Log In</button>
            {error && (
              <p>Ocurrio un error. Revisa los datos e intenta de nuevo</p>
            )}
          </div>
        </div>
      ) : (
        <div>
        <h1>Welcome</h1>
        <div className="login-container">
         
          <button onClick={handleLogOut}>Log Out</button>
         
        </div>
      </div>
      )}
    </div>
  );
};
