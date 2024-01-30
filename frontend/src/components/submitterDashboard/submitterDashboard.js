import Navigation from "../navigation/navigation";
import {Button, Container, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {finishedStatuses} from "../../utils/utils";
import StatusBadge from "../statusBadge/statusBadge";

const SubmitterDashboard = () => {

    const navigate = useNavigate();
    const [improvementProposals, setImprovementProposals] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/improvement-proposals/by-user/${localStorage.getItem("userId")}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(response => response.json())
            .then(ipsData => setImprovementProposals(ipsData));
    }, []);

    function createImprovementProposal() {
        fetch(`http://localhost:8080/improvement-proposals/${localStorage.getItem("userId")}`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            },
            method: "POST",
        }).then(response => response.json())
            .then(improvementProposal => navigate(`/improvement-proposals/${improvementProposal.ipId}`))
    }

    function deleteIp(ipId) {
        fetch(`http://localhost:8080/improvement-proposals/${ipId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            method: "DELETE"
        }).then(response => {
            if (response.status === 200) {
                removeIpFromState(ipId);
            }
        })
    }

    function removeIpFromState(ipId) {
        const newImprovementProposals = [...improvementProposals].filter(ip => ip.ipId !== ipId);
        setImprovementProposals(newImprovementProposals);
    }

    return (
        <>
            <Navigation/>
            <Container className="d-flex justify-content-center mt-5">
                <Button onClick={() => createImprovementProposal()}>Create New Improvement Proposal</Button>
            </Container>
            <Container className="mt-5">
                <Table bordered striped hover>
                    <thead>
                    <tr>
                        <th colSpan={5} className="text-center">Ongoing</th>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {improvementProposals.filter(ip => !finishedStatuses.includes(ip.status)).length === 0 ?
                        <tr>
                            <td colSpan={4} className="text-center">No ongoing improvement proposals found</td>
                        </tr>
                        :
                        improvementProposals.filter(ip => !finishedStatuses.includes(ip.status))
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
                                                <Button size="sm" onClick={() => deleteIp(ip.ipId)}>Delete</Button>
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

export default SubmitterDashboard;