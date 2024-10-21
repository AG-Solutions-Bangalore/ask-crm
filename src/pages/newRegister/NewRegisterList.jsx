import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { ContextPanel } from '../../utils/ContextPanel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { IoEyeOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import MUIDataTable from 'mui-datatables';

const NewRegisterList = () => {
    const [newRegisterData, setNewRegisterData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isPanelUp } = useContext(ContextPanel);
  
    const navigate = useNavigate();
  
    const fetchNewRegisterData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-web-new-register`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setNewRegisterData(response.data?.new_register);
      } catch (error) {
        console.error("Error fetching Pending Mid data", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
        fetchNewRegisterData();
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
        name: "priceaga",
        label: "Amount",
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
        name: "reg_date",
        label: "Reg Date",
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
          <CiEdit
                   onClick={()=>navigate(`/new-mid-assign/${id}`)}
              title="mid" className="h-5 w-5 cursor-pointer" />
              <IoEyeOutline
              onClick={()=>navigate(`/member-view/${id}`)}
              title="view" className="h-5 w-5 cursor-pointer" />
              <CiEdit
                   onClick={()=>navigate(`/member-edit/${id}`)}
              title="Edit" className="h-5 w-5 cursor-pointer" />
              
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
        title='New Register List'
          data={newRegisterData ? newRegisterData : []}
          columns={columns}
          options={options}
        />
      </div>
    
    </Layout>
  )
}

export default NewRegisterList