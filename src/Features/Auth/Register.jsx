import Lottie from "lottie-react";
import React, { use, useState } from "react";
import { Link } from "react-router";
import loginAnim from "../../assets/Animation/login_animation.json";
import { AuthContext } from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { createAccount } = use(AuthContext);



  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newData = Object.fromEntries(formData.entries());
    const { name, email, password, cPassword, photoUrl } = newData;

    if (password !== cPassword) {
      setErrorMessage("Password do not match");
      return;
    }

    try {
      const userCredential = await createAccount(email, password);
      const user = userCredential.user;

      // update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      });
      toast.success("Account create successfully.");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center  px-6 my-12">
        {/* Row */}
        <div className="w-full  flex gap-5">
          {/* Col */}
          <div className="bg-white/0  bg-cover rounded-l-lg">
            <Lottie
              animationData={loginAnim}
              loop={true}
              style={{ background: "transparent" }}
            ></Lottie>
          </div>
          {/* Col */}
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
            <form
              onSubmit={handleSignup}
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
            >
              <div className="mb-4">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="firstName"
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    name="name"
                    placeholder="Enter Name "
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Photo Url
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  name="photoUrl"
                  type="text"
                  placeholder="Photo url..."
                />
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="password"
                    type="password"
                    placeholder="******************"
                  />
                  <p className="text-xs italic text-red-500">{errorMessage}</p>
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="c_password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    name="cPassword"
                    type="password"
                    placeholder="******************"
                  />
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register Account
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                Already have an account?
                <Link
                  to={"/login"}
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
    </div>
  );
};

export default Register;
