import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import car_default_pic from "../car_pic_default/defaultpic.png";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./Bookcar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const Bookcar = () => {
//   const [carData, setcarData] = useState([]);
//   const [imagePath, setPath] = useState("");
//   const callavailcar = async () => {
//     try {
//       const res = await fetch("/availcar", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       const data = await res.json();
//       console.log(data);
//       setcarData(data);
//       setPath("http://localhost:7000/public/carImages/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     callavailcar();
//   }, []);
//   return (
//     <>
//       <div className="Container">
//         <div className="row">
//           {carData.map((curElm) => {
//             return (
//               <>
//                 <Col>
//                   <div key={curElm._id}>
//                     <Card style={{ width: "23rem" }} className="card">
//                       <Card.Header>
//                         <Card.Title>
//                           {curElm.companyname} {curElm.carmodel}
//                         </Card.Title>
//                       </Card.Header>
//                       <Card.Img
//                         variant="top"
//                         style={{
//                           width: "100",
//                           height: "15vw",
//                           objectfit: "cover",
//                         }}
//                         src={
//                           curElm.carpic
//                             ? imagePath + curElm.carpic
//                             : car_default_pic
//                         }
//                       />

//                       <ListGroup className="list-group-flush">
//                         <ListGroupItem action variant="info">
//                           Class:&emsp;{curElm.carclass}
//                         </ListGroupItem>
//                         <ListGroupItem action variant="success">
//                           Transmission Type:&emsp;{curElm.transmissiontype}
//                         </ListGroupItem>
//                         <ListGroupItem action variant="info">
//                           FuelType:&emsp;{curElm.fueltype}
//                         </ListGroupItem>
//                         <ListGroupItem action variant="success">
//                           Registration Number:&emsp;{curElm.carnumber}
//                         </ListGroupItem>
//                         <ListGroupItem action variant="info">
//                           Price Per Day:&emsp;{curElm.priceperday}
//                         </ListGroupItem>
//                         <ListGroupItem action variant="success">
//                           seatings:&emsp;{curElm.seatingcapacity}
//                         </ListGroupItem>
//                       </ListGroup>
//                       <Card.Body style={{ justify: "center" }}>
//                         <Link to={`/confirmbooking/${curElm._id}`}>
//                           <Button variant="primary">Book</Button>
//                         </Link>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 </Col>

//                 <br></br>
//                 <br></br>
//               </>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Bookcar;

const Bookcar = () => {
  // const [carData, setcarData] = useState([]);
  // const [imagePath, setPath] = useState("");
  // const [search, setSearch] = useState("");
  // const [query, setQuery] = useState({
  //   minamount: null,
  //   maxamount: null,
  // });
  // const [searchData, setSearchData] = useState([]);
  // const [searchNotFound, setsearchNotFound] = useState(false);
  // const callavailcar = async () => {
  //   try {
  //     const res = await fetch("/availcar", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     // console.log(data);
  //     setcarData(data);
  //     setPath("http://localhost:7000/public/carImages/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   callavailcar();
  // }, []);

  // let name, value;
  // const search_input = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;
  //   setQuery({ ...query, [name]: value });
  // };

  // const SearchData = async (event) => {
  //   event.preventDefault();
  //   const { minamount, maxamount } = query;
  //   if (parseInt(minamount) > parseInt(maxamount)) {
  //     window.alert("invalid fields");
  //   } else if (isNaN(query.minamount)) {
  //     window.alert("data should be a number");
  //   } else {
  //     console.log(minamount + maxamount);
  //     const res = await fetch("/filter", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         minamount,
  //         maxamount,
  //       }),
  //     });
  //     const data = await res.json();
  //     setSearch("helloworld");
  //     if (data.length >= 0) {
  //       setSearchData(data);
  //     } else {
  //       setsearchNotFound(true);
  //     }
  //     console.log(data);
  //   }
  // };

  // const ClearData = () => {
  //   setQuery({ maxamount: "", minamount: "" });
  //   setSearch("");
  // };

  const [carData, setcarData] = useState([]);
  const [imagePath, setPath] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({
    minamount: null,
    maxamount: null,
  });
  const [selectedstartDate, setStartDate] = useState(null);
  const [selectedendDate, setEndDate] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [searchNotFound, setsearchNotFound] = useState(false);
  const callavailcar = async () => {
    try {
      const res = await fetch("/availcar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      setcarData(data);
      setPath("http://localhost:7000/public/carImages/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callavailcar();
  }, []);

  let name, value;
  const search_input = (e) => {
    name = e.target.name;
    value = e.target.value;
    setQuery({ ...query, [name]: value });
  };
  const handlestartdate = (date) => {
    setStartDate(date);
    setEndDate(null);
  };

  const handleenddate = (date) => {
    setEndDate(date);
    if (selectedstartDate === null) {
      setEndDate(null);
    }
  };
  const SearchData = async (event) => {
    event.preventDefault();
    const { minamount, maxamount } = query;
    console.log(selectedstartDate);
    console.log(selectedendDate);
    const startDate = selectedstartDate;
    const endDate = selectedendDate;

    if (parseInt(minamount) > parseInt(maxamount)) {
      window.alert("invalid fields");
    } else if (isNaN(query.minamount)) {
      window.alert("data should be a number");
    } else if (startDate != null && endDate === null) {
      window.alert("endDate should not be empty");
    } else {
      try {
        const res = await fetch("/filter", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            minamount,
            maxamount,
            startDate,
            endDate,
          }),
        });
        const data = await res.json();
        setSearch("helloworld");
        if (data.length >= 0) {
          setSearchData(data);
        } else {
          setsearchNotFound(true);
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const ClearData = () => {
    setQuery({ maxamount: "", minamount: "" });
    setSearch("");
    setStartDate(null);
    setEndDate(null);
  };

  const Displaysearch = () => {
    if (searchData.length === 0) {
      return (
        <>
          <h1>Car Not Found</h1>
        </>
      );
    } else {
      return (
        <>
          <div className="Container">
            <div className="row">
              {searchData.map((curElm) => {
                return (
                  <>
                    <Col>
                      <div key={curElm._id}>
                        <Card style={{ width: "23rem" }} className="card2">
                          <Card.Header>
                            <Card.Title>
                              {curElm.companyname} {curElm.carmodel}
                            </Card.Title>
                          </Card.Header>
                          <Card.Img
                            variant="top"
                            style={{
                              width: "100",
                              height: "15vw",
                              objectfit: "cover",
                            }}
                            src={
                              curElm.carpic
                                ? imagePath + curElm.carpic
                                : car_default_pic
                            }
                          />

                          <ListGroup className="list-group-flush">
                            <ListGroupItem action variant="info">
                              Class:&emsp;{curElm.carclass}
                            </ListGroupItem>
                            <ListGroupItem action variant="success">
                              Transmission Type:&emsp;{curElm.transmissiontype}
                            </ListGroupItem>
                            <ListGroupItem action variant="info">
                              FuelType:&emsp;{curElm.fueltype}
                            </ListGroupItem>
                            <ListGroupItem action variant="success">
                              Registration Number:&emsp;{curElm.carnumber}
                            </ListGroupItem>
                            <ListGroupItem action variant="info">
                              Price Per Day:&emsp;{curElm.priceperday}
                            </ListGroupItem>
                            <ListGroupItem action variant="success">
                              seatings:&emsp;{curElm.seatingcapacity}
                            </ListGroupItem>
                          </ListGroup>
                          <Card.Body style={{ justify: "center" }}>
                            <Link to={`/confirmbooking/${curElm._id}`}>
                              <Button variant="primary">Book</Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>

                    <br></br>
                    <br></br>
                  </>
                );
              })}
            </div>
          </div>
        </>
      );
    }
  };

  const DisplayRegular = () => {
    return (
      <>
        <div className="Container">
          <div className="row">
            {carData.map((curElm) => {
              return (
                <>
                  <Col>
                    <div key={curElm._id}>
                      <Card style={{ width: "23rem" }} className="card2">
                        <Card.Header>
                          <Card.Title>
                            {curElm.companyname} {curElm.carmodel}
                          </Card.Title>
                        </Card.Header>
                        <Card.Img
                          variant="top"
                          style={{
                            width: "100",
                            height: "15vw",
                            objectfit: "cover",
                          }}
                          src={
                            curElm.carpic
                              ? imagePath + curElm.carpic
                              : car_default_pic
                          }
                        />

                        <ListGroup className="list-group-flush">
                          <ListGroupItem action variant="info">
                            Class:&emsp;{curElm.carclass}
                          </ListGroupItem>
                          <ListGroupItem action variant="success">
                            Transmission Type:&emsp;{curElm.transmissiontype}
                          </ListGroupItem>
                          <ListGroupItem action variant="info">
                            FuelType:&emsp;{curElm.fueltype}
                          </ListGroupItem>
                          <ListGroupItem action variant="success">
                            Registration Number:&emsp;{curElm.carnumber}
                          </ListGroupItem>
                          <ListGroupItem action variant="info">
                            Price Per Day:&emsp;{curElm.priceperday}
                          </ListGroupItem>
                          <ListGroupItem action variant="success">
                            seatings:&emsp;{curElm.seatingcapacity}
                          </ListGroupItem>
                        </ListGroup>
                        <Card.Body style={{ justify: "center" }}>
                          <Link to={`/confirmbooking/${curElm._id}`}>
                            <Button variant="primary">Book</Button>
                          </Link>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>

                  <br></br>
                  <br></br>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="datepick">
        <form method="POST">
          <div style={{ width: "300px", float: "left" }}>
            <label>Search Date:&emsp;&emsp;&emsp;</label>
            <DatePicker
              selected={selectedstartDate}
              onChange={handlestartdate}
              dateFormat="dd-MM-yyyy"
              minDate={new Date()}
            />
            <br></br>
            &emsp;&emsp;&emsp;
            <label>To : &emsp;&emsp;&emsp;</label>
            <DatePicker
              selected={selectedendDate}
              onChange={handleenddate}
              dateFormat="dd-MM-yyyy"
              minDate={selectedstartDate}
            />
          </div>
          <div style={{ width: "300px", float: "right" }}>
            <label>Minamount&emsp;&emsp;&emsp;</label>
            <input
              type="text"
              name="minamount"
              onChange={search_input}
              value={query.minamount}
            />
            &emsp;&emsp;&emsp;
            <label>Maxamount&emsp;&emsp;&emsp;</label>
            <input
              type="text"
              name="maxamount"
              onChange={search_input}
              value={query.maxamount}
            />
          </div>
          &emsp;&emsp;
          <br></br>
          <div style={{ width: "450px", float: "right" }}>
            <Button variant="outline-secondary" onClick={SearchData}>
              Search
            </Button>
            &emsp;&emsp;
            <br></br>
            <br></br>
            <Button variant="outline-secondary" onClick={ClearData}>
              Clear
            </Button>
          </div>
        </form>
      </div>
      <br></br>

      {search ? <Displaysearch /> : <DisplayRegular />}
    </>
  );

  // return (
  //     <>
  //         <div>

  //         </div>

  //         <h1>Book CAR Here</h1>
  //         {
  //             carData.map((curElm) => {
  //                 return (
  //                     <>
  //                         <div key={curElm._id}>
  //                             <img src={curElm.carpic ? imagePath + curElm.carpic : car_default_pic} width="200px" />
  //                             <p>Car Company:&emsp;{curElm.companyname}</p>
  //                             <p>Car Class:&emsp;{curElm.carclass}</p>
  //                             <p>Car Model:&emsp;{curElm.carmodel}</p>
  //                             <p>Car Transmission:&emsp;{curElm.transmissiontype}</p>
  //                             <p>Car Number:&emsp;{curElm.carnumber}</p>
  //                             <p>Car FuelType:&emsp;{curElm.fueltype}</p>
  //                             <p>Car Price Per Day:&emsp;{curElm.priceperday}</p>
  //                             <p>Car seatings:&emsp;{curElm.seatingcapacity}</p>
  //                             <Link to={`/confirmbooking/${curElm._id}`}><button>Book Car</button></Link>
  //                         </div>
  //                         <br></br><br></br>
  //                     </>
  //                 )
  //             })
  //         }
  //     </>
  // )
};

export default Bookcar;
