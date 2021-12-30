import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Userprofile = () => {

    const history = useHistory();
    const [userData, setUserData] = useState({});
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

    return (
        <>
            <form method="POST">
                <div>
                    <p>Name: {userData.name}</p>
                </div>
                <br></br>
                <div>
                    <p>Email: {userData.email}</p>
                </div>
                <br></br>
                <div>
                    <p>Address: {userData.address}</p>
                </div>
                <br></br>
                <div>
                    <p>Phone: {userData.phone}</p>
                </div>
                <br></br>
                <div>
                    <p>City: {userData.city}</p>
                </div>
                <br></br>
                <div>
                    <p>State: {userData.state}</p>
                </div>
                <br></br>
                <div>
                    <p>Date of Birth: {userData.dob}</p>
                </div>
                <br></br>
            </form>
        </>
    )
}

export default Userprofile;