import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";

import { IoEyeOutline } from "react-icons/io5";
import { CiEdit, CiPower } from "react-icons/ci";
import MUIDataTable from "mui-datatables";
import { BsPrinter } from "react-icons/bs";

const LifeTimeMemberList = () => {
  const [lifeTimeData, setLifeTimeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const useTypeId = localStorage.getItem("user_type_id");

  const navigate = useNavigate();

  const fetchLifeTimeData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/fetch-web-life-time-members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLifeTimeData(response.data?.life_member);
    } catch (error) {
      console.error("Error fetching Life Time data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLifeTimeData();
  }, []);

 const handleView = (e,id)=>{
  e.preventDefault()
  localStorage.setItem("view",'/life-time-member')
  navigate(`/member-view/${id}`)
  
}

const handleEdit = (e,id)=>{
  e.preventDefault()
  localStorage.setItem("edit",'/life-time-member')
  navigate(`/member-edit/${id}`)
}

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
      name: "user_mid",
      label: "MID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Full Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "user_mobile_number",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "f_mintroby",
      label: "Intro By",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => {
          return (
            <>
              <div className="flex items-center space-x-2">
                <IoEyeOutline
                onClick={(e) => handleView(e,id)}
                  // onClick={() => navigate(`/member-view/${id}`)}
                  title="view"
                  className="h-5 w-5 cursor-pointer"
                />
                <CiEdit
                onClick={(e) => handleEdit(e,id)}
                  // onClick={() => navigate(`/member-edit/${id}`)}
                  title="Edit"
                  className="h-5 w-5 cursor-pointer"
                />
                {useTypeId == "3" ? (
                      <a href={`/member-print/${id}`} rel="noopener noreferrer">
                  <BsPrinter
                
                    title="Print"
                    className="h-5 w-5 cursor-pointer"
                  />
                  </a>
                ) : (
                  " "
                )}
              </div>
            </>
          );
        },
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
          title="Life Time Member List"
          data={lifeTimeData ? lifeTimeData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  );
};

export default LifeTimeMemberList;
