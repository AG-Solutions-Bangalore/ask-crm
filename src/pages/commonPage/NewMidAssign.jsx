import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { Button, Card, CardContent, TextField } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BASE_URL from '../../base/BaseUrl'
import axios from 'axios'
import { Input } from '@material-tailwind/react'

const NewMidAssign = () => {
    const [newMID, setNewMID] = useState({
        user_mid: "",
        mtype: "",
        amount_num: "",
    });
    const [midData, setmidData] = useState([]);
    const {id} = useParams()
    const [midnewData, setmidNewData] = useState([]);
    const [midnewDatatype, setmidNewDataType] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
      
            axios({
                url: BASE_URL+"/api/fetch-web-member-data/"+id,
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }).then((res) => {
                
                setmidData(res.data.member_data);
                setmidNewDataType(res.data.member_data.member_type);
                setmidNewData(res.data.new_mid);
                console.log("debug",res.data.member_data.member_type);
              });
        
    }, []);

    

    const onSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById("addIndiv");
        if(!form.checkValidity()){
          toast.error("Fill all required")
          return
        }

        const  data = {
            user_mid: newMID.user_mid,
            mtype: midnewDatatype,
            amount_num: newMID.amount_num,
        }

       
        
        axios({
            url: BASE_URL+"/api/update-web-mid/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                
                alert("asssign mid")
                navigate("/home")
                
            }else{
                alert("error")
            }
        });
        
    };

    const onInputChange = (e) => {
        
        setNewMID({
            ...newMID,
            [e.target.name]: e.target.value,
        });
        
    }
  return (
    <Layout>
 
<div className='mt-5' >
<Card className="bg-gray-100 shadow-md rounded-lg p-4">
  <CardContent className="flex flex-col gap-4">
    <form id="addIndiv" autoComplete="off" className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">

       <div className='flex justify-between items-center '>
       <div className="flex gap-2">
          <span className="text-lg font-bold">Full Name:</span> 
          <span className="font-normal text-black">{midData.name}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-lg font-bold">Amount:</span> 
          <span className="font-normal text-black">{midData.priceaga}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-lg font-bold">Mobile No:</span> 
          <span className="font-normal text-black">{midData.user_mobile_number}</span>
        </div>
       </div>
       <div className='flex justify-between items-center' >
       <div className="flex gap-2">
          <span className="text-lg font-bold">Email Id:</span> 
          <span className="font-normal text-black">{midData.email}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-lg font-bold">Member Type:</span> 
          <span className="font-normal text-black">{midData.member_type}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-lg font-bold">New MID:</span> 
          <span className="font-normal text-black">{parseInt(midnewData.numid+1)}</span>
        </div>
       </div>
      </div>
      <div className="flex  gap-4">
        <div className="w-1/3">
          <Input
            name="user_mid"
            required
            onChange={(e) => onInputChange(e)}
            inputProps={{ maxLength: 4 }}
            value={newMID.user_mid}
            label='MID'
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="w-2/3">
          <Input
            name="amount_num"
            required
            onChange={(e) => onInputChange(e)}
            value={newMID.amount_num}
            InputLabelProps={{
              shrink: true,
            }}
            label='Transaction Details'
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex justify-between w-24 gap-4 mt-4">
        <Button
          fullWidth
          size="small"
          type="submit"
          variant="contained"
          onClick={(e) => onSubmit(e)}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold  rounded"
        >
          Update
        </Button>
        <Link to="/home">
          <Button
            fullWidth
            size="small"
            type="button"
            variant="contained"
            className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded"
          >
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  </CardContent>
</Card>
</div>

    </Layout>
  )
}

export default NewMidAssign