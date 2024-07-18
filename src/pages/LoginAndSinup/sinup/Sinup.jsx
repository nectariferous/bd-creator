import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaEyeSlash, FaEye } from "react-icons/fa";

import useContexts from "../../../hooks/useContexts";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Sinup = () => {
  // we used react hook form package. and handle form with that.
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // import the all function from authProvider and call it here.
  const { handleSinup, updateUserProfile, handleGoogleSinin } = useContexts();

  const navigate = useNavigate();

  // this is only for login with email.
  const onSubmit = (data) => {
    // destructure the current form data
    const { name, email, password } = data;

    // call the handleSinup function and create a user in the firebase
    handleSinup(email, password)
      .then(async (result) => {
        // update the current user name and photo url
        updateUserProfile(name);
        console.log(result.user);
        navigate("/dashboard/create-nid");
        const response = await axios.post(
          `https://telent-finder.vercel.app/api/v1/set-payments?email=${result.user.email}`,
          {
            userEmail: result.user.email,
            amount: 0,
          }
        );
        console.log(response);
        if (response.data.success) {
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => console.error(err));
  };
  // when you will login with the google. this function will take your information and post it in database with post method. After login, you wil redirect to the home page.
  const handleGoogleLogin = async () => {
    // call the handleGoogleSinin function there and create a google sin up user in our database
    handleGoogleSinin()
      .then(async (result) => {
        console.log(result.user);
        const response = await axios.post(
          `https://telent-finder.vercel.app/api/v1/set-payments?email=${result.user.email}`,
          {
            userEmail: result.user.email,
            amount: 0,
          }
        );
        navigate("dashboard/create-nid");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="hero min-h-screen pt-16">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div
          data-aos="fade-right"
          className="card flex-shrink-0 p-4 w-full max-w-md shadow-2xl border "
        >
          <button
            // this function for google login. if you want to login with google. you can do that
            onClick={handleGoogleLogin}
            className=" btn-nav flex mt-4  gap-4 w-full items-center justify-center"
          >
            <img
              src="https://assets.setmore.com/website/v2/images/icons/icon-google.svg"
              className="h-6 w-6"
              alt=""
            />
            Continue with google
          </button>

          <div className="divider">OR</div>
          {/* handle submit function */}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="form-control">
              <label className="label">
                <span className="">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="your name"
                className="input input-bordered"
              />
            </div>
            {errors.name?.type === "required" && (
              <p className="text-red-500">name is required</p>
            )}

            <div className="form-control">
              <label className="label">
                <span className="">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="your email"
                className="input input-bordered"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            <div className="form-control">
              <label className="label">
                <span className="">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  placeholder="password"
                  className="input input-bordered  w-full"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500">password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                password must be atlist 6 charectar
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500">
                Password is smaller then 20 charectar
              </p>
            )}

            <div className="form-control">
              <label className="label">
                <span className="">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirm-password", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                  placeholder="confirm-password"
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {errors["confirm-password"]?.type === "required" && (
              <p className="text-red-500">Confirm password is required</p>
            )}
            {errors["confirm-password"]?.type === "validate" && (
              <p className="text-red-500">
                Password must match the previous password
              </p>
            )}
            <div className="form-control mt-6">
              {/* submit button for email login */}
              <button className="btn-primary flex  gap-4 w-full items-center justify-center">
                Sing up
                <FaSignInAlt />{" "}
              </button>
            </div>
          </form>
          <p className="mx-4">
            Have An Account Please
            <Link to={"/"}>
              <button className="btn btn-link card-text-secondary">
                Login{" "}
              </button>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sinup;
