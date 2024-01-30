import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import Navigation from "../navigation/navigation";
import CommentSection from "../commentSection/commentSection";
import StatusBadge from "../statusBadge/statusBadge";

const ReviewerIpView = () => {

    const [improvementProposal, setImprovementProposal] = useState({});
    const [author, setAuthor] = useState({});

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
            .then(ipData => {
                setImprovementProposal(ipData)
                setAuthor(ipData.user)
            })
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

    return (
        <>
            <Navigation/>
            <Container className="d-flex">
                <Container className="d-flex justify-content-center align-items-center viewport-height">
                    {improvementProposal ?
                        <Form className="w-75">

                            <Form.Group className="mb-3">
                                <Form.Label>Created by</Form.Label>
                                <Form.Control
                                    disabled={true}
                                    value={author.username || ""}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    disabled={true}
                                    value={improvementProposal.title || ""}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <p><StatusBadge text={improvementProposal.status}/></p>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Select
                                    disabled={true}
                                >
                                    <option>{improvementProposal.department || ""}</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    disabled={true}
                                    as="textarea"
                                    rows={5}
                                    value={improvementProposal.description || ""}
                                />
                            </Form.Group>

                            <Form.Group className="d-flex justify-content-between">
                                {improvementProposal.status === "In Review" ?
                                    <>
                                        <Button onClick={() => updateImprovementProposal("status", "Completed")}>Complete
                                            Review</Button>
                                        <Button onClick={() => updateImprovementProposal("status", "Needs Update")}
                                                variant="warning">Send to Update</Button>
                                        <Button onClick={() => updateImprovementProposal("status", "Rejected")}
                                                variant="danger">Reject</Button>
                                    </>
                                    :
                                    ""
                                }
                                <Button onClick={() => navigate("/dashboard")} variant="secondary">Back</Button>
                            </Form.Group>
                        </Form>
                        :
                        <h1>Loading</h1>
                    }

                </Container>
                <CommentSection ipId={ipId} ipStatus={improvementProposal.status}/>
            </Container>
        </>
    )
}

export default ReviewerIpView;