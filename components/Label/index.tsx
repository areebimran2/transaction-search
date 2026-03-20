import React from "react";

interface LabelProps {
    id: string;
    value: string;
}

const Label: React.FC<LabelProps> = ({ id, value }) => {
    return (
        <label className="text-tiny font-medium" htmlFor={id}>{value}</label>
    )
}

export default Label;