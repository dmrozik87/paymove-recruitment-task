import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import Navigation from "../navigation/navigation";
import {departments} from "../../utils/utils";

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
        console.log(improvementProposal)
        if (improvementProposal.status === "Pending Submission") {
            updateImprovementProposal("status", "Submitted");
        }
        console.log(improvementProposal)
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
                                disabled={improvementProposal.status !== "Pending Submission"}
                                placeholder="Enter title"
                                value={improvementProposal.title === null ? "" : improvementProposal.title}
                                onChange={(event) => updateImprovementProposal("title", event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                disabled={true}
                                value={improvementProposal.status}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select
                                disabled={improvementProposal.status !== "Pending Submission"}
                                value={improvementProposal.department === null ? undefined : improvementProposal.department}
                                onChange={(event) => updateImprovementProposal("department", event.target.value)}
                            >
                                <option>Select department</option>
                                {departments.map(department => {
                                        return (
                                            <option key={department} value={department}>{department}</option>
                                        )
                                    }
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                disabled={improvementProposal.status !== "Pending Submission" && improvementProposal.status !== "Needs Update"}
                                as="textarea"
                                rows={5}
                                placeholder="Enter description"
                                value={improvementProposal.description === null ? undefined : improvementProposal.description}
                                onChange={(event) => updateImprovementProposal("description", event.target.value)}
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