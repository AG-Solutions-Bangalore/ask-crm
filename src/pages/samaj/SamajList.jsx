import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import BASE_URL from '../../base/BaseUrl';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { ContextPanel } from '../../utils/ContextPanel';
import Moment from "moment";

const SamajList = () => {
    const [samajData, setSamajData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSamajData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/fetch-web-events/samaj`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSamajData(response.data?.eventsdata);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSamajData();
    setLoading(false);
  }, []);

  const columns = [
    {
      name: "slNo",
      label: "SL No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "event_image",
      label: "Image",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (image) => {
          const imageUrl = image
            ? `${BASE_URL}/app_images/event/${image}`
            : "https://agrawalsamaj.co/public/app_images/event/no_image.jpg";
          return (
            <img
              src={imageUrl}
              alt="Service"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          );
        },
      },
    },

    {
      name: "event_name",
      label: "Event Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "event_des",
      label: "Description",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "event_date",
      label: "Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
            return Moment(value).format("DD-MM-YYYY");
          },
      },
    },
    {
      name: "event_time",
      label: "Time",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "event_address",
      label: "Address  ",
      options: {
        filter: true,
        sort: false,
      },
    },
    
  ];
  const options = {
    selectableRows: "none",
    elevation: 0,
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
   
  };
  return (
    <Layout>
        <div className="mt-5">
        <MUIDataTable
        title="Samaj List"
          data={samajData ? samajData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  )
}

export default SamajList