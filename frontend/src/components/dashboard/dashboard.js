import SubmitterDashboard from "../submitterDashboard/submitterDashboard";
import ReviewerDashboard from "../reviewerDashboard/reviewerDashboard";
import AdminPanel from "../admin/adminPanel";
import NoAuthorization from "../noAuthorization/noAuthorization";

const Dashboard = () => {
    const role = localStorage.getItem("role")

    switch (role) {
        case ("SUBMITTER"):
            return <SubmitterDashboard/>
        case ("REVIEWER"):
            return <ReviewerDashboard/>
        case ("ADMIN"):
            return <AdminPanel/>
        default:
            return <NoAuthorization/>
    }
};

export default Dashboard;