import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Viewcar = () => {

    const { id } = useParams();
    const [carData, setCar] = useState({});

    const callcar = async () => {

        try {
            const res = await fetch("/carcall", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    id
                })
            })
            const data = await res.json();
            console.log(data);
            setCar(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callcar();
    }, []);
    return (
        <>
            <p>Car Class:&emsp;{carData.carclass}</p>
            <p>Car Model:&emsp;{carData.carmodel}</p>
            <p>Car Transmission:&emsp;{carData.transmissiontype}</p>
            <p>Car Number:&emsp;{carData.carnumber}</p>
            <p>Car FuelType:&emsp;{carData.fueltype}</p>
            <p>Car Price Per Day:&emsp;{carData.priceperday}</p>
            <p>Car seatings:&emsp;{carData.seatingcapacity}</p>
            <Link to={`/getallcars`}><button>Back</button></Link>&emsp;<Link to={`/updatecar/${carData._id}`} > <button>Update Car</button></Link >
        </>
    )
}

export default Viewcar;