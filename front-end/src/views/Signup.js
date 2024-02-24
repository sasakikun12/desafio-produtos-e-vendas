import React, { useState } from "react";
import { createUser } from "../resources/user";
import Cookies from "js-cookie";
import SignupImage from "../assets/signup.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import styled from "styled-components";

const StyledLogin = styled.div`
  height: 100vh;
  width: 100%;
`;

const Signup = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({
      username,
      password,
    })
      .then((response) => {
        Cookies.set("token", response.data.token);
        Cookies.set("username", response.data.username);
        Cookies.set("userid", response.data.userId);
        setError(false);
        window.location = "/";
      })
      .catch((error) => {
        setError(true);
        console.log("Error:", error);
      });
  };

  return (
    <div className="d-flex flex-row h-100 justify-content-between">
      <StyledLogin className="d-flex align-items-center container">
        <img src={SignupImage} className="w-100 p-5"></img>
      </StyledLogin>
      <StyledLogin className="d-flex flex-column justify-content-around p-5">
        <div className="p-5 shadow mr-3 rounded">
          <h1>Gerencie seus produtos e vendas</h1>
          <h2>Crie sua conta</h2>
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
                Usuário já existente!
              </div>
            )}
            <div className="d-flex justify-content-center">
              <Button onClick={handleSubmit} text={"Criar conta"} />
            </div>
          </form>
        </div>
      </StyledLogin>
    </div>
  );
};

export default Signup;
