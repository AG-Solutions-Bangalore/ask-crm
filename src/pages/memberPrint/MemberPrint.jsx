import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../../layout/Layout";
import "./style.css";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import BASE_URL from "../../base/BaseUrl";
import { Card, CardContent, Grid, Box, Typography } from "@mui/material";
import { FaPrint } from "react-icons/fa";
import moment from "moment";
import header from "../../../public/img/header.png";
import { AiOutlinePrinter } from "react-icons/ai";
import ReactToPrint from "react-to-print";
const MemberPrint = () => {
  const componentRef = useRef();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const { id } = useParams();
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
        `${BASE_URL}/api/fetch-web-family-member-view/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data?.userdata);
    } catch (error) {
      console.error("Error fetching Life Time data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLifeTimeData();
  }, []);

  return (
    <Layout>
      <div className="mt-5">
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full">
            <div className="mb-2">
              <ReactToPrint
                trigger={() => (
                  <a className="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer flex items-center">
                    <AiOutlinePrinter className="mr-2" /> Print
                  </a>
                )}
                content={() => componentRef.current}
              />
            </div>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <div
                  ref={componentRef}
                  className=" print-container flex flex-col w-full"
                >
                  {/* Header Section */}
                  <div className="flex flex-col items-center ">
                    <img
                      src={header}
                      alt="header"
                      className="w-full object-fit h-52 mb-4"
                    />
                    <hr className="w-full border-black" />
                  </div>

                  {/* Personal Information Section */}
                  <div className=" p-2">
                    <h1 className="mb-2  w-[12rem] text-purple-700 font-bold text-[1rem]">
                      PERSON INFORMATION
                    </h1>

                    <div className="border-2 border-dashed rounded-lg p-1 border-green-600">
                      {/* <div className="flex flex-col gap-1 mb-1"> */}
                      <div className="flex flex-col md:flex-row gap-1 mb-1">
                        <div className="w-full ">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28  font-medium">
                                Name (Gotra)
                              </span>
                              <span className="  font-medium">:</span>
                              <span>
                                {profile.name} - {profile.gotra} (
                                {profile.user_gender})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-1 mb-1 ">
                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start  gap-4">
                              <span className="w-28  font-medium">
                                Date of Birth
                              </span>
                              <span className=" font-medium">:</span>
                              <span>
                                {moment(profile.user_dob).format("DD-MM-YYYY")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/2">
                          <div className="   p-3 rounded-lg">
                            <div className="flex justify-start   gap-4">
                              <span className="w-28  font-medium">
                                Blood Group
                              </span>
                              <span className="font-medium">:</span>
                              <span>{profile.user_blood}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Family Information */}
                      <div className="flex flex-col md:flex-row gap-1 mb-1">
                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">
                                Father Name
                              </span>
                              <span className="font-medium">:</span>
                              <span>{profile.father_name}</span>
                            </div>
                          </div>
                        </div>

                        {/* Qualification */}
                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className=" font-medium w-28">
                                Qualification
                              </span>
                              <span className="font-medium">:</span>
                              <span>{profile.user_qualification}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Wedding Information */}
                      <div className="flex flex-col md:flex-row gap-1 mb-1">
                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">
                                Native Place
                              </span>
                              <span className="font-medium">:</span>
                              <span>{profile.native_place}</span>
                            </div>
                          </div>
                        </div>

                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">
                                Wedd. Date
                              </span>
                              <span className="font-medium">:</span>
                              <span>
                                {moment(profile.f_mannidate).format(
                                  "DD-MM-YYYY"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-1 mb-1">
                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">
                                Spouse Name
                              </span>
                              <span className="font-medium">:</span>
                              <span>{profile.spouse_name}</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28  font-medium">
                                Date of Birth
                              </span>
                              <span className="font-medium">:</span>
                              <span>
                                {moment(profile.spouse_dob).format(
                                  "DD-MM-YYYY"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-1 mb-1">
                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">
                                Qualification
                              </span>
                              <span className="font-medium">:</span>
                              <span>{profile.spouse_qualification}</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28  font-medium">
                                Blood Group
                              </span>
                              <span className="font-medium">:</span>
                              <span>{profile.spouse_blood_group}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* </div> */}

                  {/* Address Section */}
                  <div className=" p-2">
                    <h1 className="mb-2  w-[12rem] text-purple-700 font-bold text-[1.1rem]">
                      RESIDENCE ADDRESS
                    </h1>
                    <div className="flex justify-between gap-5 items-center">
                      <div className="p-1  border-2 border-dashed border-green-600 rounded-lg w-[61rem]   ">
                        <div className=" p-1  ">
                          <span> {profile.residential_add}</span>{" "}
                          <span>{profile.residential_landmark}</span>
                          <div className="flex flex-col">
                            <span>{profile.residential_city}</span>{" "}
                            <span>{profile.residential_pin}</span>
                          </div>
                        </div>
                      </div>
                      {/* Profile Image */}
                      <div>
                        <img
                        src={ `${BASE_URL}/app_images/members/`+profile.agrawal_image}
                          alt="Profile"
                          className="w-24 h-42 rounded-lg object-cover border-4 border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Office Address */}
                  <div className=" p-2">
                    <h1 className="mb-2  w-[9rem] text-purple-700 font-bold text-[1.1rem]">
                      OFFICE ADDRESS
                    </h1>
                    <div className=" p-1 border-2 border-dashed border-green-600 rounded-lg">
                      <div className="     p-1 rounded-lg mb-1">
                        <div>
                          {profile.office_add}&nbsp; {profile.office_landmark}
                          &nbsp;
                          {profile.office_city}&nbsp; {profile.office_pin}&nbsp;
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-1">
                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">
                                Contact No
                              </span>
                              <span className="font-medium">:</span>
                              <span>{profile.office_phone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="w-full md:w-1/2">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">
                                Mailing Add.
                              </span>
                              <span className="font-medium">:</span>
                              <span>{profile.mailaddress}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className=" p-2">
                    <h1 className="mb-2  w-[13rem] text-purple-700 font-bold text-[1.1rem]">
                      CONTACT INFORMATION
                    </h1>
                    <div className="flex flex-col p-1 border-2 border-dashed border-green-600 rounded-lg md:flex-row flex-wrap gap-1">
                      <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <div className="     p-3 rounded-lg">
                          <div className="flex justify-start gap-4">
                            <span className="w-28 font-medium">Mobile No</span>
                            <span className="font-medium">:</span>
                            <span>{profile.user_mobile_number}</span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <div className="     p-3 rounded-lg">
                          <div className="flex justify-start gap-4">
                            <span className="w-28 font-medium">Email Id</span>
                            <span className="font-medium">:</span>
                            <span>{profile.email}</span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <div className="     p-3 rounded-lg">
                          <div className="flex justify-start gap-4">
                            <span className="w-28 font-medium">
                              Mobile No.2
                            </span>
                            <span className="font-medium">:</span>
                            <span>{profile.whats_app}</span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <div className="     p-3 rounded-lg">
                          <div className="flex justify-start gap-4">
                            <span className="w-28 font-medium">
                              Mobile No.3
                            </span>
                            <span className="font-medium">:</span>
                            <span>{profile.f_mintrophone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mintro Members */}
                  <div className=" p-2">
                    <h1 className="mb-2  w-[16rem] text-purple-700 font-bold text-[1.1rem]">
                      DETAILS OF MINTRO MEMBERS
                    </h1>
                    <div className="p-1 border-2 border-dashed border-green-600 rounded-lg">
                      <div className="flex flex-col md:flex-row gap-1 mb-1">
                        <div className="w-full md:w-1/3">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">No.</span>
                              <span className="font-medium">:</span>
                              <span>{profile.f_mmemno}</span>
                            </div>
                          </div>
                        </div>

                        <div className="w-full md:w-1/3">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">Name</span>
                              <span className="font-medium">:</span>
                              <span>{profile.f_mintroby}</span>
                            </div>
                          </div>
                        </div>

                        <div className="w-full md:w-1/3">
                          <div className="     p-3 rounded-lg">
                            <div className="flex justify-start gap-4">
                              <span className="w-28 font-medium">Mobile</span>
                              <span className="font-medium">:</span>
                              <span>{profile.f_mintrophone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                   
                        <div className=" p-3 rounded-lg">
                          <div className="flex justify-start">
                            <span className="w-[96px] font-medium">Address</span>
                            <span className="font-medium">:</span>
                            <span>{profile.f_mintroadd}</span>
                          </div>
                     
                      </div>
                    </div>
                  </div>
                  <hr className="w-full border-black" />
                  {/* Footer Information */}
                  <div className="flex flex-col md:flex-row gap-1 mt-2 p-2 mb-2">
                    <div className="w-full md:w-1/3">
                      <div className="     p-3 rounded-lg">
                        <div className="flex justify-start gap-4">
                          <span className="font-medium">
                            Application Received
                          </span>
                          <span className="font-medium">:</span>
                          <span>{profile.priceaga}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full  md:w-1/3">
                      <div className="     p-3 rounded-lg">
                        <Typography className="flex justify-start gap-4">
                          <span className=" font-medium">MID</span>
                          <span className="font-medium">:</span>
                          <span>{profile.user_mid}</span>
                        </Typography>
                      </div>
                    </div>

                    <div className="w-full md:w-1/3">
                      <div className="     p-3 rounded-lg">
                        <div className="flex justify-start gap-4">
                          <span className=" font-medium">Ref.</span>
                          <span className="font-medium">:</span>
                          <span>{profile.amount_num}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secretary Signature */}
                  <div className="flex justify-end mt-8 ">
                    <div className="text-center">
                      <div className="">
                        Secretary
                      </div>
                      <div className="font-bold">
                        Agrawal Samaj (Karnataka) Regd.
                      </div>
                      <div>Bangalore</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemberPrint;
