import React, { Component } from "react";

const DeleteCar = () => {
  const { id } = useParams();
  const [carData, setCar] = useState({});
  const deletecar = async () => {
    try {
      const res = await fetch("/deletecar", {
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
      console.log(data);
      setCar(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    deletecar();
  }, []);
  return (
    <>
      <h1> {carData.body}</h1>
    </>
  );
};

export default DeleteCar;
