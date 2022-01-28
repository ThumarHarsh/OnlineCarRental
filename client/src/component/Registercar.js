import React, { useState } from 'react';

import { NavLink, useHistory } from "react-router-dom";

const Registercar = () => {

    const history = useHistory();
    const [car, setCar] = useState({
        companyname: "",
        carmodel: "",
        carclass: "",
        transmissiontype: "",
        seatingcapacity: "",
        fueltype: "",
        carnumber: "",
        priceperday: "",
    });
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setCar({ ...car, [name]: value });
    }
    const AddData = async (e) => {
        e.preventDefault();
        const { companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday } = car;

        const res = await fetch('/carreg', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday
            })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Registration Successful");
            console.log("Registration Successful");
            history.push("/");
        }

    }

    return (
        <>
            <form method="POST">
                <div>
                    <label htmlFor="companyname">Car Caompany:&emsp;</label>
                    <input type="text" name="companyname" id="companyname" autocomplete="off"
                        value={car.companyname}
                        onChange={handleInputs}
                        placeholder="Enter The Company of the Car" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="carmodel">Car model:&emsp;</label>
                    <input type="text" name="carmodel" id="carmodel" autocomplete="off"
                        value={car.carmodel}
                        onChange={handleInputs}
                        placeholder="Enter The Car Model" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="carclass">Car Class:&emsp;</label>
                    <input type="text" name="carclass" id="carclass" autocomplete="off" value={car.carclass} onChange={handleInputs} placeholder="Enter The Car Class" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="transmissiontype">Car Transmission Type:&emsp;</label>
                    <input type="text" name="transmissiontype" id="transmissiontype" autocomplete="off" value={car.transmissiontype} onChange={handleInputs} placeholder="Enter The Transmission Type" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="seatingcapacity">Car Seating Capacity:&emsp;</label>
                    <input type="text" name="seatingcapacity" id="seatingcapacity" autocomplete="off" value={car.seatingcapacity} onChange={handleInputs} placeholder="Enter The Seating Capacity" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="fueltype">Car Fuel Type:&emsp;</label>
                    <input type="text" name="fueltype" id="fueltype" autocomplete="off" value={car.fueltype} onChange={handleInputs} placeholder="Enter The Fuel Type" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="carnumber">Car Number:&emsp;</label>
                    <input type="text" name="carnumber" id="carnumber" autocomplete="off" value={car.number} onChange={handleInputs} placeholder="Enter The Car Number" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="priceperday">Car Priceperday:&emsp;</label>
                    <input type="text" name="priceperday" id="priceperday" autocomplete="off" value={car.priceperday} onChange={handleInputs} placeholder="Enter The Price" />
                </div>
                <br></br>
                <input type="submit" name="carregister" id="carregister" autocomplete="off" value="Add Car" onClick={AddData} />
            </form>
        </>
    )
}

export default Registercar;