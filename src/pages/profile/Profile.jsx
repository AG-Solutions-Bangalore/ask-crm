import React, { useContext, useEffect, useState } from "react";
import {
  Input,
  Option,
  Button,
  Card,
  CardBody,
} from "@material-tailwind/react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState({
    user_gender: "",
    name: "",
    user_mobile_number: "",
    email: "",
    gotra: "",
    state: "",
    user_dob: "",
    user_blood: "",
    user_qualification: "",
    user_proof_identification: "",
    agrawal_image: "",
    agrawal_images: "",
    user_proof_doc: "",
    user_proof_docs: "",
    married: "",
    f_mannidate: "",
    spouse_name: "",
    spouse_mobile: "",
    spouse_dob: "",
    spouse_blood_group: "",
    spouse_qualification: "",
    father_name: "",
    father_mobile: "",
    father_dob: "",
    native_place: "",
    user_pan_no: "",
    residential_add: "",
    residential_landmark: "",
    residential_city: "",
    residential_pin: "",
    office_add: "",
    office_landmark: "",
    office_city: "",
    office_pin: "",
    office_phone: "",
    mailaddress: "",
    user_resident_to_bang_since: "",
    donate_blood: "",
    whats_app: "",
    f_mintroby: "",
    f_mmemno: "",
    f_mintrophone: "",
    f_mintroadd: "",
    f_motherorga: "",
    org_name: "",
    org_type: "",
    org_product: "",
  });

  const [selectedFiledoc, setSelectedFileDoc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [states, setStates] = useState([{ state_name: "" }]);
  const [gottras, setGotras] = useState([{ gotra_name: "" }]);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/fetch-web-register-user-edit`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data?.userdata);
        console.table(response.data?.userdata);
      } catch (error) {
        console.error("Error fetching Life Time data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const fetchStateData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-web-state`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStates(response.data?.statedata);
      console.table(response.data?.statedata);
    } catch (error) {
      console.error("Error fetching Life Time data", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchGotraData = async () => {
    try {
      if (!isPanelUp) {
        navigate("/maintenance");
        return;
      }
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/fetch-web-gotra`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGotras(response.data?.gotradata);
      console.table(response.data?.gotradata);
    } catch (error) {
      console.error("Error fetching Life Time data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStateData();
    fetchGotraData();
  }, []);

  // Options for select fields
  const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

  const blood = [
    { label: "A +", value: "A +" },
    { label: "A -", value: "A -" },
    { label: "B +", value: "B +" },
    { label: "B -", value: "B -" },
    { label: "O +", value: "O +" },
    { label: "O -", value: "O -" },
    { label: "AB +", value: "AB +" },
    { label: "AB -", value: "AB -" },
  ];

  const identification = [
    {
      value: "Aadhar Card",
      label: "Aadhar Card",
    },
    {
      value: "PassPort",
      label: "PassPort",
    },
    {
      value: "Pan Card",
      label: "Pan Card",
    },
  ];

  const mailaddress = [
    {
      value: "Residence",
      label: "Residence",
    },
    {
      value: "Office",
      label: "Office",
    },
  ];
  const yesorno = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const validateOnlyText = (inputtxt) => {
    var re = /^[A-Za-z ]+$/;
    if (inputtxt === "" || re.test(inputtxt)) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "user_mobile_number") {
      if (validateOnlyDigits(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "appli_name") {
      if (validateOnlyText(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "spouse_name") {
      if (validateOnlyText(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "spouse_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "father_name") {
      if (validateOnlyText(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "father_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "native_place") {
      if (validateOnlyText(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "residential_city") {
      if (validateOnlyText(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "office_city") {
      if (validateOnlyText(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "residential_pin") {
      if (validateOnlyDigits(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "office_pin") {
      if (validateOnlyDigits(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "office_phone") {
      if (validateOnlyDigits(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "whats_app") {
      if (validateOnlyDigits(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "user_resident_to_bang_since") {
      if (validateOnlyDigits(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "f_mintroby") {
      if (validateOnlyText(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "f_mintrophone") {
      if (validateOnlyDigits(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "org_name") {
      if (validateOnlyText(e.target.value)) {
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("appli_name", profile.name);
    data.append("user_gender", profile.user_gender);
    data.append("user_mobile_number", profile.user_mobile_number);
    data.append("user_qualification", profile.user_qualification);
    data.append("user_proof_identification", profile.user_proof_identification);
    data.append("email", profile.email);
    data.append("f_mgotra", profile.gotra);
    data.append("f_mdob", profile.user_dob);
    data.append("f_mblood", profile.user_blood);
    data.append("f_mstate", profile.state);
    data.append("agrawal_images", selectedFile);
    data.append("user_proof_docs", selectedFiledoc);
    data.append("married", profile.married);
    data.append("f_mannidate", profile.f_mannidate);
    data.append("spouse_name", profile.spouse_name);
    data.append("user_pan_no", profile.user_pan_no);
    data.append("spouse_mobile", profile.spouse_mobile);
    data.append("spouse_dob", profile.spouse_dob);
    data.append("spouse_blood_group", profile.spouse_blood_group);
    data.append("spouse_qualification", profile.spouse_qualification);
    data.append("father_name", profile.father_name);
    data.append("father_mobile", profile.father_mobile);
    data.append("father_dob", profile.father_dob);
    data.append("native_place", profile.native_place);
    data.append("residential_add", profile.residential_add);
    data.append("residential_landmark", profile.residential_landmark);
    data.append("residential_city", profile.residential_city);
    data.append("residential_pin", profile.residential_pin);
    data.append("office_add", profile.office_add);
    data.append("office_landmark", profile.office_landmark);
    data.append("office_city", profile.office_city);
    data.append("office_pin", profile.office_pin);
    data.append("office_phone", profile.office_phone);
    data.append("mailaddress", profile.mailaddress);
    data.append(
      "user_resident_to_bang_since",
      profile.user_resident_to_bang_since
    );
    data.append("donate_blood", profile.donate_blood);
    data.append("whats_app", profile.whats_app);
    data.append("f_mintroby", profile.f_mintroby);
    data.append("f_mmemno", profile.f_mmemno);
    data.append("f_mintrophone", profile.f_mintrophone);
    data.append("f_mintroadd", profile.f_mintroadd);
    data.append("f_motherorga", profile.f_motherorga);
    data.append("org_name", profile.org_name);
    data.append("org_type", profile.org_type);
    data.append("org_product", profile.org_product);
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
      return;
    }
    axios({
      url: BASE_URL + "/api/update-web-register?_method=PUT",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Profile Update Successfully");

        
      } else {
        toast.error("duplicate entry");
      }
    });
    // Add your update logic here
  };

  return (
    <Layout>
      <div className="mt-5">
        <Card>
          <CardBody>
            <form onSubmit={handleUpdate} id="addIndiv" className="space-y-8 ">
              {/* Personal Information Section */}
              <section className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Personal Information
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Basic details about yourself
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="text"
                      name="name"
                      label="Full Name"
                      value={profile.name}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <FormControl fullWidth>
                      <InputLabel id="service-select-label">
                        <span className="text-sm relative bottom-[6px]">
                          Gender <span className="text-red-700">*</span>
                        </span>
                      </InputLabel>
                      <Select
                        sx={{ height: "40px", borderRadius: "5px" }}
                        labelId="service-select-label"
                        id="service-select"
                        name="user_gender"
                        onChange={(e) => onInputChange(e)}
                        value={profile.user_gender}
                        label="Gender"
                        required
                      >
                        {gender.map((option, key) => (
                          <MenuItem
                            key={option.value}
                            value={String(option.label)}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <FormControl fullWidth>
                      <InputLabel id="service-select-label">
                        <span className="text-sm relative bottom-[6px]">
                          Gotra <span className="text-red-700">*</span>
                        </span>
                      </InputLabel>
                      <Select
                        sx={{ height: "40px", borderRadius: "5px" }}
                        labelId="service-select-label"
                        id="service-select"
                        name="gotra"
                        onChange={(e) => onInputChange(e)}
                        value={profile.gotra}
                        label="Gotra"
                        required
                      >
                        {gottras.map((option) => (
                          <MenuItem
                            key={option.gotra_name}
                            value={String(option.gotra_name)}
                          >
                            {option.gotra_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <FormControl fullWidth>
                      <InputLabel id="service-select-label">
                        <span className="text-sm relative bottom-[6px]">
                          State <span className="text-red-700">*</span>
                        </span>
                      </InputLabel>
                      <Select
                        sx={{ height: "40px", borderRadius: "5px" }}
                        labelId="service-select-label"
                        id="service-select"
                        name="state"
                        value={profile.state}
                        onChange={(e) => onInputChange(e)}
                        label="State"
                        required
                      >
                        {states.map((option) => (
                          <MenuItem
                            key={option.state_name}
                            value={String(option.state_name)}
                          >
                            {option.state_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="tel"
                      name="user_mobile_number"
                      label="Mobile Number"
                      value={profile.user_mobile_number}
                      onChange={(e) => onInputChange(e)}
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="email"
                      name="email"
                      label="Email"
                      value={profile.email}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="date"
                      name="user_dob"
                      label="Date of Birth"
                      value={profile.user_dob}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <FormControl fullWidth>
                      <InputLabel id="service-select-label">
                        <span className="text-sm relative bottom-[6px]">
                          Blood Group <span className="text-red-700">*</span>
                        </span>
                      </InputLabel>
                      <Select
                        sx={{ height: "40px", borderRadius: "5px" }}
                        labelId="service-select-label"
                        id="service-select"
                        name="user_blood"
                        label="Blood Group"
                        value={profile.user_blood}
                        onChange={(e) => onInputChange(e)}
                        required
                      >
                        {blood.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={String(option.label)}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="text"
                      name="user_qualification"
                      label="Qualification"
                      value={profile.user_qualification}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <FormControl fullWidth>
                      <InputLabel id="service-select-label">
                        <span className="text-sm relative bottom-[6px]">
                          Proof Identification{" "}
                          <span className="text-red-700">*</span>
                        </span>
                      </InputLabel>
                      <Select
                        sx={{ height: "40px", borderRadius: "5px" }}
                        labelId="service-select-label"
                        id="service-select"
                        name="user_proof_identification"
                        label="Proof Identification"
                        value={profile.user_proof_identification}
                        onChange={(e) => onInputChange(e)}
                        required
                      >
                        {identification.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={String(option.label)}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      name="user_proof_docs"
                      type="file"
                      label="Document Proof"
                      onChange={(e) => setSelectedFileDoc(e.target.files[0])}
                    />
                    <span className="text-red-500 text-sm">{profile.user_proof_doc}</span>
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      name="agrawal_images"
                      type="file"
                      label="Profile Image"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    <span className="text-red-500 text-sm">{profile.agrawal_image}</span>
                  </div>
                </div>
              </section>

              {/* Family Information Section */}
              <section className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Family Information
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Details about your family members
                  </p>
                </div>

                

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                  <Input
                    type="text"
                    name="user_pan_no"
                    label="Pan No"
                    value={profile.user_pan_no}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <FormControl fullWidth>
                      <InputLabel id="service-select-label">
                        <span className="text-sm relative bottom-[6px]">
                          Marital Status <span className="text-red-700">*</span>
                        </span>
                      </InputLabel>
                      <Select
                        sx={{ height: "40px", borderRadius: "5px" }}
                        labelId="service-select-label"
                        id="service-select"
                        name="married"
                        label="Marital Status"
                        value={profile.married}
                        onChange={(e) => onInputChange(e)}
                        required
                      >
                        {yesorno.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={String(option.label)}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  {profile.married === "Yes" && (
                    <>
                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <Input
                          type="date"
                          name="f_mannidate"
                          label="Anniversary Date"
                          value={profile.f_mannidate}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <Input
                          type="text"
                          name="spouse_name"
                          label="Spouse Name"
                          value={profile.spouse_name}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <Input
                          type="tel"
                          name="spouse_mobile"
                          label="Spouse Mobile"
                          value={profile.spouse_mobile}
                          onChange={(e) => onInputChange(e)}
                          maxLength={10}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <Input
                          type="date"
                          name="spouse_dob"
                          label="Spouse Date of Birth"
                          value={profile.spouse_dob}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <FormControl fullWidth>
                          <InputLabel id="service-select-label">
                            <span className="text-sm relative bottom-[6px]">
                              Spouse Blood Group{" "}
                              <span className="text-red-700">*</span>
                            </span>
                          </InputLabel>
                          <Select
                            sx={{ height: "40px", borderRadius: "5px" }}
                            labelId="spouse_blood_group-select-label"
                            id="service-select"
                            name="married"
                            label="Spouse Blood Group"
                            value={profile.spouse_blood_group}
                            onChange={(e) => onInputChange(e)}
                            required
                          >
                            {blood.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={String(option.label)}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <Input
                          type="text"
                          name="spouse_qualification"
                          label="Spouse Qualification"
                          value={profile.spouse_qualification}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                    </>
                  )}

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="text"
                      name="father_name"
                      label="Father Name"
                      value={profile.father_name}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="date"
                      name="father_dob"
                      label="Father Date of Birth"
                      value={profile.father_dob}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="tel"
                      name="father_mobile"
                      label="Father Mobile"
                      value={profile.father_mobile}
                      onChange={(e) => onInputChange(e)}
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="text"
                      name="native_place"
                      label="Native Place"
                      value={profile.native_place}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Contact Information Section */}
              <section className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Details about your contact
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="residential_add"
                      label="Residential Address"
                      value={profile.residential_add}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="residential_landmark"
                      label="Residential Landmark"
                      value={profile.residential_landmark}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="residential_city"
                      label="Residential City"
                      value={profile.residential_city}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="residential_pin"
                      label="Residential Pincode"
                      value={profile.residential_pin}
                      onChange={(e) => onInputChange(e)}
                      maxLength={6}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="office_add"
                      label="Office Address"
                      value={profile.office_add}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="office_landmark"
                      label="Office Landmark"
                      value={profile.office_landmark}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="office_city"
                      label="Office City"
                      value={profile.office_city}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="office_pin"
                      label="Office Pincode"
                      value={profile.office_pin}
                      onChange={(e) => onInputChange(e)}
                      maxLength={6}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="tel"
                      name="office_phone"
                      label="Office Phone"
                      value={profile.office_phone}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="tel"
                      name="whats_app"
                      label="WhatsApp Number"
                      value={profile.whats_app}
                      onChange={(e) => onInputChange(e)}
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <FormControl fullWidth>
                      <InputLabel id="service-select-label">
                        <span className="text-sm relative bottom-[6px]">
                          Mail Address <span className="text-red-700">*</span>
                        </span>
                      </InputLabel>
                      <Select
                        sx={{ height: "40px", borderRadius: "5px" }}
                        labelId="spouse_blood_group-select-label"
                        id="service-select"
                        name="mailaddress"
                        label="Mail Address"
                        value={profile.mailaddress}
                        onChange={(e) => onInputChange(e)}
                        required
                      >
                        {mailaddress.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={String(option.label)}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="user_resident_to_bang_since"
                      label="Resident in Bangalore Since (Year)"
                      value={profile.user_resident_to_bang_since}
                      onChange={(e) => onInputChange(e)}
                      maxLength={4}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <FormControl fullWidth>
                      <InputLabel id="service-select-label">
                        <span className="text-sm relative bottom-[6px]">
                          Willing to Donate Blood{" "}
                          <span className="text-red-700">*</span>
                        </span>
                      </InputLabel>
                      <Select
                        sx={{ height: "40px", borderRadius: "5px" }}
                        labelId="spouse_blood_group-select-label"
                        id="service-select"
                        name="donate_blood"
                        label="Willing to Donate Blood"
                        value={profile.donate_blood}
                        onChange={(e) => onInputChange(e)}
                        required
                      >
                        {yesorno.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={String(option.label)}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </section>

              {/* Introduction Information Section */}
              <section className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Introduction Information
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Details about your Introduction
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="f_mintroby"
                      label="Introduced By (Member Name)"
                      value={profile.f_mintroby}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="f_mmemno"
                      label="Membership No. of Introducer"
                      value={profile.f_mmemno}
                      onChange={(e) => onInputChange(e)}
                      maxLength={4}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="tel"
                      name="f_mintrophone"
                      label="Phone No. of Introducer"
                      value={profile.f_mintrophone}
                      onChange={(e) => onInputChange(e)}
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="f_mintroadd"
                      label="Address of Introducer"
                      value={profile.f_mintroadd}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <FormControl fullWidth>
                      <InputLabel id="service-select-label">
                        <span className="text-sm relative bottom-[6px]">
                          Member of Other Organizations{" "}
                          <span className="text-red-700">*</span>
                        </span>
                      </InputLabel>
                      <Select
                        sx={{ height: "40px", borderRadius: "5px" }}
                        labelId="spouse_blood_group-select-label"
                        id="service-select"
                        name="f_motherorga"
                        label="Member of Other Organizations"
                        value={profile.f_motherorga}
                        onChange={(e) => onInputChange(e)}
                        required
                      >
                        {yesorno.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={String(option.label)}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  {profile.f_motherorga === "Yes" && (
                    <>
                      <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                        <Input
                          type="text"
                          name="org_name"
                          label="Organization Name"
                          value={profile.org_name}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                        <Input
                          type="text"
                          name="org_type"
                          label="Organization Type"
                          value={profile.org_type}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                        <Input
                          type="text"
                          name="org_product"
                          label="Organization Product"
                          value={profile.org_product}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Form Actions */}
              <div className="flex gap-4 justify-start">
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                >
                  Update
                </Button>
                
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
