import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import { toast } from "react-hot-toast";
import moment from "moment";

function MechanicsList() {
  const [mechanics, setMechanics] = useState([]);
  const dispatch = useDispatch();
  const getMechanicsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/admin/get-all-mechanics",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setMechanics(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeMechanicStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-mechanic-account-status",
        { mechanicId: record._id, userId: record.userId, status: status },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getMechanicsData();
      }
    } catch (error) {
      toast.error("Error changing mechanic account status");
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getMechanicsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },

    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeMechanicStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeMechanicStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Mechanics List</h1>
      <hr />
      <Table columns={columns} dataSource={mechanics} />
    </Layout>
  );
}

export default MechanicsList;
