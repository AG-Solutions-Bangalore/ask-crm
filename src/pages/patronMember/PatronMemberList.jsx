import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { ContextPanel } from '../../utils/ContextPanel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { IoEyeOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import MUIDataTable from 'mui-datatables';

const PatronMemberList = () => {
    const [patronMemberData, setPatronMemberData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isPanelUp } = useContext(ContextPanel);
  
    const navigate = useNavigate();
  
    const fetchPMemberData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/fetch-web-patron-members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setPatronMemberData(response.data?.patron_member);
      } catch (error) {
        console.error("Error fetching Life Time data", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
        fetchPMemberData();
    }, []);

    const handleView = (e,id)=>{
      e.preventDefault()
      localStorage.setItem("view",'/patron-member')
      navigate(`/member-view/${id}`)
      
    }
    
    const handleEdit = (e,id)=>{
      e.preventDefault()
      localStorage.setItem("edit",'/patron-member')
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
              title="view" className="h-5 w-5 cursor-pointer" />
              <CiEdit
                   onClick={(e) => handleEdit(e,id)}
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
        title='Patron Member List'
          data={patronMemberData ? patronMemberData : []}
          columns={columns}
          options={options}
        />
      </div>
   </Layout>
  )
}

export default PatronMemberList