import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function sendRegisterRequest() {

        const requestBody = {
            "username": username,
            "email": email,
            "password": password
        }

        fetch("http://localhost:8080/auth/register", {
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
                            console.log("Registration successful");
                            navigate("/dashboard")
                        })
                } else {
                    console.log("Username or email already exists")
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
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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

                <Button className="w-100" onClick={sendRegisterRequest}>Create account</Button>
            </Form>
        </Container>
    )
}

export default Register;