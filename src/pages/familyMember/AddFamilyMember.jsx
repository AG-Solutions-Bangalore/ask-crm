import { useState } from "react";
import { Button, Card, IconButton, Input } from "@material-tailwind/react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";

const AddFamilyMember = () => {
  const [users, setUsers] = useState([
    {
      family_member_name: "",
      family_member_relation: "",
      family_member_gender: "",
      family_member_dob: "",
      family_member_qualification: "",
      family_member_occupation: "",
    },
  ]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate()
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

  const onChange = (e, index) => {
    const { name, value } = e.target;
    const updatedUsers = [...users];
    updatedUsers[index][name] = value;
    setUsers(updatedUsers);
  };

  const addItem = () => {
    setUsers([
      ...users,
      {
        family_member_name: "",
        family_member_relation: "",
        family_member_gender: "",
        family_member_dob: "",
        family_member_qualification: "",
        family_member_occupation: "",
      },
    ]);
    setCount(count + 1);
  };

  const removeUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    setCount(count - 1);
  };

 

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        no_of_family: count,
        userfamily_sub_data:users,
    };
  const form = document.getElementById("addIndiv");
  if(!form.checkValidity()){
    toast.error("Fill all required")
    return
  }

    axios({
      url: BASE_URL + "/api/create-web-family-member",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == "200") {
        toast.success("Add Family Member");
        
        navigate("/family-member");
      } else {
        toast.error("duplicate entry");
      }
    });
  };

  return (
    <Layout>
      <div className="w-full flex justify-center p-4">
        <div className="w-full ">
          <Card className="shadow-lg">
            <div className="p-6">
              <form id="addIndiv" autoComplete="off" onSubmit={onSubmit}>
              <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Add Family Member Details
            </h2>
                <div className="space-y-4">
                  {users.map((user, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap gap-4 mt-4 items-center"
                    >
                      <div className="w-full lg:w-40">
                        <TextField
                          name="family_member_name"
                          required
                          onChange={(e) => onChange(e, index)}
                          value={user.family_member_name}
                          label="Member Name"
                          inputProps={{
                            sx: {
                              height: "0.35rem",
                            },
                          }}
                          sx={{}}
                     
                        />
                      </div>
                      <div className="w-full lg:w-40">
                        <TextField
                          name="family_member_relation"
                          required
                          inputProps={{
                            sx: {
                              height: "0.35rem",
                            },
                          }}
                          onChange={(e) => onChange(e, index)}
                          value={user.family_member_relation}
                          label="Relation"
                        />
                      </div>
                      <div className="w-full lg:w-40">
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
                            name="family_member_gender"
                            onChange={(e) => onChange(e, index)}
                            value={user.family_member_gender}
                            label="Gender *"
                            required
                          >
                            {gender.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={String(option.value)}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="w-full lg:w-40">
                        <TextField
                          fullWidth
                          name="family_member_dob"
                          required
                          type="date"
                          id="datefield"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            sx: {
                              height: "0.35rem",
                            },
                          }}
                          label="DOB"
                          onChange={(e) => onChange(e, index)}
                          value={user.family_member_dob}
                          className="border rounded-md w-full p-2"
                        />
                      </div>
                      <div className="w-full lg:w-40">
                        <TextField
                          name="family_member_qualification"
                          onChange={(e) => onChange(e, index)}
                          value={user.family_member_qualification}
                          label="Qualification"
                          inputProps={{
                            sx: {
                              height: "0.35rem",
                            },
                          }}
                        />
                      </div>
                      <div className="w-full lg:w-40 ">
                        <TextField
                          name="family_member_occupation"
                          onChange={(e) => onChange(e, index)}
                          value={user.family_member_occupation}
                          inputProps={{
                            sx: {
                              height: "0.35rem",
                            },
                          }}
                          label="Occupation"
                        />
                      </div>
                      <div className="w-full lg:w-auto">
                        <IconButton
                          onClick={() => removeUser(index)}
                          className="text-red-500"
                        >
                          <FaTrash />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-center space-x-4">
                  <Button
                    className="bg-blue-500 w-full lg:w-auto"
                    onClick={addItem}
                  >
                    Add More
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-500 w-full lg:w-auto"
                  >
                    Submit
                  </Button>
                  <Link to="/family-member">
                    <Button className="bg-gray-500 w-full lg:w-auto">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AddFamilyMember;
