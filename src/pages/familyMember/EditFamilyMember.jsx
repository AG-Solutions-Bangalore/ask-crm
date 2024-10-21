import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { Button, Input } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
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

const EditFamilyMember = () => {
  const [familymember, setFamilyMember] = useState({
    family_member_name: "",
    family_member_gender: "",
    family_member_dob: "",
    family_member_relation: "",
    family_member_qualification: "",
    family_member_occupation: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: BASE_URL + "/api/fetch-web-family-member-data/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setFamilyMember(res.data.familydata);
    });
  }, []);

  const onInputChange = (e) => {
    setFamilyMember({
      ...familymember,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
      return;
    }

    const data = {
      family_member_name: familymember.family_member_name,
      family_member_gender: familymember.family_member_gender,
      family_member_dob: familymember.family_member_dob,
      family_member_relation: familymember.family_member_relation,
      family_member_qualification: familymember.family_member_qualification,
      family_member_occupation: familymember.family_member_occupation,
    };

    axios({
      url: BASE_URL + "/api/update-web-family-member/" + id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Family Member Updated ");
        navigate("/family-member");
      } else {
        toast.error(error);
      }
    });
  };

  return (
    <Layout>
      <div className="  bg-gray-50 mt-5">
        <div className="w-full  bg-white p-4 rounded-lg shadow-lg">
          <form id="addIndiv" autoComplete="off" className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Update Family Member Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Input
                  name="family_member_name"
                  required
                  onChange={(e) => onInputChange(e)}
                  value={familymember.family_member_name}
                  label="Member Name"
                  className="w-full p-3 text-sm text-gray-700 rounded-lg border border-gray-300  "
                />
              </div>

              <div>
                <Input
                  name="family_member_relation"
                  required
                  onChange={(e) => onInputChange(e)}
                  value={familymember.family_member_relation}
                  label="Relation"
                  className="w-full p-3 text-sm text-gray-700 rounded-lg border border-gray-300  "
                />
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">
                    <span className="text-sm">
                      Gender <span className="text-red-600">*</span>
                    </span>
                  </InputLabel>
                  <Select
                    sx={{ height: "40px", borderRadius: "5px" }}
                    labelId="service-select-label"
                    id="service-select"
                    name="family_member_gender"
                    label="Gender"
                    value={familymember.family_member_gender}
                    onChange={(e) => onInputChange(e)}
                    required
                  >
                    {gender.map((option) => (
                      <MenuItem key={option.value} value={String(option.label)}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <Input
                  name="family_member_dob"
                  required
                  id="datefield"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onInputChange(e)}
                  value={familymember.family_member_dob}
                  label="DOB"
                  className="w-full p-3 text-sm text-gray-700 rounded-lg border border-gray-300  "
                />
              </div>

              <div>
                <Input
                  name="family_member_qualification"
                  onChange={(e) => onInputChange(e)}
                  value={familymember.family_member_qualification}
                  label="Qualification"
                  className="w-full p-3 text-sm text-gray-700 rounded-lg border border-gray-300  "
                />
              </div>

              <div>
                <Input
                  name="family_member_occupation"
                  onChange={(e) => onInputChange(e)}
                  value={familymember.family_member_occupation}
                  label="Occupation"
                  className="w-full p-3 text-sm text-gray-700 rounded-lg border border-gray-300  "
                />
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-8">
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg"
                onClick={(e) => onUpdate(e)}
              >
                Update
              </Button>

              <Link to="/family-member">
                <Button
                  fullWidth
                  size="large"
                  type="button"
                  variant="contained"
                  className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded-lg"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditFamilyMember;
