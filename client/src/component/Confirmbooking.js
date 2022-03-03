import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Confirmbooking.css";

const Confirmbooking = () => {
  const history = useHistory();
  const { id } = useParams();
  const [carData, setCar] = useState({});
  const [userData, setUserData] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [dates, setdates] = useState({});
  const [bookedcars, setBookedcars] = useState([]);
  var arr = [];
  const callcar = async () => {
    try {
      const res = await fetch("/carcall", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
        }),
      });
      const data = await res.json();
      // console.log(data);
      setCar(data);
      setImagePath("http://localhost:7000/public/carImages/");
    } catch (err) {
      console.log(err);
    }
  };
  const calluserprofile = async () => {
    try {
      const res = await fetch("/userprofile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  const callbookcar = async () => {
    try {
      const res = await fetch("/bookedcar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
        }),
      });
      const car = await res.json();
      setBookedcars(car);
      console.log(car);
      // var startdate = new Date(car[0].startdate);
      // var enddate = new Date(car[0].enddate);
      // var difference_in_time = enddate.getTime() - startdate.getTime();
      // var difference_in_days = difference_in_time / (1000 * 3600 * 24);
      // difference_in_days += 1;

      for (let i = 0; i < car.length; i++) {
        var sdate = new Date(car[i].startdate);
        var edate = new Date(car[i].enddate);
        var difference_in_time = edate.getTime() - sdate.getTime();
        var difference_in_days = difference_in_time / (1000 * 3600 * 24);
        difference_in_days += 1;
        for (let j = 0; j < difference_in_days; j++) {
          var t = new Date(sdate.setDate(sdate.getDate() - 1));
          arr.push(t);
          sdate.setDate(sdate.getDate() + 2);
        }
        console.log(arr);
      }
      // startdate.setDate(startdate.getDate() - 1);
      // enddate.setDate(enddate.getDate() - 1);
      // arr.push(startdate);
      // arr.push(enddate);
      //console.log(arr);
      setdates(arr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    calluserprofile();
  }, []);
  useEffect(() => {
    callcar();
  }, []);
  useEffect(() => {
    callbookcar();
  }, []);
  const [startdate, setstartDate] = useState(null);
  const [enddate, setendDate] = useState(null);
  const [totalamount, setTotalamount] = useState();
  const [displayamount, setDisplayamount] = useState();
  const [dateClash, setdateClash] = useState();
  const handlestartdate = (date) => {
    setstartDate(date);
    setendDate(null);
  };
  var display;
  const handleenddate = (date) => {
    setendDate(date);
    if (startdate === null) {
      setendDate(null);
    }
    var isCorrect = false;
    for (let i = 0; i < bookedcars.length; i++) {
      var t = new Date(bookedcars[i].startdate);
      if (t.getTime() > startdate.getTime()) {
        if (date.getTime() > t.getTime()) {
          isCorrect = true;
          console.log(isCorrect);
        }
      }
    }
    if (isCorrect) {
      var clash =
        "The Dates that You Just Selected, There's already a booking in Between.Please Select the Dates Which are not ambiguos";
      setdateClash(clash);
      setDisplayamount("");
    } else {
      var amount = parseInt(carData.priceperday);
      var difference_in_time = date.getTime() - startdate.getTime();
      var difference_in_days = difference_in_time / (1000 * 3600 * 24);
      amount = amount * difference_in_days;
      if (date == startdate) {
        amount = parseInt(carData.priceperday);
      } else {
        amount += parseInt(carData.priceperday);
      }
      display = "Your Total Amount is = " + amount;
      setTotalamount(amount);
      setDisplayamount(display);
      setdateClash("");
    }
  };

  const Confirm = async (e) => {
    e.preventDefault();
    const startDate = startdate;
    const endDate = enddate;

    const s = new Date(startDate);
    const ed = new Date(endDate);
    console.log(bookedcars);
    const carid = carData._id;
    const userid = userData._id;
    console.log(startDate);
    console.log(endDate);
    if (startdate === null || enddate === null) {
      window.alert("Please fill the dates of the Car Rental");
    }
    var isCorrect = false;
    for (let i = 0; i < bookedcars.length; i++) {
      var t = new Date(bookedcars[i].startdate);
      if (t.getTime() > s.getTime()) {
        if (ed.getTime() > t.getTime()) {
          isCorrect = true;
          console.log(isCorrect);
        }
      }
    }
    if (isCorrect) {
      window.alert("Invalid");
      var clash =
        "The Dates that You Just Selected, There's already a booking in Between. Please Select the Dates Which are not ambiguos";
      setdateClash(clash);
      setDisplayamount("");
    } else {
      const res = await fetch("/confirmbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carid,
          userid,
          totalamount,
          startDate,
          endDate,
        }),
      });
      const d = await res.json();
      setdateClash("");
      if (res.status === 422 || !d) {
        window.alert("Booking Unsuccessful");
      } else {
        window.alert("Booking Successful");
        history.push("/");
      }
    }
  };

  return (
    <>
      <div className="main1">
        <div className="Container">
          <div className="row">
            <Col>
              <Card style={{ width: "21rem" }} className="card1">
                <Card.Header>Your Info</Card.Header>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Name:&emsp;{userData.name}</ListGroupItem>
                  <ListGroupItem>Email:&emsp;{userData.email}</ListGroupItem>
                  <ListGroupItem>Phone:&emsp;{userData.phone}</ListGroupItem>
                  <ListGroupItem>City:&emsp;{userData.city}</ListGroupItem>
                  <ListGroupItem>State:&emsp;{userData.city}</ListGroupItem>
                  <ListGroupItem>
                    <br></br>
                  </ListGroupItem>
                  <ListGroupItem>
                    <br></br>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "21rem" }} className="card1">
                <Card.Header>Car's Info</Card.Header>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    Car :&emsp;{carData.companyname} {carData.carmodel}
                  </ListGroupItem>
                  <ListGroupItem>Class:&emsp;{carData.carclass}</ListGroupItem>
                  <ListGroupItem>
                    Transmission Type:&emsp;{carData.transmissiontype}
                  </ListGroupItem>
                  <ListGroupItem>
                    Registration Number:&emsp;{carData.carnumber}
                  </ListGroupItem>
                  <ListGroupItem>
                    FuelType:&emsp;{carData.fueltype}
                  </ListGroupItem>
                  <ListGroupItem>
                    seatings:&emsp;{carData.seatingcapacity}
                  </ListGroupItem>
                  <ListGroupItem>
                    Price Per Day:&emsp;{carData.priceperday}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </div>
        </div>

        {/* <p>Your name:&emsp;{userData.name}</p>
        <p>Your Email:&emsp;{userData.email}</p>
        <p>Your Address:&emsp;{userData.address}</p>
        <p>Your Phone:&emsp;{userData.phone}</p>
        <p>Car Class:&emsp;{carData.carclass}</p>
        <p>Car Model:&emsp;{carData.carmodel}</p>
        <p>Car Transmission Type:&emsp;{carData.transmissiontype}</p>
        <p>Car Number:&emsp;{carData.carnumber}</p>
        <p>Car FuelType:&emsp;{carData.fueltype}</p>
        <p>Car Price Per Day:&emsp;{carData.priceperday}</p>
        <p>Car seatings:&emsp;{carData.seatingcapacity}</p> */}

        {/* <p>
          Select Your Booking Date:
          <DatePicker
            selected={startdate}
            onChange={handlestartdate}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            excludeDates={dates}
          />
          To:
          <DatePicker
            selected={enddate}
            onChange={handleenddate}
            dateFormat="yyyy-MM-dd"
            minDate={startdate}
            excludeDates={dates}
          />
          <br></br>
          {dateClash}
        </p>
        <h5>{displayamount}</h5>
        <form method="POST">
          <input type="submit" name="save" value="PAY" onClick={Confirm} />
        </form>
*/}
        <Form
          method="POST"
          style={{
            color: "royalblue",

            margin: "0 auto",
            width: "540px",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Select Your Booking Date:</Form.Label>
            <DatePicker
              selected={startdate}
              onChange={handlestartdate}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
              excludeDates={dates}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> To:</Form.Label>
            <DatePicker
              selected={enddate}
              onChange={handleenddate}
              dateFormat="yyyy/MM/dd"
              minDate={startdate}
              excludeDates={dates}
            />
          </Form.Group>
          <p>{dateClash}</p>
          <h5>{displayamount}</h5>
          <Button
            variant="primary"
            type="submit"
            value="PAY"
            size="lg"
            style={{ justify: "center" }}
            onClick={Confirm}
          >
            PAY
          </Button>
        </Form>
        {/* <p>
          Select Your Booking Date:
          <DatePicker
            selected={startdate}
            onChange={handlestartdate}
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
          />
          To:
          <DatePicker
            selected={enddate}
            onChange={handleenddate}
            dateFormat="yyyy/MM/dd"
            minDate={startdate}
          />
        </p>
        <h5>{displayamount}</h5>

        <form method="POST">
          <input type="submit" name="save" value="PAY" onClick={Confirm} />
        </form> */}
      </div>
    </>
  );
};

