import React from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { loginUser } from "../../reducers/loginReducer";
import { setMessageAndError } from "../../helpers/setMessageAndError";

import loginService from "../../services/login";

import {
    Form,
    Input,
    Label,
    FormButtonWrapper,
} from "../UI/Forms/FormElements";
import { Button } from "../UI/Button/Button";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const clearInput = () => {
        setUsername("");
        setPassword("");
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem("loggedMidtraderUser", JSON.stringify(user));

            dispatch(loginUser(user));
            setMessageAndError(dispatch, `user ${username} logged in`);

            clearInput();
        } catch (exception) {
            const errorMessage = exception.response.data.error;
            setMessageAndError(dispatch, `${errorMessage}`, true);
            clearInput();
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <Label>username: </Label>
            <Input
                id="login-username"
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            <Label>password: </Label>
            <Input
                id="login-password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            <FormButtonWrapper>
                <Button id="login-button">log in</Button>
            </FormButtonWrapper>
        </Form>
    );
};

export default LoginForm;
