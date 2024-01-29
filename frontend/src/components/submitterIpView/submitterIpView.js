import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import Navigation from "../navigation/navigation";

const SubmitterIpView = () => {

    const [improvementProposal, setImprovementProposal] = useState({});

    const {ipId} = useParams();
    const navigate = useNavigate();
    const previousImprovementProposal = useRef(improvementProposal);

    useEffect(() => {
        fetch(`http://localhost:8080/improvement-proposals/${ipId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(response => response.json())
            .then(ipData => setImprovementProposal(ipData))
    }, []);

    useEffect(() => {
        if (previousImprovementProposal.current.status !== improvementProposal.status) {
            sendSaveRequest();
        }
        previousImprovementProposal.current = improvementProposal;
    }, [improvementProposal]);

    function updateImprovementProposal(property, value) {
        const newImprovementProposal = {...improvementProposal};
        newImprovementProposal[property] = value;
        setImprovementProposal(newImprovementProposal);
    }

    function sendSaveRequest() {
        fetch(`http://localhost:8080/improvement-proposals/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            method: "PUT",
            body: JSON.stringify(improvementProposal)
        })
            .then(response => {
                if (response.status === 200) return response.json()
            })
            .then(ipData => setImprovementProposal(ipData))
    }

    function changeStatusAndSubmit() {
        if (improvementProposal.status === "Pending Submission") {
            updateImprovementProposal("status", "Submitted");
        }
    }

    return (
        <>
            <Navigation/>
            <Container className="d-flex justify-content-center align-items-center viewport-height">
                {improvementProposal ?
                    <Form className="w-25">
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                disabled={true}
                                value={improvementProposal.title === null ? undefined : improvementProposal.title}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                disabled={true}
                                value={improvementProposal.status === null ? undefined : improvementProposal.status}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select
                                disabled={improvementProposal.status !== "Pending Submission"}
                                value={improvementProposal.department === null ? undefined : improvementProposal.department}
                            >
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                disabled={true}
                                as="textarea"
                                rows={5}
                                value={improvementProposal.description === null ? undefined : improvementProposal.description}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-between">
                            {improvementProposal.status === "Pending Submission" || improvementProposal.status === "Needs Update" ?
                                <>
                                    <Button onClick={() => sendSaveRequest()}>Save</Button>
                                    <Button onClick={() => changeStatusAndSubmit()}>Submit</Button>
                                </>
                                :
                                ""
                            }
                            <Button onClick={() => navigate("/dashboard")}>Back</Button>
                        </Form.Group>
                    </Form>
                    :
                    <h1>Loading</h1>
                }
            </Container>
        </>
    )
}

export default SubmitterIpView;