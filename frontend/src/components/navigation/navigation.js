import Navbar from 'react-bootstrap/Navbar';
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Navigation = () => {

    const name = localStorage.getItem("name");
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        navigate("/");
    }

    return (
        <Navbar className="bg-body-secondary">
            <Container>
                <Navbar.Brand>Improvement Proposal App</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>Logged as: {name}</Navbar.Text>
                    <Button className="ms-3" onClick={() => handleLogout()}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;