import React from "react";
import {fullParseDevTime, parseDevTime} from "@/types/transactions";

interface TableRowProps {
    key: string;
    atmId: string;
    devTime: number;
    pan?: string;
    hst: {
        descr?: string;
    }
    ttp: {
        descr?: string;
    }
    amount?: number;
    amountW?: number;
    amountR?: number;
    ref?: string;
}

const TableRow: React.FC<TableRowProps> = ({ devTime, atmId, pan, hst, ttp, amount, amountW, amountR, ref }) => {
    return (
        <tr className="border-b-1 border-zinc-300 align-top">
            <td className="p-4">{parseDevTime(devTime)}</td>
            <td className="p-4">{atmId}</td>
            <td className="p-4">{pan}</td>
            <td className="p-4">
                <div>{hst?.descr}</div>
                <div className="my-2"></div>
                <div>{`Transaction Type: ${ttp?.descr}`}</div>
                <div className="my-2"></div>
                <div>{`Transaction Amount: $${amount}`}</div>
                <div>{`Withdrawn: $${amountW}`}</div>
                <div>{`Rejected: $${amountR}`}</div>
            </td>
            <td className="p-4">
                <div>{fullParseDevTime(devTime)}</div>
                <div className="my-2"></div>
                <div>{`Transaction #: ${ref}`}</div>
            </td>
        </tr>
    )
}

export default TableRow;