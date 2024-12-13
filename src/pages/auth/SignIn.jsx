import {
  Input,
  Checkbox,
  Button,
  Typography,
  Carousel,
} from "@material-tailwind/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { ContextPanel } from "../../utils/ContextPanel";
import { toast } from "react-toastify";
const SignIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const [showButtonotp, setshowButtonotp] = useState(false);
  const [showButtonsubmit, setshowButtonSubmit] = useState(true);
  const navigate = useNavigate();
  const emailInputRef = useRef(null)


  useEffect(()=>{
    if(emailInputRef.current){
      emailInputRef.current.focus()
    }
  },[])
 

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "username") {
      if (validateOnlyDigits(e.target.value)) {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onCheckMobile = async (e) => {
    e.preventDefault();

    setLoading(true);

    //create a formData object and append state values
    const data = {
      username: user.username,
    };

    try {
      // Send POST request to login API with form data
      const res = await axios.post(`${BASE_URL}/api/web-check-mobile-no`, data);

      if (res.data.code == "400") {
        toast.error("Mobile No is not Registered");
        setshowButtonotp(false);
        setshowButtonSubmit(true);
      } else {
        toast.success("OTP Sent to Mobile No.");
        setshowButtonotp(true);
        setshowButtonSubmit(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    }

    setLoading(false);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    setLoading(true);

    //create a formData object and append state values
    const data = {
      username: user.username,
      password: user.password,
    };

    try {
      // Send POST request to login API with form data
      const res = await axios.post(`${BASE_URL}/api/web-login`, data);

      if (res.status == "200") {
        const token = res.data.UserInfo?.token;
        const agrawal_image = res.data.UserInfo?.user.agrawal_image;
        const name = res.data.UserInfo?.user.name;
        const user_type_id = res.data.UserInfo?.user.user_type_id;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("agrawal_image", agrawal_image);
          localStorage.setItem("name", name);
          localStorage.setItem("user_type_id", user_type_id);
          navigate("/home");
        } else if (res.data.code == "401") {
          toast.error("Username or password is incorrect");
        } else if (res.data.code == "402") {
          toast.error("User is inactive");
        }
      } else {
        toast.error("Login Failed, Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    }

    setLoading(false);
  };
  return (
    <>
      <section className="flex flex-col lg:flex-row h-screen">
        <div className="hidden  lg:block lg:w-1/2 h-full">
          <Carousel autoplay loop>
            <img
              src="https://agrawalsamaj.co/assets/web_assets/image/top_slider/slider3.jpg"
              alt="Slide 1"
              className="h-full w-full object-cover"
            />
            <img
              src="https://agrawalsamaj.co/assets/web_assets/image/top_slider/slider2.jpg"
              alt="Slide 2"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>

        <div className="flex-1 flex items-center bg-blue-50 justify-center px-4 lg:px-8 py-12 h-full lg:w-1/2">
          <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg  shadow-blue-500 ">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                <p className="text-xs mt-4 text-[#002D74]">
                  If you are already a member, easily log in
                </p>
              </div>
              <img
                src="../img/logo.png"
                alt="RK Cylinder Logo"
                className="h-14 w-auto rounded-lg  "
              />
            </div>
            {showButtonsubmit ? (
              <form
                onSubmit={onCheckMobile}
                method="POST"
                className="mt-8 mb-2 w-full"
              >
                <div className="mb-6 flex flex-col gap-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-3 font-medium"
                  >
                    Mobile No
                  </Typography>
                  <Input
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={(e) => onInputChange(e)}
                    size="lg"
                    placeholder="123456"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    inputRef={emailInputRef}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white"
                  fullWidth
                >
                  {loading ? "Sending..." : "Send Otp"}
                </Button>
                <div className="flex justify-start gap-1 items-center mt-2">
                <p className="text-gray-600  text-sm">Not a Member?</p> 
                <Link to='/register'>
                <span className="text-blue-400 text-sm font-bold">Sign Up</span>
                </Link>
                </div>
              </form>
            ) : (
              ""
            )}
            {showButtonotp ? (
              <form
                onSubmit={handleSumbit}
                method="POST"
                className="mt-8 mb-2 w-full"
              >
                <div className="mb-6 flex flex-col gap-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-3 font-medium"
                  >
                    OTP
                  </Typography>
                  <Input
                    id="password"
                    type="password"
                    value={user.password}
                    name="password"
                    onChange={(e) => onInputChange(e)}
                    size="lg"
                    placeholder="*****"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
            
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 text-white"
                  fullWidth
                >
                  {loading ? "Login..." : "Login"}
                </Button>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
