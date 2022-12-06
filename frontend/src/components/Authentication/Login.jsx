import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { clearErrors, login } from "../../actions/userActions";
import { LOGIN_FAILS, LOGIN_SUCCESS } from "../../constants";
const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const navigator = useNavigate();
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user/login",
                { email, password }
            );
            dispatch({ type: LOGIN_SUCCESS, payload: data.user });
            toast({
                title: "Login Successful",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            navigator('/');
        } catch (error) {
            dispatch({ type: LOGIN_FAILS, payload: error.response.data.message })
            toast({
                title: "Error Occured!",
                description: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <div>
                or
            </div>
            <Button
                variant="solid"
                colorScheme="gray"
                width="100%"
                display="flex"
                justifyContent="start"
            >
                <FcGoogle />
                <p className="ml- mx-auto">Google</p>
            </Button>
            <div>Forgot password ? <a href="/forgot" className="text-blue-600">Click Here</a></div>
        </VStack>
    );
};

export default Login;