import SubmitterDashboard from "../submitter/submitterDashboard";
import ReviewerDashboard from "../reviewer/reviewerDashboard";
import AdminPanel from "../admin/adminPanel";
import NoAuthorization from "../noAuthorization/noAuthorization";

const PrivateRoute = () => {
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

export default PrivateRoute;