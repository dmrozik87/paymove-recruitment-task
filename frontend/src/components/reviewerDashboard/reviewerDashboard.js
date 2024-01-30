import Navigation from "../navigation/navigation";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import {finishedStatuses} from "../../utils/utils";
import StatusBadge from "../statusBadge/statusBadge";

const ReviewerDashboard = () => {

    const navigate = useNavigate();
    const [improvementProposals, setImprovementProposals] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/improvement-proposals/for-review/${localStorage.getItem("userId")}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(response => response.json())
            .then(ipsData => setImprovementProposals(ipsData));
    }, []);

    function claimImprovementProposal(improvementProposal) {

        improvementProposal.reviewer = {
            userId: localStorage.getItem("userId")
        }
        improvementProposal.status = "In Review";

        fetch(`http://localhost:8080/improvement-proposals/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            method: "PUT",
            body: JSON.stringify(improvementProposal)
        }).then(response => response.json())
            .then(updatedImprovementProposal => {
                updateState(updatedImprovementProposal);
            })
    }

    function updateState(updatedImprovementProposal) {
        const newImprovementProposals = [...improvementProposals]
        const index = newImprovementProposals.findIndex(improvementProposal => improvementProposal.ipId === updatedImprovementProposal.ipId);
        newImprovementProposals[index] = updatedImprovementProposal;
        setImprovementProposals(newImprovementProposals);
    }

    return (
        <>
            <Navigation/>

            <Container className="mt-5">
                <Table bordered striped hover>
                    <thead>
                    <tr>
                        <th colSpan={5} className="text-center">In Review</th>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {improvementProposals.filter(ip => ip.status === "In Review").length === 0 ?
                        <tr>
                            <td colSpan={4} className="text-center">No "in review" improvement proposals found</td>
                        </tr>
                        :
                        improvementProposals.filter(ip => ip.status === "In Review")
                            .map(ip => {
                                return (
                                    <tr key={ip.ipId}>
                                        <td>{ip.title}</td>
                                        <td>{ip.department}</td>
                                        <td><StatusBadge text={ip.status}/></td>
                                        <td className="d-flex justify-content-around">
                                            <Button size="sm"
                                                    onClick={() => navigate(`/improvement-proposals/${ip.ipId}`)}>View</Button>
                                            {ip.status === "Pending Submission" ?
                                                <Button>Delete</Button>
                                                :
                                                ""
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </Table>

                <Table bordered striped hover className="mt-5">
                    <thead>
                    <tr>
                        <th colSpan={5} className="text-center">Awaiting Review</th>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {improvementProposals.filter(ip => ip.status === "Submitted" || ip.status === "Resubmitted").length === 0 ?
                        <tr>
                            <td colSpan={4} className="text-center">No "awaiting review" improvement proposals found
                            </td>
                        </tr>
                        :
                        improvementProposals.filter(ip => ip.status === "Submitted" || ip.status === "Resubmitted")
                            .sort(a => {
                                if (a.status === "Resubmitted") return -1;
                                else return 1;
                            })
                            .map(ip => {
                                return (
                                    <tr key={ip.ipId}>
                                        <td>{ip.title}</td>
                                        <td>{ip.department}</td>
                                        <td><StatusBadge text={ip.status}/></td>
                                        <td className="d-flex justify-content-around">
                                            <Button size="sm"
                                                    onClick={() => navigate(`/improvement-proposals/${ip.ipId}`)}>View</Button>
                                            <Button size="sm"
                                                    onClick={() => claimImprovementProposal(ip)}>Claim</Button>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </Table>

                <Table bordered striped hover className="mt-5">
                    <thead>
                    <tr>
                        <th colSpan={5} className="text-center">Needs Update</th>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {improvementProposals.filter(ip => ip.status === "Needs Update").length === 0 ?
                        <tr>
                            <td colSpan={4} className="text-center">No "needs update" improvement proposals found</td>
                        </tr>
                        :
                        improvementProposals.filter(ip => ip.status === "Needs Update")
                            .map(ip => {
                                return (
                                    <tr key={ip.ipId}>
                                        <td>{ip.title}</td>
                                        <td>{ip.department}</td>
                                        <td><StatusBadge text={ip.status}/></td>
                                        <td className="d-flex justify-content-around">
                                            <Button size="sm"
                                                    onClick={() => navigate(`/improvement-proposals/${ip.ipId}`)}>View</Button>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </Table>

                <Table bordered striped hover className="mt-5">
                    <thead>
                    <tr>
                        <th colSpan={5} className="text-center">Finished</th>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {improvementProposals.filter(ip => finishedStatuses.includes(ip.status)).length === 0 ?
                        <tr>
                            <td colSpan={4} className="text-center">No finished improvement proposals found</td>
                        </tr>
                        :
                        improvementProposals.filter(ip => finishedStatuses.includes(ip.status))
                            .map(ip => {
                                return (
                                    <tr key={ip.ipId}>
                                        <td>{ip.title}</td>
                                        <td>{ip.department}</td>
                                        <td><StatusBadge text={ip.status}/></td>
                                        <td className="d-flex justify-content-around">
                                            <Button size="sm"
                                                    onClick={() => navigate(`/improvement-proposals/${ip.ipId}`)}>View</Button>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default ReviewerDashboard;