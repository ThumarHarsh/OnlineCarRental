import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, Link, useHistory } from 'react-router-dom';

const Confirmbooking = () => {
    const history = useHistory();
    const { id } = useParams();
    const [carData, setCar] = useState({});
    const [userData, setUserData] = useState({});

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
    const calluserprofile = async () => {
        try {
            const res = await fetch("/userprofile", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            console.log(data);
            setUserData(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push("/login");
        }
    }

    useEffect(() => {
        calluserprofile();
    }, [])
    useEffect(() => {
        callcar();
    }, []);


    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const handlestartdate = (date) => {
        setstartDate(date);
    }
    return (
        <>
            <div>
                <p>Your name:&emsp;{userData.name}</p>
                <p>Your Email:&emsp;{userData.email}</p>
                <p>Your Address:&emsp;{userData.address}</p>
                <p>Your Phone:&emsp;{userData.phone}</p>
                <p>Your Class:&emsp;{carData.carclass}</p>
                <p>Your Model:&emsp;{carData.carmodel}</p>
                <p>Your Transmission:&emsp;{carData.transmissiontype}</p>
                <p>Your Number:&emsp;{carData.carnumber}</p>
                <p>Your FuelType:&emsp;{carData.fueltype}</p>
                <p>Your Price Per Day:&emsp;{carData.priceperday}</p>
                <p>Your seatings:&emsp;{carData.seatingcapacity}</p>
                <p>Enter Your Booking Date:<DatePicker selected={startDate}
                    onChange={handlestartdate} dateFormat='dd/MM/yyyy' minDate={new Date()} />
                </p>
            </div>
        </>
    )
}

export default Confirmbooking;