import React, { useContext, useEffect, useState } from "react";
import { FaMobileAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import moment from "moment";

import Layout from "../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { ContextPanel } from "../../utils/ContextPanel";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

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

  const displayValue = (value, defaultValue = "N/A") => {
    return value ? value : defaultValue;
  };
  return (
    <Layout>
        {/* max-w-[210mm] */}
      <div className=" mx-auto mt-5 bg-white p-10 print:p-4">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-800">
           
          <div className="text-center flex-1 mx-4">
            <h1 className="text-2xl font-bold mb-2">Member Information Form</h1>
            <h2 className="text-xl">
              MID: <span className="font-medium">{displayValue(profile.user_mid)}</span>
            </h2>
          </div>
          <img
            
            src="https://agrawalsamaj.co/public/app_images/documents/ABHI_proof_3391.jpg"
            alt="Proof Doc"
            className="w-24 h-24 border border-gray-300"
          />
        </div>

        {/* Personal Information */}
        <div className="mb-6">
          <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-b-2 border-gray-800">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Full Name
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.name)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Gender
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.user_gender)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">Gotra</span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.gotra)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">State</span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.state)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Mobile No
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.user_mobile_number)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Email Id
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.email)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">DOB</span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {moment(displayValue(profile.user_dob)).format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Blood Group
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.user_blood)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Qualification
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.user_qualification)}
              </span>
            </div>
            <div className="flex flex-col col-span-3">
              <span className="text-sm font-semibold text-gray-600">
                Proof Identification
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.user_proof_identification)}
              </span>
            </div>
          </div>
        </div>

        {/* Family Information */}
        <div className="mb-6">
          <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-b-2 border-gray-800">
            Family Information
          </h3>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2   gap-4">
              <div className="flex flex-col ">
                <span className="text-sm font-semibold text-gray-600">
                  Pan Card No
                </span>
                <span className="border-b border-dotted border-gray-400 py-1">
                  {displayValue(profile.user_pan_no)}
                </span>
              </div>
              <div className="flex flex-col ">
                <span className="text-sm font-semibold text-gray-600">
                  Marital Status
                </span>
                <span className="border-b border-dotted border-gray-400 py-1">
                  {displayValue(profile.married)}
                </span>
              </div>
            </div>

            {profile.married === "Yes" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-600">
                    Anniversary Date
                  </span>
                  <span className="border-b border-dotted border-gray-400 py-1">
                    {moment(displayValue(profile.f_mannidate)).format("DD-MM-YYYY")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-600">
                    Spouse Name
                  </span>
                  <span className="border-b border-dotted border-gray-400 py-1">
                    {displayValue(profile.spouse_name)}
                  </span>
                </div>
                <div className="flex flex-col col">
                  <span className="text-sm font-semibold text-gray-600">
                    Spouse Mobile No
                  </span>
                  <span className="border-b border-dotted border-gray-400 py-1">
                    {displayValue(profile.spouse_mobile)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-600">
                    Spouse Date of Birth
                  </span>
                  <span className="border-b border-dotted border-gray-400 py-1">
                    {moment(displayValue(profile.spouse_dob)).format("DD-MM-YYYY")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-600">
                    Spouse Blood Group
                  </span>
                  <span className="border-b border-dotted border-gray-400 py-1">
                    {displayValue(profile.spouse_blood_group)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-600">
                    Spouse Qualification
                  </span>
                  <span className="border-b border-dotted border-gray-400 py-1">
                    {displayValue(profile.spouse_qualification)}
                  </span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4   gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600">
                  Father Name
                </span>
                <span className="border-b border-dotted border-gray-400 py-1">
                  {displayValue(profile.father_name)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600">
                  Father DOB
                </span>
                <span className="border-b border-dotted border-gray-400 py-1">
                  {moment(displayValue(profile.father_dob)).format("DD-MM-YYYY")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600">
                  Father Mobile No
                </span>
                <span className="border-b border-dotted border-gray-400 py-1">
                  {displayValue(profile.father_mobile)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600">
                  Native Place
                </span>
                <span className="border-b border-dotted border-gray-400 py-1">
                  {displayValue(profile.native_place)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Family Members Section */}
        {profile.no_of_family > "0" && (
          <div className="mb-6">
            <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-b-2 border-gray-800">
              Family Member Information
            </h3>
            <div className="grid grid-cols-6 gap-4">
              {profileSub.map((option, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col col-span-6 md:col-span-1">
                    <span className="text-sm font-semibold text-gray-600">
                      Member Name
                    </span>
                    <span className="border-b border-dotted border-gray-400 py-1">
                      {displayValue(option.family_member_name)}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-1">
                    <span className="text-sm font-semibold text-gray-600">
                      Relation
                    </span>
                    <span className="border-b border-dotted border-gray-400 py-1">
                      {displayValue(option.family_member_relation)}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-1">
                    <span className="text-sm font-semibold text-gray-600">
                      Gender
                    </span>
                    <span className="border-b border-dotted border-gray-400 py-1">
                      {displayValue(option.family_member_gender)}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-1">
                    <span className="text-sm font-semibold text-gray-600">
                      DOB
                    </span>
                    <span className="border-b border-dotted border-gray-400 py-1">
                      {moment(displayValue(option.family_member_dob)).format("DD-MM-YYYY")}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-1">
                    <span className="text-sm font-semibold text-gray-600">
                      Qualification
                    </span>
                    <span className="border-b border-dotted border-gray-400 py-1">
                      {displayValue(option.family_member_qualification)}
                    </span>
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-1">
                    <span className="text-sm font-semibold text-gray-600">
                      Occupation
                    </span>
                    <span className="border-b border-dotted border-gray-400 py-1">
                      {displayValue(option.family_member_occupation)}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-b-2 border-gray-800">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col col-span-3">
              <span className="text-sm font-semibold text-gray-600">
                Residential Address
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.residential_add)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Landmark
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.residential_landmark)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">City</span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.residential_city)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Pin Code
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.residential_pin)}
              </span>
            </div>
            <div className="flex flex-col col-span-3">
              <span className="text-sm font-semibold text-gray-600">
                Office Address
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.office_add)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Office Landmark
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.office_landmark)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Office City
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.office_city)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Office Pin Code
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.office_pin)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Office Phone
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.office_phone)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                WhatsApp
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.whats_app)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Mail Address
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.mailaddress)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Resident in Bangalore (Year)
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.user_resident_to_bang_since)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
                Donate Blood
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.donate_blood)}
              </span>
            </div>
          </div>
        </div>
          {/* Introduction Information */}

          <div className="mb-6">
          <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-b-2 border-gray-800">
            Introduction Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col ">
              <span className="text-sm font-semibold text-gray-600">
              Introducd By (Member Name) :
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.f_mintroby)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
              Membership No. of Introducer :
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.f_mmemno)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">     Phone No. of Introducer :</span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.f_mintrophone)}
              </span>
            </div>
            <div className="flex flex-col col-span-2">
              <span className="text-sm font-semibold text-gray-600">
              Address of Introducer :
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.f_mintroadd)}
              </span>
            </div>
            <div className="flex flex-col ">
              <span className="text-sm font-semibold text-gray-600">
              Member of Other Organizations :
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.f_motherorga)}
              </span>
            </div>

            {profile.f_motherorga == "Yes" ? (
            <>
<div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
              Organizations Name :
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
                {displayValue(profile.org_name)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
              Organizations Type :
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
              {displayValue(profile.org_type)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">
              Organizations Product :
              </span>
              <span className="border-b border-dotted border-gray-400 py-1">
              {displayValue(profile.org_product)}
              </span>
            </div>
            </>
  ) : (
    ""
  )}
            
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemberView;
