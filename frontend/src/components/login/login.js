import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function sendLoginRequest() {

        const requestBody = {
            "username": username,
            "password": password
        }

        fetch("http://localhost:8080/auth/authenticate", {
            "headers": {
                "Content-Type": "application/json"
            },
            "method": "POST",
            "body": JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            localStorage.setItem("jwt", "Bearer " + data.token);
                            localStorage.setItem("userId", data.userId);
                            localStorage.setItem("role", data.role);
                            localStorage.setItem("name", data.name);
                            console.log("Login successful");
                            navigate("/dashboard");
                            window.location.reload();
                        })
                } else {
                    console.log("Invalid Credentials")
                }
            })
    }

    return (
        <Container className="d-flex justify-content-center align-items-center viewport-height">
            <Form className="w-25">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>

                <Button className="w-100" onClick={sendLoginRequest}>Login</Button>
                <p className="mt-5 text-center">If you don't have an account, <br/><a href="/register">please
                    register</a></p>

            </Form>
        </Container>
    )
}

export default Login;