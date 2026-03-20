import React from "react";

interface ATMDropdownInputProps {
    id: string;
    setValue: (value: string) => void;
    uniqueATMNames: string[];
}

const ATMDropdownInput: React.FC<ATMDropdownInputProps> = ({ id, setValue, uniqueATMNames }) => {
    return (
        <select className="filter-box" id={id} onChange={(e) => setValue(e.target.value)}>
            <option key="all-atmid" value="all">All ATMS</option>
            {uniqueATMNames.map(( name ) => (
                <option key={name} value={name}>{name}</option>
            ))}
        </select>
    )
}

export default ATMDropdownInput;