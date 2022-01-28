import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const Editprofile = () => {

    const history = useHistory();
    const [userData, setUserData] = useState({});
    const [newpassword, setPassword] = useState('');

    let name, value;
    const details_input = (event) => {
        name = event.target.name;
        value = event.target.value;
        setUserData({ ...userData, [name]: value });
    }
    const Editdetails = async () => {
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
            // console.log("User data");
            // console.log(data);
            setUserData(data);
            if (!data) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push("/login");
        }

    }

    useEffect(() => {
        Editdetails();
    }, []);

    const AcquireData = async (event) => {
        event.preventDefault();
        setUserData(userData.password = newpassword);

        const { _id, name, email, address, password, phone, city, state, dob } = userData;
        console.log(userData);
        const res = await fetch("/updateprofile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id, name, email, address, password, phone, city, state, dob
            })
        })
        const data = await res.json();
        if (!data.status === 202 || !data) {
            window.alert("User Updation Unsuccessful");
        } else {
            window.alert("User Updation Success");
            history.push("/userprofile");
        }

    }

    return (
        <>
            <form method="POST">
                <div>
                    <label>Name</label>
                    <input type="text" name="name" onChange={details_input} value={userData.name} />
                </div>
                <br></br>
                <div>
                    <label>Email</label>
                    <input type="text" name="name" onChange={details_input} value={userData.email} />
                </div>
                <br></br>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" autocomplete="off" value={newpassword} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br></br>
                <div>
                    <label>Address</label>
                    <input type="text" name="address" onChange={details_input} value={userData.address} />
                </div>
                <br></br>
                <div>
                    <label>Phone</label>
                    <input type="text" name="phone" onChange={details_input} value={userData.phone} />
                </div>
                <br></br>
                <div>
                    <label>City</label>
                    <input type="text" name="city" onChange={details_input} value={userData.city} />
                </div>
                <br></br>
                <div>
                    <label>State</label>
                    <input type="text" name="state" onChange={details_input} value={userData.state} />
                </div>
                <br></br>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" name="dob" onChange={details_input} value={userData
                        .dob} />
                </div>
                <div>
                    <input type="submit" onClick={AcquireData}></input>
                </div>

            </form>
        </>
    )
}

export default Editprofile;