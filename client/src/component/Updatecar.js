import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
const Updatecar = () => {
    const history = useHistory();
    const { id } = useParams();
    const [carData, setCar] = useState({});
    let name, value;
    const details_input = (event) => {
        name = event.target.name;
        value = event.target.value;
        setCar({ ...carData, [name]: value });
    }
    const callcarupdate = async () => {
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
        callcarupdate();
    }, [])

    const AcquireData = async (event) => {
        event.preventDefault();
        const { _id, companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday } = carData;
        const res = await fetch('/updatecar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id, companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday
            })
        })
        const data = await res.json();
        if (!data.status === 202 || !data) {
            window.alert("User Updation Unsuccessful");
        } else {
            window.alert("Car Updation Success");
            history.push(`/viewcar/${id}`);
        }
    }

    return (
        <>
            <form method="POST">
                <div>
                    <label>Car companyname:&emsp;</label>
                    <input type="text" name="companyname" onChange={details_input} value={carData.companyname} />
                </div>
                <br></br>
                <div>
                    <label>Car Class:&emsp;</label>
                    <input type="text" name="carclass" onChange={details_input} value={carData.carclass} />
                </div>
                <br></br>
                <div>
                    <label>Car Model:&emsp;</label>
                    <input type="text" name="carmodel" onChange={details_input} value={carData.carmodel} />
                </div>
                <br></br>
                <div>
                    <label>Car Transmission:&emsp;</label>
                    <input type="text" name="transmission" onChange={details_input} value={carData.transmissiontype} />
                </div>
                <br></br>
                <div>
                    <label>Car Number:&emsp;</label>
                    <input type="text" name="carnumber" onChange={details_input} value={carData.carnumber} />
                </div>
                <br></br>
                <div>
                    <label>car FuelType:&emsp;</label>
                    <input type="text" name="fueltype" onChange={details_input} value={carData.fueltype} />
                </div>
                <br></br>
                <div>
                    <label>Car Price per day:&emsp;</label>
                    <input type="text" name="priceperday" onChange={details_input} value={carData.priceperday} />
                </div>
                <br></br>
                <div>
                    <label>Car Seating Capacity:&emsp;</label>
                    <input type="text" name="seatingcapacity" onChange={details_input} value={carData.seatingcapacity} />
                </div>
                <br></br>
                <div>
                    <input type="submit" onClick={AcquireData} value="Update" />&emsp;
                    <Link to={`/viewcar/${id}`}><button>Back</button></Link>

                </div>
            </form>

        </>
    )
}

export default Updatecar;