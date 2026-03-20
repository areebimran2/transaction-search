'use client'
import {useEffect, useState} from "react";
import TableRow from "@/components/TableRow";
import Label from "@/components/Label";
import DateRangeInput from "@/components/DateRangeInput";
import ATMDropdownInput from "@/components/ATMDropdownInput";
import {AID, devtime0Default, devtime1Default, Query} from "@/types/transactions";
import PanInput from "@/components/PanInput";
import AIDDropdownInput from "@/components/AIDDropdownInput";
import SerialNumberInput from "@/components/SerialNumberInput";

interface ATM {
    id: number;
    name: string;
    ts: number;
}

interface Transaction {
    atm: {
        id: number;
        txt: string;
    }
    hst: {
        descr?: string;
    }
    ttp: {
        descr?: string;
    }
    pan?: string;
    devTime: number;
    ref?: string;
    amount: number;
    amountW: number;
    amountR: number;
}


export default function Transactions() {
    const [ATM, setATM] = useState<ATM[]>([]);
    const [AID, setAID] = useState<AID[]>([]);
    const [query, setQuery] = useState<Query>({
        devtime0: devtime0Default,
        devtime1: devtime1Default,
        atmId: []
    });
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const onATMChange = (value: string) => {
        if (value === "all") {
            setQuery({ ...query, atmId: ATM.map(({ id }) => id) });
        } else {
            setQuery({ ...query,
                atmId: ATM
                    .filter((element) => element.name === value)
                    .map(({ id }) => id) });
        }
     }

     const onAIDChange = (value: string) => {
        value === "all" ? setQuery({ ...query, aidId: undefined }) : setQuery({ ...query, aidId: parseInt(value) });
     }

    const fetchAIDs = async () => {
        try {
            const response = await fetch(`https://dev.smartjournal.net/um/test/api/jr/txn/aidlist/v1`);
            const data = await response.json();
            setAID(data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchATMs = async () => {
        try {
            const response = await fetch(`https://dev.smartjournal.net/um/test/api/jr/txn/atmlist/v1`);
            const data = await response.json();
            setATM(data);
            setQuery({ ...query, atmId: data.map(({ id }) => id) })
        } catch (error) {
            console.error(error);
        }
    }

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`https://dev.smartjournal.net/um/test/api/jr/txn/v1`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(query)
            })
            const data = await response.json();
            setTransactions(data.txn);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchATMs();
    }, [])

    useEffect(() => {
        fetchAIDs();
    }, []);

    useEffect(() => {
        if (query.atmId.length === 0) return;
        fetchTransactions();
    }, [query]);

    const uniqueATMNames = Array.from(new Map(ATM.map(atm => [atm.name, atm.id])).keys());

    return (
        <div className="ml-auto grid grid-col-5 mx-4">
            <div className="col-span-5 flex justify-between my-4">
                <h1 className="text-lg">All Transactions</h1>
                <div className="mx-2">
                    <button onClick={() => alert("Not Implemented")} className="small-btn">Print</button>
                    <button onClick={() => alert("Not Implemented")} className="small-btn">Export</button>
                </div>
            </div>
            <div className="col-span-5 flex justify-between">
                <div className="grid">
                    <Label id="date" value="DATE" />
                    <DateRangeInput id="date"
                                    query={query}
                                    setQuery={setQuery} />
                </div>
                <div className="grid w-12/100">
                    <Label id="atms" value="ATM ID" />
                    <ATMDropdownInput id="atms" setValue={onATMChange} uniqueATMNames={uniqueATMNames} />
                </div>
                <div className="grid w-16/100">
                    <Label id="cpn" value="CUSTOMER PAN NUMBER" />
                    <PanInput id="cpn" query={query} setQuery={setQuery} />
                </div>
                <div className="grid">
                    <Label id="aids" value="EMV CHIP AID" />
                    <AIDDropdownInput id="aids" setValue={onAIDChange} AID={AID} />
                </div>
                <div className="grid">
                    <Label id="ref" value="TRANSACTION SERIAL NUMBER" />
                    <SerialNumberInput id="ref" query={query} setQuery={setQuery} />
                </div>
            </div>
            <table className="transaction-table col-span-5">
                <thead className="text-left">
                    <tr className="border-b-2 border-zinc-300">
                        <th className="p-4 w-12/100" key="date">Date</th>
                        <th className="p-4 w-8/100" key="atmId">ATM ID</th>
                        <th className="p-4 w-12/100" key="pan">Customer PAN</th>
                        <th className="p-4 w-38/100" key="description">Description</th>
                        <th className="p-4" key="code">Code</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map(({ atm, pan, devTime, hst, ttp, amount, amountW, amountR, ref }) => (
                        <TableRow
                            key={`${devTime}.${atm.id}`}
                            atmId={atm.txt}
                            devTime={devTime}
                            pan={pan}
                            hst={hst}
                            ttp={ttp}
                            amount={amount}
                            amountR={amountR}
                            amountW={amountW}
                            ref={ref} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}