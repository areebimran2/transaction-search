import React, {useState} from "react";
import {Query} from "@/types/transactions";

interface SerialNumberInputProps {
    id: string;
    query: Query;
    setQuery: (query: Query) => void;
}

const SerialNumberInput: React.FC<SerialNumberInputProps> = ({ id, query, setQuery }) => {
    const setValue = (value: string) => {
        if (/^\d{4}$/.test(value)) {
            setQuery({ ...query, ref: value });
        } else if (value === '') {
            setQuery({ ...query, ref: undefined });
        }
    }

    return (
        <input
            type="text"
            id={id}
            className="filter-box"
            maxLength="4"
            placeholder="4 digit number"
            onChange={(e) => {
                setValue(e.target.value);
            }}
        />
    )
}

export default SerialNumberInput;