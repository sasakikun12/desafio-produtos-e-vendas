import React, { useState } from "react";
import { signIn } from "../resources/user";
import Cookies from "js-cookie";
import LoginImage from "../assets/login.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import styled from "styled-components";

const StyledLogin = styled.div`
  height: 100vh;
  width: 100%;
`;

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({
      username,
      password,
    })
      .then((response) => {
        setError(false);
        Cookies.set("token", response.data);
      })
      .catch((error) => {
        setError(true);
        console.log("Error:", error);
      });
  };

  return (
    <div className="d-flex flex-row h-100 justify-content-between">
      <StyledLogin className="d-flex align-items-center container">
        <img src={LoginImage} className="w-100"></img>
      </StyledLogin>
      <StyledLogin className="d-flex flex-column justify-content-around p-5">
        <div className="p-5 shadow mr-3 rounded">
          <h1>Gerencie seus produtos e vendas</h1>
          <h2>Entrar</h2>
          <form>
            <Input
              text={"Usuário"}
              type={"text"}
              id={"username"}
              placeholder={"Insira seu usuário"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              text={"Senha"}
              type={"password"}
              id={"password"}
              placeholder={"Insira sua senha"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="text-center m-3 text-danger">
                Usuário ou senha inválidos!
              </div>
            )}

            <Button onClick={handleSubmit} text={"Entrar"} />
          </form>
        </div>
      </StyledLogin>
    </div>
  );
};

export default Login;
