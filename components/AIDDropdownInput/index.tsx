import React from "react";
import {AID} from "@/types/transactions";

interface AIDDropdownInputProps {
    id: string;
    setValue: (value: string) => void;
    AID: AID[];
}

const AIDDropdownInput: React.FC<AIDDropdownInputProps> = ({ id, setValue, AID }) => {
    return (
        <select className="filter-box" id={id} onChange={(e) => setValue(e.target.value)}>
            <option key="all-aid" value="all">All applications</option>
            {AID.map(({ id, aid }) => (
                <option key={id} value={id}>{aid}</option>
            ))}
        </select>
    )
}

export default AIDDropdownInput;