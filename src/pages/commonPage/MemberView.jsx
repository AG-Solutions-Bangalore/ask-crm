import React, { useContext, useEffect, useState } from "react";
import { 
  FiUser, 
  FiUsers, 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiInfo,
  FiHeart,
  FiCalendar,
  FiBriefcase,
  FiBook
} from 'react-icons/fi';
import moment from 'moment';
import Layout from "../../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContextPanel } from "../../utils/ContextPanel";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { IoReturnDownBack } from "react-icons/io5";

const MemberView = () => {
  const [profile, setProfile] = useState({});
  const [profileSub, setProfileSub] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const {id} = useParams()
  const navigate = useNavigate();

  const fetchLifeTimeData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-web-family-member-view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data?.userdata );
      setProfileSub(response.data.familydata);
    } catch (error) {
      console.error("Error fetching Life Time data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLifeTimeData();
  }, []);

   
const IconLabel = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col space-y-1">
    <div className="flex items-center space-x-2 text-gray-600">
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-gray-800 border-b border-gray-200 pb-1">
      {value}
    </span>
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg mb-4 border-l-4 border-red-400">
    <Icon className="w-5 h-5 text-blue-500" />
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
  </div>
);

     
    const  defaultValue = <span className="text-red-400 ">-</span>
  const displayValue = (value) => {
    return value ? value : defaultValue;
  };

  const handleBack = ()=>{
    const view = localStorage.getItem("view")
    navigate(`${view}`)
    localStorage.removeItem("view")
  }

  return (
    <Layout>
        {/* max-w-[210mm] */}
        <div className="mt-5 p-6 bg-white rounded-xl shadow-sm">
  
      <div className="flex justify-between items-start mb-2 pb-6 border-b border-gray-200">
        <div className="flex-1">
          <h1 className="text-3xl flex gap-2 font-bold text-gray-800 mb-4">
          
                <IoReturnDownBack onClick={(e)=>handleBack(e)} className="w-8 h-8 border border-red-500 hover:border-blue-500 bg-blue-100 hover:bg-red-100 border-dashed p-1 rounded-lg text-blue-500 hover:text-red-700" />
              
           <span>Member Information</span>
          </h1>
          <p className="text-gray-600">
            MID: <span className="font-semibold">{displayValue(profile.user_mid)}</span>
          </p>
        </div>
        <img
        src={ `${BASE_URL}/app_images/members/ `+profile.agrawal_image}
          // src="https://agrawalsamaj.co/public/app_images/documents/ABHI_proof_3391.jpg"
          alt="Member Photo"
          className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
        />
      </div>

      {/* Personal Information */}
      <div className="mb-5">
        <SectionHeader icon={FiUser} title="Personal Information" />
        <div className="grid grid-cols-1 p-4 md:grid-cols-4 gap-6">
          <IconLabel 
            icon={FiUser}
            label="Full Name"
            value={displayValue(profile.name)}
          />
          <IconLabel 
            icon={FiInfo}
            label="Gender"
            value={displayValue(profile.user_gender)}
          />
          <IconLabel 
            icon={FiInfo}
            label="Gotra"
            value={displayValue(profile.gotra)}
          />
          <IconLabel 
            icon={FiInfo}
            label="State"
            value= {displayValue(profile.state)}
          />
          <IconLabel 
            icon={FiPhone}
            label="Mobile No"
            value={displayValue(profile.user_mobile_number)}
          />
          <IconLabel 
            icon={FiMail}
            label="Email"
            value={displayValue(profile.email)}
          />
          <IconLabel 
            icon={FiCalendar}
            label="Date of Birth"
            value={moment(displayValue(profile.user_dob)).format("DD-MM-YYYY")}
          />
          <IconLabel 
            icon={FiHeart}
            label="Blood Group"
            value={displayValue(profile.user_blood)}
          />
          <IconLabel 
            icon={FiBook}
            label="Qualification"
            value={displayValue(profile.user_qualification)}
          />
          <IconLabel 
            icon={FiBook}
            label="Proof Identification"
            value= {displayValue(profile.user_proof_identification)}
          />
        </div>
      </div>

      {/* Family Information */}
      <div className="mb-5">
        <SectionHeader icon={FiUsers} title="Family Information" />
        <div className="grid grid-cols-1 p-4 md:grid-cols-3 gap-6 mb-6">
         
          <IconLabel 
            icon={FiInfo}
            label="Pan Card No"
            value={displayValue(profile.user_pan_no)}
          />
          <IconLabel 
            icon={FiHeart}
            label="Marital Status"
            value={displayValue(profile.married)}
          />
         <IconLabel 
            icon={FiHeart}
            label="Father Name"
            value={displayValue(profile.father_name)}
          />
          <IconLabel 
            icon={FiHeart}
            label="Father DOB"
            value= {moment(displayValue(profile.father_dob)).format("DD-MM-YYYY")}
          />
          <IconLabel 
            icon={FiHeart}
            label="Father Mobile No"
            value={displayValue(profile.father_mobile)}
          />
          <IconLabel 
            icon={FiHeart}
            label="Native Place"
            value={displayValue(profile.native_place)}
          />
        </div>

        {profile.married === "Yes" && (
          <div className="grid grid-cols-1  md:grid-cols-3  p-4  bg-green-50 rounded-lg mb-6">
            <IconLabel 
              icon={FiCalendar}
              label="Anniversary Date"
              value={moment(displayValue(profile.f_mannidate)).format("DD-MM-YYYY")}
            />
            <IconLabel 
              icon={FiUser}
              label="Spouse Name"
              value={displayValue(profile.spouse_name)}
            />
            <IconLabel 
              icon={FiPhone}
              label="Spouse Mobile"
              value={displayValue(profile.spouse_mobile)}
            />
            <IconLabel 
              icon={FiPhone}
              label="Spouse Date of Birth"
              value={moment(displayValue(profile.spouse_dob)).format("DD-MM-YYYY")}
            />
            <IconLabel 
              icon={FiPhone}
              label="Spouse Blood Group"
              value= {displayValue(profile.spouse_blood_group)}
            />
            <IconLabel 
              icon={FiPhone}
              label="Spouse Qualification"
              value={displayValue(profile.spouse_qualification)}
            />
          
          </div>
        )}
      </div>

      {/* Family Members */}
      {profile.no_of_family > "0" && (
        <div className="mb-5">
          <SectionHeader icon={FiUsers} title="Family Members" />
          <div className="space-y-4">
            {profileSub.map((member, index) => (
              <div 
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <IconLabel 
                  icon={FiUser}
                  label="Name"
                  value={displayValue(member.family_member_name)}
                />
                <IconLabel 
                  icon={FiUsers}
                  label="Relation"
                  value={displayValue(member.family_member_relation)}
                />
                <IconLabel 
                  icon={FiInfo}
                  label="Gender"
                  value={displayValue(member.family_member_gender)}
                />
                <IconLabel 
                  icon={FiInfo}
                  label="DOB"
                  value={moment(displayValue(member.family_member_dob)).format("DD-MM-YYYY")}
                />
                <IconLabel 
                  icon={FiInfo}
                  label="Qualification"
                  value={displayValue(member.family_member_qualification)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="mb-5">
        <SectionHeader icon={FiMapPin} title="Contact Information" />
        <div className="grid grid-cols-1 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-4">Residential Address</h4>
            <div className="grid grid-cols-1 p-4 md:grid-cols-4 gap-4">
              <IconLabel 
                icon={FiMapPin}
                label="Address"
                value={displayValue(profile.residential_add)}
              />
              <IconLabel 
                icon={FiMapPin}
                label="Landmark"
                value= {displayValue(profile.residential_landmark)}
              />
              <IconLabel 
                icon={FiMapPin}
                label="City"
                value={displayValue(profile.residential_city)}
              />
              <IconLabel 
                icon={FiMapPin}
                label="Pin Code"
                value={displayValue(profile.residential_pin)}
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-4">Office Address</h4>
            <div className="grid grid-cols-1p-4 md:grid-cols-4 gap-4">
              <IconLabel 
                icon={FiBriefcase}
                label="Office Address"
                value={displayValue(profile.office_add)}
              />
              <IconLabel 
                icon={FiBriefcase}
                label="Office Landmark"
                value={displayValue(profile.office_landmark)}
              />
              <IconLabel 
                icon={FiBriefcase}
                label="Office City"
                value={displayValue(profile.office_city)}
              />
              <IconLabel 
                icon={FiBriefcase}
                label="Office Pin Code"
                value= {displayValue(profile.office_pin)}
              />
              <IconLabel 
                icon={FiPhone}
                label="Office Phone"
                value={displayValue(profile.office_phone)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Information */}
      <div className="mb-5">
        <SectionHeader icon={FiInfo} title="Introduction Information" />
        <div className="grid grid-cols-1 p-4 md:grid-cols-2 gap-6">
          <IconLabel 
            icon={FiUser}
            label="Introduced By(Member Name)"
            value={displayValue(profile.f_mintroby)}
          />
          <IconLabel 
            icon={FiInfo}
            label="Membership No. of Introducer"
            value={displayValue(profile.f_mmemno)}
          />
          <IconLabel 
            icon={FiPhone}
            label="Phone No. of Introducer"
            value={displayValue(profile.f_mintrophone)}
          />
          <IconLabel 
            icon={FiMapPin}
            label="Address of Introducer"
            value={displayValue(profile.f_mintroadd)}
          />
          <IconLabel 
            icon={FiInfo}
            label="Member of Other Organizations"
            value=   {displayValue(profile.f_motherorga)}
          />
        </div>
        {profile.f_motherorga === "Yes" && (
          <div className="grid grid-cols-1 md:grid-cols-3 mt-2  p-4  bg-green-50 rounded-lg mb-6">
            <IconLabel 
              icon={FiCalendar}
              label="Organizations Name"
              value={displayValue(profile.org_name)}
            />
            <IconLabel 
              icon={FiUser}
              label="Organizations Type"
              value={displayValue(profile.org_type)}
            />
            <IconLabel 
              icon={FiCalendar}
              label="Organizations Product"
              value={displayValue(profile.org_product)}
            />
            
          
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default MemberView;
