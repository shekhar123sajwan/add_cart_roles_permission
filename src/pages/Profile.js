import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="card" style={{ width: "400px" }}>
      <img
        className="card-img-top"
        src={user?.image}
        alt="Card image"
        style={{ width: "100%" }}
      />
      <div className="card-body">
        <h4 className="card-title">
          {user?.firstName} {user?.lastName}
        </h4>
        <p className="card-text">
          {user?.email}
          <br />
          {user?.phone}
          <br />
          {user?.address.address} {user?.address.city}
        </p>
        <b className="text-primary">ROLE: {user?.role}</b>
      </div>
    </div>
  );
};

export default Profile;
