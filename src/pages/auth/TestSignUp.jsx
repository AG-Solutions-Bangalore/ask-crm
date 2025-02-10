import React, { useEffect, useState } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { FiUser, FiUsers, FiMapPin, FiFileText, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { toast } from "react-toastify";

const gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const blood = [
  { value: "A +", label: "A +" },
  { value: "A -", label: "A -" },
  { value: "B +", label: "B +" },
  { value: "B -", label: "B -" },
  { value: "O +", label: "O +" },
  { value: "O -", label: "O -" },
  { value: "AB +", label: "AB +" },
  { value: "AB -", label: "AB -" },
];

const identification = [
  { value: "Aadhar Card", label: "Aadhar Card" },
  { value: "PassPort", label: "PassPort" },
  { value: "Pan Card", label: "Pan Card" },
];

const married = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];
const bloodDonate = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
  { value: "In Emergency", label: "In Emergency" },
];

const mailaddress = [
  { value: "Residence", label: "Residence" },
  { value: "Office", label: "Office" },
];

const TestSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    appli_name: "",
    appli_gender: "",
    appli_mno: "",
    appli_email: "",
    f_mgotra: "",
    f_mstate: "",
    f_mdob: "",
    f_mblood: "",
    f_mqualiself: "",
    f_nativeplace: "",
    proof_iden: "",
    proof_pan: "",
    f_mannidate: "",
    f_msname: "",
    f_msmno: "",
    f_msdob: "",
    f_msblood: "",
    f_mqualispouse: "",
    married: "",
    f_mfname: "",
    f_mfmno: "",
    f_mfdob: "",
    f_moffiadd: "",
    f_moffiland: "",
    f_mofficity: "",
    f_moffipin: "",
    f_mresadd: "",
    f_mresland: "",
    f_mrescity: "",
    f_mrespin: "",
    mailaddress: "",
    f_mresibang: "",
    office_phone: "",
    org_name: "",
    org_type: "",
    org_product: "",
    whats_app: "",
    agrawal_image: "",
    upload_doc_proof: "",
    otpcode: "",
    f_motherorga: "",
    priceaga: "5100",
    f_mmemno: "",
    f_mintrophone: "",
    f_mintroadd: "",
    donateblood: "",
    f_mintroby: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiledoc, setSelectedFileDoc] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [topping, setTopping] = useState("5100");

  const validators = {
    digits: /^\d+$/,
    text: /^[A-Za-z ]+$/,
  };

  const validateInput = (inputtxt, type) => {
    return type === "digits"
      ? validators.digits.test(inputtxt) || inputtxt.length === 0
      : validators.text.test(inputtxt) || inputtxt === "";
  };

  const fieldsToValidate = {
    digits: [
      "appli_mno",
      "office_phone",
      "whats_app",
      "f_mfmno",
      "f_mrespin",
      "f_moffipin",
      "f_mmemno",
      "f_mintrophone",
      "f_msmno",
    ],
    text: ["appli_name", "f_mfname"],
  };

  const handleSelectChange = (value, name) => {
    console.log(`Select changed: ${name} = ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onInputChange = (e) => {
    // Handle regular input changes
    const { name, value } = e.target;

    if (fieldsToValidate.digits.includes(name)) {
      if (validateInput(value, "digits")) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else if (fieldsToValidate.text.includes(name)) {
      if (validateInput(value, "text")) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [gottras, setGotras] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-web-gotra`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setGotras(res.data?.gotradata);
      });
  }, []);

  const [states, setStates] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/fetch-web-state`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStates(res.data?.statedata);
      });
  }, []);

  const handleSendOtp = (e) => {
    e.preventDefault();
    const form = document.getElementById("addSignup");

    if (!form.checkValidity()) {
      form.reportValidity();

      console.error("Please fill out all required fields before sending OTP.");
      return;
    }
    const data = new FormData();
    data.append("appli_mno", formData.appli_mno);
    axios({
      url: BASE_URL + "/api/web-registerotp",
      method: "POST",
      data,
    })
      .then((res) => {
        if (res.data.code == 200) {
          toast.success("OTP Sent to Mobile No");
          setOtpSent(true);
        } else {
          toast.warning("Failed to send OTP");
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const onPayment = (e, value) => {
    e.preventDefault();
    if (value == 1) {
      window.location = "https://easebuzz.in/quickpay/txtnulgirt";
    } else {
      window.location = "https://easebuzz.in/quickpay/cdnfsvlmyl";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsButtonDisabled(true);
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    if (selectedFile) data.append("agrawal_image", selectedFile);
    if (selectedFiledoc) data.append("upload_doc_proof", selectedFiledoc);
    console.log("data", data);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/web-insert-register`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
       console.log("response",response)

      if (response.data.code == 200) {
        toast.success(response.data.msg);

        if (formData.priceaga == "11100") {
          window.location = "https://easebuzz.in/quickpay/txtnulgirt";
        } else {
          window.location = "https://easebuzz.in/quickpay/cdnfsvlmyl";
        }
      } else {
        if (response.data.code == 400) {
          toast.error(response.data.msg);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Error updating User:", error);
      toast.error("Error  updating User");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
      {/* Fixed Header */}
      <div className="fixed w-full top-0 z-50 bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row md:flex-row justify-between gap-2 items-center">
            <div className="    ">
              <img
              className=" w-full h-[3rem] "
                src="https://new.agrawalsamaj.co/assets/logo-LrjSJo0H.png"
                alt="Logo"
              />
            </div>
            <p className="text-sm  text-gray-600">
             <div> Already registered! Click to pay for{" "}
              <button
                onClick={(e) => onPayment(e, 1)}
                className="text-[#AC246B] hover:text-purple-800 font-medium"
              >
                Life Member
              </button>{" "}
              or{" "}
              <button
                onClick={(e) => onPayment(e, 2)}
                className="text-[#AC246B] hover:text-purple-800 font-medium"
              >
                Patron Life Member
              </button></div>
            </p>
          </div>
        </div>
      </div>
      {/* #AC246B */}
      {/* #e49bc1 */}
      {/* Main Content */}
      <div className=" pt-36 md:pt-24 lg:pt-24 pb-12">
        <div className="max-w-7xl  mx-auto px-2 md:px-2 lg:px-4">
          <div className="flex flex-col lg:flex-row gap-2">
            {/* Left Column - Form */}
            <div className="lg:w-[75%]   max-h-[80vh] overflow-y-auto ">
              <div className="mb-6">
                <h1 className="text-3xl  font-bold text-[#AC246B]">
                  Join  Agarwal Samaj
                </h1>
                <p className="text-gray-600 mt-2">
                  Fill the form
                </p>
              </div>
              <form autoComplete="off" id="addSignup">
                {/* Personal Information Section */}
                <div className="mb-6 p-2 ">
                  <div className="flex items-center gap-3  mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#e49bc1] flex items-center justify-center">
                      <FiUser className="w-5 h-5 text-[#AC246B]" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Personal Information
                    </h2>
                  </div>
                  <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 ">
                    <div className="form-group">
                      <Input
                        label="Name"
                        required
                        type="text"
                        autoComplete="Name"
                        name="appli_name"
                        onChange={(e) => onInputChange(e)}
                        value={formData.appli_name}
                      />
                    </div>
                    <div>
                      <select
                        required
                        name="appli_gender"
                        value={formData?.appli_gender}
                        onChange={(e) =>
                          handleSelectChange(e.target.value, "appli_gender")
                        }
                        className="border w-full text-sm border-gray-400 bg-inherit text-gray-600 rounded-md p-2"
                      >
                        <option value="" disabled>
                          Select Gender <span className="text-red-500">*</span>
                        </option>
                        {gender.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        required
                        name="f_mgotra"
                        value={formData?.f_mgotra}
                        onChange={(e) =>
                          handleSelectChange(e.target.value, "f_mgotra")
                        }
                        className="border w-full text-sm border-gray-400 bg-inherit  text-gray-600 rounded-md p-2"
                      >
                        <option value="" disabled>
                          Select Gottras <span className="text-red-500">*</span>
                        </option>
                        {gottras.map((option) => (
                          <option
                            key={option.gotra_name}
                            value={option.gotra_name}
                          >
                            {option.gotra_name}
                          </option>
                        ))}
                      </select>
                    </div>{" "}
                    <div>
                      <select
                        required
                        name="f_mstate"
                        value={formData?.f_mstate}
                        onChange={(e) =>
                          handleSelectChange(e.target.value, "f_mstate")
                        }
                        className="border text-sm w-full border-gray-400 bg-inherit  text-gray-600 rounded-md p-2"
                      >
                        <option value="">
                          Select State <span className="text-red-500">*</span>
                        </option>
                        {states.map((option) => (
                          <option
                            key={option.state_name}
                            value={option.state_name}
                          >
                            {option.state_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <Input
                        required
                        type="tel"
                        maxLength={10}
                        label="Mobile No"
                        autoComplete="Name"
                        name="appli_mno"
                        onChange={(e) => onInputChange(e)}
                        value={formData.appli_mno}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        required
                        type="tel"
                        maxLength={10}
                        label="Whats App"
                        autoComplete="Name"
                        name="whats_app"
                        onChange={(e) => onInputChange(e)}
                        value={formData.whats_app}
                      />
                    </div>
                    <div className="form-group sm:col-span-1 md:col-span-2 lg:col-span-2">
                      <Input
                        required
                        type="email"
                        label="Email Address"
                        autoComplete="Name"
                        name="appli_email"
                        onChange={(e) => onInputChange(e)}
                        value={formData.appli_email}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        required
                        label="Date of Birth"
                        type="date"
                        autoComplete="Name"
                        name="f_mdob"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mdob}
                      />
                    </div>
                    <select
                      required
                      name="f_mblood"
                      value={formData?.f_mblood}
                      onChange={(e) =>
                        handleSelectChange(e.target.value, "f_mblood")
                      }
                      className="border text-sm border-gray-400 bg-inherit text-gray-600 rounded-md p-2"
                    >
                      <option value="" disabled>
                        Blood Group <span className="text-red-500">*</span>
                      </option>
                      {blood.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="form-group">
                      <Input
                        required
                        type="text"
                        label="Qualification"
                        autoComplete="Name"
                        name="f_mqualiself"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mqualiself}
                      />
                    </div>
                    <select
                      required
                      name="proof_iden"
                      value={formData?.proof_iden}
                      onChange={(e) =>
                        handleSelectChange(e.target.value, "proof_iden")
                      }
                      className="border text-sm border-gray-400 bg-inherit text-gray-600 rounded-md p-2"
                    >
                      <option value="" disabled>
                        Proof Identification{" "}
                        <span className="text-red-500">*</span>
                      </option>
                      {identification.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="form-group">
                      <Input
                        required
                        label="Upload your document proof"
                        type="file"
                        autoComplete="Name"
                        name="upload_doc_proof"
                        onChange={(e) => setSelectedFileDoc(e.target.files[0])}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        required
                        label="Profile Image"
                        type="file"
                        autoComplete="Name"
                        name="agrawal_image"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        type="tel"
                        maxLength={12}
                        label="PAN No"
                        autoComplete="Name"
                        name="proof_pan"
                        onChange={(e) => onInputChange(e)}
                        value={formData.proof_pan}
                      />
                    </div>
                    <select
                      required
                      name="married"
                      value={formData?.married}
                      onChange={(e) =>
                        handleSelectChange(e.target.value, "married")
                      }
                      className="border text-sm border-gray-400 bg-inherit text-gray-600 rounded-md p-2"
                    >
                      <option value="" disabled>
                        Are you married <span className="text-red-500">*</span>
                      </option>
                      {married.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {formData?.married == "Yes" && (
                      <>
                        <div className="form-group">
                          <Input
                            type="date"
                            label="Anniversery"
                            autoComplete="Name"
                            name="f_mannidate"
                            onChange={(e) => onInputChange(e)}
                            value={formData.f_mannidate}
                          />
                        </div>
                        <div className="form-group">
                          <Input
                            required
                            type="text"
                            label="Spouse Name"
                            autoComplete="Name"
                            name="f_msname"
                            onChange={(e) => onInputChange(e)}
                            value={formData.f_msname}
                          />
                        </div>
                        <div className="form-group">
                          <Input
                            type="tel"
                            maxLength={10}
                            label="Spouse Mobile Number"
                            autoComplete="Name"
                            name="f_msmno"
                            onChange={(e) => onInputChange(e)}
                            value={formData.f_msmno}
                          />
                        </div>
                        <div className="form-group">
                          <Input
                            type="date"
                            label="Spouse's Date of Birth"
                            autoComplete="Name"
                            name="f_msdob"
                            onChange={(e) => onInputChange(e)}
                            value={formData.f_msdob}
                          />
                        </div>

                        <select
                          required
                          name="f_msblood"
                          value={formData?.f_msblood}
                          onChange={(e) =>
                            handleSelectChange(e.target.value, "f_msblood")
                          }
                          className="border text-sm border-gray-400 bg-inherit text-gray-600 rounded-md p-2"
                        >
                          <option value="" disabled>
                            Spouse Blood <span className="text-red-500">*</span>
                          </option>
                          {blood.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="form-group">
                          <Input
                            label="Qualification (Spouse)"
                            type="text"
                            autoComplete="Name"
                            name="f_mqualispouse"
                            onChange={(e) => onInputChange(e)}
                            value={formData.f_mqualispouse}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Family Information Section */}
                <div className="mb-6 p-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#e49bc1] flex items-center justify-center">
                      <FiUsers className="w-5 h-5 text-[#AC246B]" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Family Information
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
                    <div className="form-group">
                      <Input
                        required
                        type="text"
                        label="Father Name"
                        autoComplete="Name"
                        name="f_mfname"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mfname}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        label="DOB"
                        type="date"
                        autoComplete="Name"
                        name="f_mfdob"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mfdob}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        type="tel"
                        label="Father's Mobile No"
                        autoComplete="Name"
                        name="f_mfmno"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mfmno}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        required
                        type="text"
                        label="Nativeplace"
                        autoComplete="Name"
                        name="f_nativeplace"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_nativeplace}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="mb-6 p-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#e49bc1] flex items-center justify-center">
                      <FiMapPin className="w-5 h-5 text-[#AC246B]" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Contact Information
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
                    <div className="form-group sm:col-span-1 md:col-span-2 lg:col-span-4">
                      <Input
                        required
                        type="text"
                        label="Residential Address"
                        autoComplete="Name"
                        name="f_mresadd"
                        value={formData.f_mresadd}
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="form-group sm:col-span-1 md:col-span-2 lg:col-span-2 ">
                      <Input
                        required
                        type="text"
                        label="Landmark"
                        autoComplete="Name"
                        name="f_mresland"
                        value={formData.f_mresland}
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        required
                        type="text"
                        label="City"
                        autoComplete="Name"
                        name="f_mrescity"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mrescity}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        required
                        type="tel"
                        maxLength={6}
                        label="Pincode"
                        autoComplete="Name"
                        name="f_mrespin"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mrespin}
                      />
                    </div>
                    <div className="form-group sm:col-span-1 md:col-span-2 lg:col-span-4">
                      <Input
                        type="text"
                        label="Office Address"
                        autoComplete="Name"
                        name="f_moffiadd"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_moffiadd}
                      />
                    </div>
                    <div className="form-group sm:col-span-1 md:col-span-2 lg:col-span-2 ">
                      <Input
                        type="text"
                        label="Landmark"
                        autoComplete="Name"
                        name="f_moffiland"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_moffiland}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        type="text"
                        label="City"
                        autoComplete="Name"
                        name="f_mofficity"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mofficity}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        type="tel"
                        maxLength={6}
                        label="Pincode"
                        autoComplete="Name"
                        name="f_moffipin"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_moffipin}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        type="tel"
                        maxLength={10}
                        label="Office No"
                        autoComplete="Name"
                        name="office_phone"
                        onChange={(e) => onInputChange(e)}
                        value={formData.office_phone}
                      />
                    </div>
               

                    <select
                      required
                      name="mailaddress"
                      value={formData?.mailaddress}
                      onChange={(e) =>
                        handleSelectChange(e.target.value, "mailaddress")
                      }
                      className="border text-sm border-gray-400 bg-inherit text-gray-600 rounded-md p-2"
                    >
                      <option value="" disabled>
                        Courier Address <span className="text-red-500">*</span>
                      </option>
                      {mailaddress.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="form-group">
                      <Input
                        required
                        type="tel"
                        maxLength={4}
                        label="Since Resident in Bng (Yr)"
                        autoComplete="Name"
                        name="f_mresibang"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mresibang}
                      />
                    </div>

                    <select
                      required
                      name="donateblood"
                      value={formData?.donateblood}
                      onChange={(e) =>
                        handleSelectChange(e.target.value, "donateblood")
                      }
                      className="border text-sm border-gray-400 bg-inherit text-gray-600 rounded-md p-2"
                    >
                      <option value="" disabled>
                        Like to Donate Blood{" "}
                        <span className="text-red-500">*</span>
                      </option>
                      {bloodDonate.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-6 p-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#e49bc1] flex items-center justify-center">
                      <FiMapPin className="w-5 h-5 text-[#AC246B]" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Introduction
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
                    <div className="form-group">
                      <Input
                        required
                        type="text"
                        label="Introducd By (Member Name)"
                        autoComplete="Name"
                        name="f_mintroby"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mintroby}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        required
                        type="tel"
                        maxLength={4}
                        label="Membership No. of Introducer"
                        autoComplete="Name"
                        name="f_mmemno"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mmemno}
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        required
                        type="tel"
                        maxLength={10}
                        label="Phone No. of Introducer"
                        autoComplete="Name"
                        name="f_mintrophone"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mintrophone}
                      />
                    </div>
                    <div className="form-group ">
                      <Input
                        required
                        type="text"
                        label="Address of Introducer"
                        autoComplete="Name"
                        name="f_mintroadd"
                        onChange={(e) => onInputChange(e)}
                        value={formData.f_mintroadd}
                      />
                    </div>

                    <select
                      required
                      name="f_motherorga"
                      value={formData?.f_motherorga}
                      onChange={(e) =>
                        handleSelectChange(e.target.value, "f_motherorga")
                      }
                      className="border text-sm border-gray-400 bg-inherit text-gray-600 rounded-md p-2"
                    >
                      <option value="" disabled>
                        Member of any Other Organizations{" "}
                        <span className="text-red-500">*</span>
                      </option>
                      {married.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {formData.f_motherorga == "Yes" && (
                      <>
                        <div className="form-group">
                          <Input
                            type="text"
                            label="Organization Name"
                            autoComplete="Name"
                            name="org_name"
                            onChange={(e) => onInputChange(e)}
                            value={formData.org_name}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </form>
              {/* Submit Button */}
              {otpSent && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                  <div className=" form-group">
                    <Input
                      type="number"
                      label="Enter OTP"
                      autoComplete="Name"
                      name="otpcode"
                      className=""
                      onChange={(e) => onInputChange(e)}
                      value={formData.otpcode}
                    />
                  </div>
                  <div className=" -group">
                    <button
                      disabled={isButtonDisabled}
                      onClick={(e) => onSubmit(e)}
                      className="w-full py-3 px-6 text-white bg-[#AC246B] rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      {isButtonDisabled ? "Submiting..." : "Submit"}
                    </button>
                  </div>
                </div>
              )}

              {!otpSent && (
                <div className="flex flex-row gap-5">
                  <button
                    disabled={isButtonDisabled}
                    onClick={(e) => handleSendOtp(e)}
                    className="w-full  py-3 px-6 text-white bg-[#AC246B] rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {isButtonDisabled ? "Verifying... OTP..." : "Verify OTP"}
                  </button>

                  <button
                    onClick={() => navigate("/")}
                    className="w-[30%] py-3 px-6 text-white bg-[#AC246B] rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Plans */}
            <div className="lg:w-[25%]  space-y-4 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#e49bc1] flex items-center justify-center">
                  <FiFileText className="w-5 h-5 text-[#AC246B]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Membership Type
                </h2>
              </div>

              {/* Life Member Option */}
              <div
                className={`w-full p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  topping == "5100"
                    ? "bg-purple-50 border-[#AC246B]"
                    : "border-gray-200 hover:border-[#e49bc1]"
                }`}
                onClick={() => {
                  setTopping("5100");
                  setFormData((prev) => ({
                    ...prev,
                    priceaga: "5100",
                  }));
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                      topping == "5100"
                        ? "border-[#AC246B] bg-[#AC246B]"
                        : "border-gray-300"
                    }`}
                  >
                    {topping == "5100" && (
                      <FiCheck className="text-white w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Life Member
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Basic Membership Plan
                    </p>
                    <p className="text-2xl font-bold text-[#AC246B]">
                      ₹5,100.00
                    </p>
                    <p className="text-sm text-gray-700 flex flex-col items-start mt-1">
                      <span>Entry Fee: ₹100.00 +</span>{" "}
                      <span>Membership: ₹5,000.00</span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`w-full p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  topping == "11100"
                    ? "bg-purple-50 border-[#AC246B]"
                    : "border-gray-200 hover:border-[#e49bc1]"
                }`}
                onClick={() => {
                  setTopping("11100");
                  setFormData((prev) => ({
                    ...prev,
                    priceaga: "11100",
                  }));
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                      topping == "11100"
                        ? "border-[#AC246B] bg-[#AC246B]"
                        : "border-gray-300"
                    }`}
                  >
                    {topping == "11100" && (
                      <FiCheck className="text-white w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Patron Life Member
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Premium Membership Plan
                    </p>
                    <p className="text-2xl font-bold text-[#AC246B]">
                      ₹11,100.00
                    </p>
                    <p className="text-sm text-gray-700 mt-1 flex flex-col items-start">
                      <span>Entry Fee: ₹100.00 +</span>{" "}
                      <span>Membership: ₹11,000.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSignUp;
