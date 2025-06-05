import React, { use } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Auth } from "/src/Firebase/firebase.init";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import loginAnim from "../../assets/Animation/login_animation.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const googleProvider = new GoogleAuthProvider();
  const { loginWithEmail } = use(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    loginWithEmail(email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toast.success("Login Successfully!")
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleGoogle = () => {
    signInWithPopup(Auth, googleProvider)
      .then((result) => {
        const user = result.user;
        toast.success("Google Sign in Successfully");
      })
      .then((error) => {
        const errorMessage = error.message;
      });
  };

  return (
    <section className="flex flex-col md:flex-row justify-center  items-center">
      {/* Col */}
      <div className="bg-white/0 lg:block  rounded-l-lg">
        <Lottie
          animationData={loginAnim}
          loop={true}
          style={{ background: "transparent" }}
        ></Lottie>
      </div>

      <div className="bg-white w-full md:max-w-md   md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center ">
        <div className="w-full h-full">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form className="mt-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="on"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="pass"
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <button
            onClick={handleGoogle}
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              <FcGoogle size={23} />
              <span className="ml-4">Log in with Google</span>
            </div>
          </button>

          <p className="mt-8">
            Need an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
    </section>
  );
};

export default Login;
