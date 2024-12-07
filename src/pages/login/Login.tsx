import { Link, useNavigate } from "react-router";
import Logo from "../../components/logo/Logo";
import { FieldError, useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCookie } from "../../features/cookie/cookieSlice";
import Cookies from "js-cookie";

interface Login {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveCookies = (sessionid: string) => {
    dispatch(setCookie(sessionid));
  };

  const onSubmit = async (data: Login) => {
    console.log(data);
    try {
      const response: { data: { sessionid: string } } = await axios.post(
        `${import.meta.env.VITE_API_LINK}auth/`,
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      Cookies.set("sessionId", response.data.sessionid);

      handleSaveCookies(response.data.sessionid);
      navigate("/", { replace: true });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="bg-blackBg h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full bg-blackLight rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0 border border-blackBorder">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  {...register("username")}
                  id="username"
                  className="bg-blackLight border border-white text-white rounded-lg focus:ring-orange focus:border-orange block w-full p-2.5"
                  placeholder="username"
                  required
                />
              </div>
              <p className="text-red-500 text-sm mt-2">
                {(errors.username as FieldError)?.message}
              </p>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Is required!",
                    maxLength: { value: 127, message: "Too Long" },
                    minLength: { value: 6, message: "Too short" },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-blackLight border border-white text-white rounded-lg focus:ring-orange focus:border-orange block w-full p-2.5"
                />
                <p className="text-red-500 text-sm mt-2">
                  {(errors.password as FieldError)?.message}
                </p>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-blackBorder rounded bg-blackLight focus:ring-orange text-orange"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-400">
                      Remember me
                    </label>
                  </div>
                </div>
                <a className="text-sm font-medium text-orangeLight hover:underline">
                  Forgot password?
                </a>
              </div> */}

              <button
                type="submit"
                className="w-full text-white bg-orange hover:bg-orangeLight focus:ring-4 focus:outline-none focus:ring-orange font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{" "}
                <Link to={"/sign"}>
                  <span className="font-medium text-orangeLight hover:underline">
                    Sign up
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
