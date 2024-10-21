import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
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

      if (res.status == '200') {
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
        } else if(res.data.code =='401') {
          toast.error("Username or password is incorrect");
        } else if(res.data.code =='402'){
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
     
      <section className="flex flex-col lg:flex-row min-h-screen">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        {showButtonsubmit ? (
          <div className="flex-1 lg:w-3/5 m-4 lg:m-12  px-4 lg:px-8">
            <form
              onSubmit={onCheckMobile}
              method="POST"
              className="mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4"
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
                />
              </div>

              <Button
                type="sumbit"
                disabled={loading}
                className="mt-6"
                fullWidth
              >
                {loading ? "Sending..." : "Send Otp"}
              </Button>

              <Typography
                variant="paragraph"
                className="text-center text-blue-gray-500 font-medium mt-4"
              >
                Not registered?
                <Link to="/register" className="text-gray-900 ml-1">
                  Create account
                </Link>
              </Typography>
            </form>
          </div>
        ) : (
          ""
        )}
        {showButtonotp ? (
          <div className="flex-1 lg:w-3/5 m-4 lg:m-12  px-4 lg:px-8">
            <form
              onSubmit={handleSumbit}
              method="POST"
              className="mt-8 mb-2 mx-auto w-full max-w-md lg:w-3/4"
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
                  placeholder="123456"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
              </div>

              <Button
                type="sumbit"
                disabled={loading}
                className="mt-6"
                fullWidth
              >
                {loading ? "Login..." : "Login"}
              </Button>

              <Typography
                variant="paragraph"
                className="text-center text-blue-gray-500 font-medium mt-4"
              >
                Not registered?
                <Link to="/register" className="text-gray-900 ml-1">
                  Create account
                </Link>
              </Typography>
            </form>
          </div>
        ) : (
          ""
        )}

        <div className="w-full lg:w-2/5 h-auto lg:h-full hidden  lg:block">
          <img
            src="/img/pattern.png"
            className="h-full max-h-screen w-full object-cover  rounded-none"
            alt="Sign In Background"
          />
        </div>
      </section>
    </>
  );
};

export default SignIn;