export default Confirmbooking;

// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useParams, Link, useHistory } from "react-router-dom";
// import car_default_pic from "../car_pic_default/defaultpic.png";

// const Confirmbooking = () => {
//   const history = useHistory();
//   const { id } = useParams();
//   const [carData, setCar] = useState({});
//   const [userData, setUserData] = useState({});
//   const [imagePath, setImagePath] = useState("");
//   const [dates, setdates] = useState({});
//   const [bookedcars, setBookedcars] = useState([]);
//   var arr = [];
//   const callcar = async () => {
//     try {
//       const res = await fetch("/carcall", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           id,
//         }),
//       });
//       const data = await res.json();
//       // console.log(data);
//       setCar(data);
//       setImagePath("http://localhost:7000/public/carImages/");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const calluserprofile = async () => {
//     try {
//       const res = await fetch("/userprofile", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       const data = await res.json();
//       // console.log(data);
//       setUserData(data);
//       if (!res.status === 200) {
//         const error = new Error(res.error);
//         throw error;
//       }
//     } catch (err) {
//       console.log(err);
//       history.push("/login");
//     }
//   };

//   const callbookcar = async () => {
//     try {
//       const res = await fetch("/bookedcar", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           id,
//         }),
//       });
//       const car = await res.json();
//       setBookedcars(car);
//       console.log(car);
//       // var startdate = new Date(car[0].startdate);
//       // var enddate = new Date(car[0].enddate);
//       // var difference_in_time = enddate.getTime() - startdate.getTime();
//       // var difference_in_days = difference_in_time / (1000 * 3600 * 24);
//       // difference_in_days += 1;

