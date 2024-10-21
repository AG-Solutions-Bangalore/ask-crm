import React, { useContext, useEffect, useState } from "react";
import {
  Input,
  Option,
  Button,
  Card,
  CardBody,
} from "@material-tailwind/react";
import {
  FaUser,
  FaVenusMars,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaTint,
  FaGraduationCap,
  FaIdCard,
  FaImage,
  FaRing,
  FaHome,
  FaBuilding,
  FaWhatsapp,
  FaMapMarker,
  FaCity,
  FaMapPin,
  FaBusinessTime,
  FaUsers,
  FaHandshake,
} from "react-icons/fa";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Layout from "../../layout/Layout";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ContextPanel } from "../../utils/ContextPanel";
import BASE_URL from "../../base/BaseUrl";

const MemberEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    user_gender: "",
    user_mobile_number: "",
    email: "",
    gotra: "",
    state: "",
    user_dob: "",
    user_blood: "",
    user_qualification: "",
    native_place: "",
    user_proof_identification: "",
    f_mannidate: "",
    spouse_name: "",
    spouse_mobile: "",
    spouse_dob: "",
    spouse_blood_group: "",
    spouse_qualification: "",
    married: "",
    father_name: "",
    father_mobile: "",
    father_dob: "",
    office_add: "",
    office_landmark: "",
    office_city: "",
    office_pin: "",
    residential_add: "",
    residential_landmark: "",
    residential_city: "",
    residential_pin: "",
    mailaddress: "",
    user_resident_to_bang_since: "",
    office_phone: "",
    org_name: "",
    org_type: "",
    org_product: "",
    whats_app: "",
    agrawal_image: "",
    user_proof_doc: "",
    otpcode: "",
    f_motherorga: "",
    priceaga: "",
    f_mmemno: "",
    f_mintrophone: "",
    f_mintroadd: "",
    donate_blood: "",
    f_mintroby: "",
    user_pan_no: "",
  });

  const [selectedFiledoc, setSelectedFileDoc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [states, setStates] = useState([{ state_name: "" }]);
  const [gottras, setGotras] = useState([{ gotra_name: "" }]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { isPanelUp } = useContext(ContextPanel);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchformDataData = async () => {
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
        setFormData(response.data?.userdata);
        console.table(response.data?.userdata);
      } catch (error) {
        console.error("Error fetching Life Time data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchformDataData();
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
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ];

  const identification = [
    {
      value: "Aadhar",
      label: "Aadhar",
    },
    {
      value: "PassPort",
      label: "PassPort",
    },
    {
      value: "PanCard",
      label: "PanCard",
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
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "name") {
      if (validateOnlyText(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "father_name") {
      if (validateOnlyText(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "office_phone") {
      if (validateOnlyDigits(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "whats_app") {
      if (validateOnlyDigits(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "father_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "residential_pin") {
      if (validateOnlyDigits(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "office_pin") {
      if (validateOnlyDigits(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "f_mmemno") {
      if (validateOnlyDigits(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "f_mintrophone") {
      if (validateOnlyDigits(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "spouse_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("user_gender", formData.user_gender);
    data.append("user_mobile_number", formData.user_mobile_number);
    data.append("email", formData.email);
    data.append("gotra", formData.gotra);
    data.append("user_dob", formData.user_dob);
    data.append("user_blood", formData.user_blood);
    data.append("user_qualification", formData.user_qualification);
    data.append("spouse_qualification", formData.spouse_qualification);
    data.append("spouse_blood_group", formData.spouse_blood_group);
    data.append("native_place", formData.native_place);
    data.append("state", formData.state);
    data.append(
      "user_proof_identification",
      formData.user_proof_identification
    );
    data.append("f_mannidate", formData.f_mannidate);
    data.append("spouse_name", formData.spouse_name);
    data.append("spouse_dob", formData.spouse_dob);
    data.append("married", formData.married);
    data.append("gender", formData.gender);
    data.append("father_name", formData.father_name);
    data.append("father_mobile", formData.father_mobile);
    data.append("spouse_mobile", formData.spouse_mobile);
    data.append("father_dob", formData.father_dob);
    data.append("office_add", formData.office_add);
    data.append("office_landmark", formData.office_landmark);
    data.append("office_city", formData.office_city);
    data.append("office_pin", formData.office_pin);
    data.append("residential_add", formData.residential_add);
    data.append("residential_landmark", formData.residential_landmark);
    data.append("residential_city", formData.residential_city);
    data.append("residential_pin", formData.residential_pin);
    data.append("mailaddress", formData.mailaddress);
    data.append(
      "user_resident_to_bang_since",
      formData.user_resident_to_bang_since
    );
    data.append("office_phone", formData.office_phone);
    data.append("org_name", formData.org_name);
    data.append("org_type", formData.org_type);
    data.append("org_product", formData.org_product);
    data.append("whats_app", formData.whats_app);
    data.append("agrawal_image", selectedFile);
    data.append("user_proof_doc", selectedFiledoc);
    data.append("f_motherorga", formData.f_motherorga);
    data.append("f_mmemno", formData.f_mmemno);
    data.append("f_mintrophone", formData.f_mintrophone);
    data.append("f_mintroadd", formData.f_mintroadd);
    data.append("donate_blood", formData.donate_blood);
    data.append("f_mintroby", formData.f_mintroby);
    data.append("user_pan_no", formData.user_pan_no);

    axios({
      url: BASE_URL + "/api/update-web-register-admin/" + id + "?_method=PUT",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Life Time Member Update Successfully");

        navigate("/home");
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
            <form onSubmit={handleUpdate} id="addIndiv" className="space-y-8">
              {/* Personal Information Section */}
              <section className="space-y-6">
                
                <div className="border-l-4 flex justify-between items-center border-blue-500 pl-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Personal Information
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Basic details about yourself
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    MID:{formData.user_mid}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="text"
                      name="name"
                      label="Full Name"
                      value={formData.name}
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
                        value={formData.user_gender}
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
                        value={formData.gotra}
                        label="Gotra"
                        required
                      >
                        {gottras.map((option) => (
                          <MenuItem
                            key={option.gotra_name}
                            value={option.gotra_name}
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
                        value={formData.state}
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
                      value={formData.user_mobile_number}
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
                      value={formData.email}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="date"
                      name="user_dob"
                      label="Date of Birth"
                      value={formData.user_dob}
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
                        value={formData.user_blood}
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
                      value={formData.user_qualification}
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
                        value={formData.user_proof_identification}
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
                    <span className="text-red-400 text-xs">{formData.user_proof_doc}</span>
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      name="agrawal_images"
                      type="file"
                      label="formData Image"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                     
                    />
                    <span className="text-red-400 text-xs">{formData.agrawal_image}</span>
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
                    required
                    label="Pan No"
                    value={formData.user_pan_no}
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
                        value={formData.married}
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

                  {formData.married === "Yes" && (
                    <>
                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <Input
                          type="date"
                          name="f_mannidate"
                          label="Anniversary Date"
                          value={formData.f_mannidate}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <Input
                          type="text"
                          name="spouse_name"
                          label="Spouse Name"
                          value={formData.spouse_name}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <Input
                          type="tel"
                          name="spouse_mobile"
                          label="Spouse Mobile"
                          value={formData.spouse_mobile}
                          onChange={(e) => onInputChange(e)}
                          maxLength={10}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                        <Input
                          type="date"
                          name="spouse_dob"
                          label="Spouse Date of Birth"
                          value={formData.spouse_dob}
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
                            value={formData.spouse_blood_group}
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
                          value={formData.spouse_qualification}
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
                      value={formData.father_name}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="date"
                      name="father_dob"
                      label="Father Date of Birth"
                      value={formData.father_dob}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md rounded-lg">
                    <Input
                      type="tel"
                      name="father_mobile"
                      label="Father Mobile"
                      value={formData.father_mobile}
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
                      value={formData.native_place}
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
                      value={formData.residential_add}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="residential_landmark"
                      label="Residential Landmark"
                      value={formData.residential_landmark}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="residential_city"
                      label="Residential City"
                      value={formData.residential_city}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="residential_pin"
                      label="Residential Pincode"
                      value={formData.residential_pin}
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
                      value={formData.office_add}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="office_landmark"
                      label="Office Landmark"
                      value={formData.office_landmark}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="office_city"
                      label="Office City"
                      value={formData.office_city}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="office_pin"
                      label="Office Pincode"
                      value={formData.office_pin}
                      onChange={(e) => onInputChange(e)}
                      maxLength={6}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="tel"
                      name="office_phone"
                      label="Office Phone"
                      value={formData.office_phone}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="tel"
                      name="whats_app"
                      label="WhatsApp Number"
                      value={formData.whats_app}
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
                        value={formData.mailaddress}
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
                      value={formData.user_resident_to_bang_since}
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
                        value={formData.donate_blood}
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
                      value={formData.f_mintroby}
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                    <Input
                      type="text"
                      name="f_mmemno"
                      label="Membership No. of Introducer"
                      value={formData.f_mmemno}
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
                      value={formData.f_mintrophone}
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
                      value={formData.f_mintroadd}
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
                        value={formData.f_motherorga}
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

                  {formData.f_motherorga === "Yes" && (
                    <>
                      <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                        <Input
                          type="text"
                          name="org_name"
                          label="Organization Name"
                          value={formData.org_name}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                        <Input
                          type="text"
                          name="org_type"
                          label="Organization Type"
                          value={formData.org_type}
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>

                      <div className="transition-all duration-300 hover:shadow-md  rounded-lg">
                        <Input
                          type="text"
                          name="org_product"
                          label="Organization Product"
                          value={formData.org_product}
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
                <Link to="/home">
                  <Button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default MemberEdit;
