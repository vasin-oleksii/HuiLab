import { Link } from "react-router";
import Logo from "../../components/logo/Logo";
import LeftSign from "./leftSign/LeftSign";
import { FieldError, useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: RegisterRequest) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LINK}register/`,
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // useEffect(() => {
  //   onSubmit({
  //     username: "4erf21ew",
  //     email: "use3er@exa1mple.com",
  //     password: "string10",
  //     password2: "string10",
  //   });
  // }, []);

  return (
    <>
      <div className="font-[sans-serif] bg-blackBg flex items-center md:h-screen p-4 flex-col justify-center">
        <Logo />
        <div className="w-full max-w-4xl max-md:max-w-xl mx-auto">
          <div className="bg-blackLight grid md:grid-cols-2 gap-16 w-full sm:p-8 p-6 shadow-md rounded-md overflow-hidden">
            <LeftSign />
            {/* @ts-ignore  */}
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8">
                <h3 className="text-white text-2xl font-bold">Register</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-white text-sm mb-2 block">Name</label>

                  <input
                    type="text"
                    className=" border  w-full text-sm text-white pl-4 py-2.5 rounded-md outline-white border-white bg-blackLight"
                    placeholder="Enter name"
                    {...register("username", {
                      required: "Is required!",
                      maxLength: { value: 127, message: "Too Long" },
                      minLength: { value: 3, message: "Too short" },
                    })}
                  />
                  {
                    <p className="text-red-500 text-sm mt-2">
                      {(errors.name as FieldError)?.message}
                    </p>
                  }
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">Email</label>
                  <input
                    {...register("email")}
                    className=" border w-full text-sm text-white pl-4 py-2.5 rounded-md outline-white border-white bg-blackLight"
                    placeholder="Enter email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {
                    <p className="text-red-500 text-sm mt-2">
                      {(errors.email as FieldError)?.message}
                    </p>
                  }
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      minLength: { value: 8, message: "Minimum 8 symbols" },
                      required: "Password is required",
                      validate: (value) =>
                        value === watch("password2") || "Password must match",
                    })}
                    name="password"
                    type="password"
                    required
                    className=" border  w-full text-sm text-white pl-4 py-2.5 rounded-md outline-white border-white bg-blackLight"
                    placeholder="Enter password"
                  />
                  <p className="text-red-500 text-sm mt-2">
                    {(errors.password as FieldError)?.message}
                  </p>
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Password Again
                  </label>
                  <input
                    {...register("password2", {
                      minLength: { value: 8, message: "Minimum 8 symbols" },
                      required: "Password is required",
                      validate: (value) =>
                        value === watch("password") || "Password must match",
                    })}
                    name="password2"
                    type="password"
                    required
                    className=" border  w-full text-sm text-white pl-4 py-2.5 rounded-md outline-white border-white bg-blackLight"
                    placeholder="Enter password again"
                  />
                  <p className="text-red-500 text-sm mt-2">
                    {(errors.password2 as FieldError)?.message}
                  </p>
                </div>
                {/* <div className="flex items-center">
                  <input
                    {...register("rememberMe", {
                      required: "You need to be checked",
                    })}
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-orange focus:ring-orange border-blackBorder rounded-md"
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-white ml-3 block text-sm"
                  >
                    I accept the{" "}
                    <a
                      href="javascript:void(0);"
                      className="text-orangeLight font-semibold hover:underline ml-1"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  <p className="text-red-500 text-sm mt-2">
                    {(errors.rememberMe as FieldError)?.message}
                  </p>
                </div> */}
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm tracking-wider font-semibold rounded-md bg-orange hover:bg-orangeLight text-white focus:outline-none"
                >
                  Create Account
                </button>
              </div>
              <p className="text-white text-sm mt-6 text-center">
                Already have an account?{" "}
                <Link to="/login">
                  <div className="text-orangeLight font-semibold hover:underline ml-1">
                    Login here
                  </div>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