//       for (let i = 0; i < car.length; i++) {
//         var sdate = new Date(car[i].startdate);
//         var edate = new Date(car[i].enddate);
//         var difference_in_time = edate.getTime() - sdate.getTime();
//         var difference_in_days = difference_in_time / (1000 * 3600 * 24);
//         difference_in_days += 1;
//         for (let j = 0; j < difference_in_days; j++) {
//           var t = new Date(sdate.setDate(sdate.getDate() - 1));
//           arr.push(t);
//           sdate.setDate(sdate.getDate() + 2);
//         }
//         console.log(arr);
//       }
//       // startdate.setDate(startdate.getDate() - 1);
//       // enddate.setDate(enddate.getDate() - 1);
//       // arr.push(startdate);
//       // arr.push(enddate);
//       //console.log(arr);
//       setdates(arr);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     calluserprofile();
//   }, []);
//   useEffect(() => {
//     callcar();
//   }, []);
//   useEffect(() => {
//     callbookcar();
//   }, []);
//   const [startdate, setstartDate] = useState(null);
//   const [enddate, setendDate] = useState(null);
//   const [totalamount, setTotalamount] = useState();
//   const [displayamount, setDisplayamount] = useState();
//   const [dateClash, setdateClash] = useState();
//   const handlestartdate = (date) => {
//     setstartDate(date);
//     setendDate(null);
//   };
//   var display;
//   const handleenddate = (date) => {
//     setendDate(date);
//     if (startdate === null) {
//       setendDate(null);
//     }
//     var isCorrect = false;
//     for (let i = 0; i < bookedcars.length; i++) {
//       var t = new Date(bookedcars[i].startdate);
//       if (t.getTime() > startdate.getTime()) {
//         if (date.getTime() > t.getTime()) {
//           isCorrect = true;
//           console.log(isCorrect);
//         }
//       }
//     }
//     if (isCorrect) {
//       var clash =
//         "The Dates that You Just Selected, There's already a booking in Between.Please Select the Dates Which are not ambiguos";
//       setdateClash(clash);
//       setDisplayamount("");
//     } else {
//       var amount = parseInt(carData.priceperday);
//       var difference_in_time = date.getTime() - startdate.getTime();
//       var difference_in_days = difference_in_time / (1000 * 3600 * 24);
//       amount = amount * difference_in_days;
//       if (date == startdate) {
//         amount = parseInt(carData.priceperday);
//       } else {
//         amount += parseInt(carData.priceperday);
//       }
//       display = "Your Total Amount is = " + amount;
//       setTotalamount(amount);
//       setDisplayamount(display);
//       setdateClash("");
//     }
//   };

