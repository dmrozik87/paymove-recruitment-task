import Navigation from "../navigation/navigation";
import {useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";

const AdminPanel = () => {

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    function fetchUsers() {
        fetch("http://localhost:8080/users", {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
        }).then(response => {
            if (response.status !== 200) {
                console.error("something went wrong")
            } else {
                response.json()
                    .then(data => {
                        setUsersData(data);
                    });
            }
        })
    }

    function changeRole(userId, currentRole) {
        let newRole;
        if (currentRole === "SUBMITTER") newRole = "REVIEWER";
        else if (currentRole === "REVIEWER") newRole = "SUBMITTER";

        fetch(`http://localhost:8080/users/change-role/${userId}/${newRole}`, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            },
            method: "PATCH"
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("Role changed successfully")
                    updateUsersData(userId, newRole);
                } else {
                    console.log("Something went wrong")
                }
            })
    }

    function updateUsersData(userId, newRole) {
        const modifiedUsersData = [...usersData].map(user => {
            if (user.userId === userId) {
                return {...user, role: newRole}
            }
            return user;
        })
        setUsersData(modifiedUsersData);
    }

    return (
        <>
            <Navigation/>

            <Container className="mt-5">
                <Table bordered striped hover>
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usersData.map((user, index) => {
                        return (
                            <tr key={user.userId}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.userEmail}</td>
                                <td className="d-flex justify-content-between">
                                    {user.role}
                                    {user.role !== "ADMIN" ?
                                        <Button size="sm" onClick={() => changeRole(user.userId, user.role)}>Change
                                            role</Button>
                                        : ""}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default AdminPanel;