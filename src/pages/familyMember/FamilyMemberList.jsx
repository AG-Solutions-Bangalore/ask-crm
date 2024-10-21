import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { ContextPanel } from '../../utils/ContextPanel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { CiEdit } from 'react-icons/ci';
import MUIDataTable from 'mui-datatables';

const FamilyMemberList = () => {

  const [famliyData, setFamilyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const {id} = useParams()

  const navigate = useNavigate();

  const fetchFamilyData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-web-family-member`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFamilyData(response.data?.familydata);
    } catch (error) {
      console.error("Error fetching Family data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyData();
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
      name: "family_member_name",
      label: "Full Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "family_member_gender",
      label: "Gender",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "family_member_dob",
      label: "Dob",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "family_member_relation",
      label: "Relation",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "family_member_qualification",
      label: "Qualification",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "family_member_occupation",
      label: "Occupation",
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
                   onClick={()=>navigate(`/family-edit/${id}`)}
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
    customToolbar: () => {
      return (
        <Link
        to="/add-family-member"
        className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md"
      >
        + F-Member
      </Link>
       
      );
    },
    
  };
   
  return (
    <Layout>
      <div className="mt-5">
        <MUIDataTable
        title='Family Member'
          data={famliyData ? famliyData : []}
          columns={columns}
          options={options}
        />
      </div>
    </Layout>
  )
}

export default FamilyMemberList