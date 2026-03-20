import React from "react";
import {Query} from "@/types/transactions";

interface PanInputProps {
    id: string;
    setQuery: (value: Query) => void;
    query: Query;
}

const PanInput: React.FC<PanInputProps> = ({ id, setQuery, query }) => {
    return (
        <input
            type="text"
            id={id}
            className="filter-box"
            placeholder="Partial or full card number"
            onChange={(e) => setQuery({ ...query, pan: e.target.value }
            )}/>
    )
}

export default PanInput;