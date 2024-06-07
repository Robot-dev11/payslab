import { useEffect, useState } from "react";
import axios from "axios";

/* eslint-disable react/prop-types */
const Balance = () => {

    const [amount, setAmount] = useState(0);

    useEffect(() => {
        fetchAmount();
    }, []);

    const fetchAmount = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setAmount(response.data.balance);
        } catch(err){
            console.error(err);
        }
    }


    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {Math.floor(amount)}
            </div>
        </div>
    )
}

export default Balance;