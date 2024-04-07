import React, { useState } from "react";
import Input from "./InputComponent.jsx";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import loginSvg from "../../assets/login-svg.svg";
import {
  emailValidityCheck,
  passwordValidityCheck,
} from "@/utils/InputValidationLogic.js";
import { useDispatch } from "react-redux";
import userSlice, { setLogin, setPosts } from "@/state/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // sending a login request to the server
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredValues.email,
          password: enteredValues.password,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      // check if the response return has no errors
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      dispatch(
        setLogin({ user: responseData.user, token: responseData.token })
      );

      // getting all posts
      const posts = await getAllPosts();
      dispatch(setPosts({ posts: posts }));

      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      setIsError(
        error.message || "Something went wrong! please try again later."
      );
    }
  };

  const getAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/posts/feed", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      return responseData.posts;
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = async (identifier, value) => {
    setEnteredValues((prevValue) => {
      return {
        ...prevValue,
        [identifier]: value,
      };
    });
  };

  const handleInputBlur = async (identifier) => {
    setDidEdit((prevValue) => {
      return {
        ...prevValue,
        [identifier]: true,
      };
    });
  };

  // email and password error
  const emailError = !emailValidityCheck(enteredValues.email) && didEdit.email;
  const passwordError =
    !passwordValidityCheck(enteredValues.password) && didEdit.password;

  return (
    <>
      {/* form container */}
      <div className="min-h-screen flex justify-center bg-zinc-50">
        <form className="flex flex-col lg:flex-row gap-10 shadow-xl rounded-xl w-full lg:w-4/5 p-10 items-center bg-white lg:my-10">
          {/* svg form image */}
          <img src={loginSvg} alt="login-svg" className="w-96" />

          {/* login form */}
          <div className="flex flex-col w-full lg:w-1/2 gap-8">
            {/* form heading */}
            <div className="w-full">
              <div className="text-3xl lg:text-5xl font-bold">Login</div>
              <div className="opacity-70 text-sm">Login to Devstagram!</div>
            </div>
            {/* form fields */}
            <div className="flex flex-col gap-6">
              {/* Email */}
              <Input
                label="Email"
                id="email"
                type="email"
                placeholder=" "
                onChange={(event) => {
                  handleInputChange("email", event.target.value);
                }}
                onBlur={() => {
                  handleInputBlur("email");
                }}
                error={emailError}
              />
              {/* Password */}
              <Input
                label="Password"
                id="password"
                type="password"
                placeholder=" "
                onChange={(event) => {
                  handleInputChange("password", event.target.value);
                }}
                onBlur={() => {
                  handleInputBlur("password");
                }}
                error={passwordError}
              />
              {/* submit button */}
              <div className="w-full flex flex-col gap-2">
                {isLoading ? (
                  <>
                    <Button
                      className="w-full bg-slate-800 hover:bg-slate-700"
                      disabled
                    >
                      <svg
                        className="mr-3 h-6 w-6 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Logging in</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full bg-slate-800 hover:bg-slate-700"
                    type="button"
                    onClick={(e) => {
                      if (
                        emailError ||
                        passwordError ||
                        enteredValues.email === "" ||
                        enteredValues.password === ""
                      ) {
                        toast({
                          variant: "destructive",
                          title: "Cannot submit the form",
                          description: "Please fill the input fields correctly",
                          action: (
                            <ToastAction altText="Try again">
                              Try again
                            </ToastAction>
                          ),
                        });
                      } else {
                        handleSubmit(e);
                      }
                    }}
                  >
                    Login
                  </Button>
                )}

                <Link
                  className="text-sm opacity-70 hover:opacity-100 cursor-pointer border-b border-white hover:border-black transition duration-200 max-w-max"
                  to={"/"}
                >
                  Don't have an account, register now!
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