//   const Confirm = async (e) => {
//     e.preventDefault();
//     const startDate = startdate;
//     const endDate = enddate;

//     const s = new Date(startDate);
//     const ed = new Date(endDate);
//     console.log(bookedcars);
//     const carid = carData._id;
//     const userid = userData._id;
//     console.log(startDate);
//     console.log(endDate);
//     if (startdate === null || enddate === null) {
//       window.alert("Please fill the dates of the Car Rental");
//     }
//     var isCorrect = false;
//     for (let i = 0; i < bookedcars.length; i++) {
//       var t = new Date(bookedcars[i].startdate);
//       if (t.getTime() > s.getTime()) {
//         if (ed.getTime() > t.getTime()) {
//           isCorrect = true;
//           console.log(isCorrect);
//         }
//       }
//     }
//     if (isCorrect) {
//       window.alert("Invalid");
//       var clash =
//         "The Dates that You Just Selected, There's already a booking in Between. Please Select the Dates Which are not ambiguos";
//       setdateClash(clash);
//       setDisplayamount("");
//     } else {
//       const res = await fetch("/confirmbook", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           carid,
//           userid,
//           totalamount,
//           startDate,
//           endDate,
//         }),
//       });
//       const d = await res.json();
//       setdateClash("");
//       if (res.status === 422 || !d) {
//         window.alert("Booking Unsuccessful");
//       } else {
//         window.alert("Booking Successful");
//       }
//     }
//   };

//   return (
//     <>
//       <div>
//         <img
//           src={carData.carpic ? imagePath + carData.carpic : car_default_pic}
//           width="200px"
//         />
//         <p>Your name:&emsp;{userData.name}</p>
//         <p>Your Email:&emsp;{userData.email}</p>
//         <p>Your Address:&emsp;{userData.address}</p>
//         <p>Your Phone:&emsp;{userData.phone}</p>
//         <p>Car Class:&emsp;{carData.carclass}</p>
//         <p>Car Model:&emsp;{carData.carmodel}</p>
//         <p>Carr Transmission:&emsp;{carData.transmissiontype}</p>
//         <p>Car Number:&emsp;{carData.carnumber}</p>
//         <p>Car FuelType:&emsp;{carData.fueltype}</p>
//         <p>Car Price Per Day:&emsp;{carData.priceperday}</p>
//         <p>Car seatings:&emsp;{carData.seatingcapacity}</p>
//         <p>
//           Select Your Booking Date:
//           <DatePicker
//             selected={startdate}
//             onChange={handlestartdate}
//             dateFormat="yyyy-MM-dd"
//             minDate={new Date()}
//             excludeDates={dates}
//           />
//           To:
//           <DatePicker
//             selected={enddate}
//             onChange={handleenddate}
//             dateFormat="yyyy-MM-dd"
//             minDate={startdate}
//           />
//           <br></br>
//           {dateClash}
//         </p>
//         <h5>{displayamount}</h5>
//         <form method="POST">
//           <input type="submit" name="save" value="PAY" onClick={Confirm} />
//         </form>
//       </div>
//     </>
//   );
// };

// export default Confirmbooking;
