import React from "react";
import { useNavigate } from "react-router-dom";

function Mechanic({ mechanic }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${mechanic._id}`)}
    >
      <h1 className="card-title">
        {mechanic.firstName} {mechanic.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number: </b>
        {mechanic.phoneNumber}
      </p>
      <p>
        <b>Address: </b>
        {mechanic.address}
      </p>
      <p>
        <b>Timings: </b>
        {mechanic.timings[0]}-{mechanic.timings[1]}
      </p>
    </div>
  );
}

export default Mechanic;
