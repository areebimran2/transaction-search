import React from "react";
import {parseDevTime, Query} from "@/types/transactions";

interface DateRangeInputProps {
    id: string
    setQuery: (value: Query) => void
    query: Query
}


const DateRangeInput: React.FC<DateRangeInputProps> = ({ id, setQuery, query }) => {
    return (
        <div id={id}>
            <input className="filter-box"
                   type="date"
                   value={parseDevTime(query.devtime0)}
                   // 00:00:00 for start of day 0
                   onChange={(e) => setQuery({
                       ...query,
                       devtime0: parseInt((e.target.value + "000000").replaceAll('-', ''))
                   })} />
            <span className="px-2">to</span>
            <input className="filter-box"
                   type="date"
                   value={parseDevTime(query.devtime1)}
                   // 23:59:59 for end of day 1
                   onChange={(e) => setQuery({
                       ...query,
                       devtime1: parseInt((e.target.value + "235959").replaceAll('-', ''))
                   })} />
        </div>
    )
}

export default DateRangeInput;