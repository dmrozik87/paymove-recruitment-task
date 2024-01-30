import React from 'react';
import {Badge} from "react-bootstrap";

const StatusBadge = ({text}) => {
    function getBadgeColor() {
        switch (text) {
            case "Completed":
                return "success";
            case "Needs Update":
            case "Rejected":
                return "danger";
            case "Pending Submission":
                return "warning";
            case "Resubmitted":
                return "primary";
            default:
                return "info";
        }
    }

    return (
        <Badge
            bg={getBadgeColor()}
            style={{fontSize: "0.9em"}}
        >
            {text}
        </Badge>
    );
};

export default StatusBadge;