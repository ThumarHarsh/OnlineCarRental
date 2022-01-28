import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Bookcar = () => {

    const [carData, setcarData] = useState([]);
    const callavailcar = async () => {
        try {
            const res = await fetch('/availcar', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            console.log(data);
            setcarData(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callavailcar();
    }, [])
    return (
        <>
            <h1>Book CAR Here</h1>
            {
                carData.map((curElm) => {
                    return (
                        <>
                            <div key={curElm._id}>
                                <p>Car Company:&emsp;{curElm.companyname}</p>
                                <p>Car Class:&emsp;{curElm.carclass}</p>
                                <p>Car Model:&emsp;{curElm.carmodel}</p>
                                <p>Car Transmission:&emsp;{curElm.transmissiontype}</p>
                                <p>Car Number:&emsp;{curElm.carnumber}</p>
                                <p>Car FuelType:&emsp;{curElm.fueltype}</p>
                                <p>Car Price Per Day:&emsp;{curElm.priceperday}</p>
                                <p>Car seatings:&emsp;{curElm.seatingcapacity}</p>
                                <Link to={`/confirmbooking/${curElm._id}`}><button>Book Car</button></Link>
                            </div>
                            <br></br><br></br>
                        </>
                    )
                })
            }
        </>
    )
}

export default Bookcar;