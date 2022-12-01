// import { Button, Col, Row, Form, Input, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import MechanicForm from "../../components/MechanicForm";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [mechanic, setMechanic] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/mechanic/update-mechanic-profile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };

  const getMechanicData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/mechanic/get-mechanic-info-by-user-id",
        {
          userId: params.userId,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setMechanic(response.data.data);
        // dispatch(reloadUserData(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getMechanicData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Mechanic Profile</h1>
      <hr />
      {mechanic && (
        <MechanicForm onFinish={onFinish} initialValues={mechanic} />
      )}
    </Layout>
  );
}

export default Profile;
