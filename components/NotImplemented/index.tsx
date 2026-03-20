'use client'
import React from "react";

interface NotImplementedProps {
    value: string;
}

const NotImplemented: React.FC<NotImplementedProps> = ({ value }) => {
    return (
        <div onClick={() => alert("Not Implemented")}>{value}</div>
    )
}

export default NotImplemented;