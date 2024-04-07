import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import InputComponent from "./InputComponent.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import {
  emailValidityCheck,
  passwordValidityCheck,
} from "@/utils/InputValidationLogic.js";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state/user/userSlice.js";
import Dropzone from "react-dropzone";

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [enteredValues, setEnteredValues] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    email: "",
    password: "",
    picture: "",
  });

  const [didEdit, setDidEdit] = useState({
    firstName: false,
    lastName: false,
    location: false,
    occupation: false,
    email: false,
    password: false,
  });

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => {
      return {
        ...prevValues,
        [identifier]: value,
      };
    });
  };

  const handleInputBlur = (identifier) => {
    setDidEdit((prevValues) => {
      return { ...prevValues, [identifier]: true };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // get formdata to submit files along with JSON entered values
    const formData = new FormData();
    for (const key in enteredValues) {
      formData.append(key, enteredValues[key]);
    }
    formData.append("picturePath", enteredValues.picture.name);

    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

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
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
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

  const emailError = !emailValidityCheck(enteredValues.email) && didEdit.email;
  const passwordError =
    !passwordValidityCheck(enteredValues.password) && didEdit.password;
  const firstNameError = enteredValues.firstName == "" && didEdit.firstName;
  const lastNameError = enteredValues.lastName == "" && didEdit.lastName;
  const locationError = enteredValues.location == "" && didEdit.location;
  const occupationError = enteredValues.occupation == "" && didEdit.occupation;

  return (
    <>
      {/* form container */}
      <div className="min-h-screen flex justify-center md:items-center my-10 md:my-0 bg-zinc-50 md:pt-10">
        <form className="flex flex-col gap-12 shadow-xl rounded-xl w-full sm:w-3/4 md:w-2/3 p-12 bg-white">
          {/* login form */}
          <div className="flex flex-col w-full gap-8 ">
            {/* form heading */}

            <div className="w-full">
              <div className="text-3xl md:text-5xl font-bold">Register</div>
              <div className="opacity-70 text-sm">Register to Devstagram!</div>
            </div>

            {/* form fields */}
            <div className="flex flex-col gap-6">
              {/* name */}
              <div className="w-full flex flex-col md:flex-row gap-6">
                <InputComponent
                  label="First Name"
                  error={firstNameError}
                  placeholder=""
                  id="firstName"
                  type="text"
                  onChange={(event) =>
                    handleInputChange("firstName", event.target.value)
                  }
                  onBlur={() => handleInputBlur("firstName")}
                />
                <InputComponent
                  label="Last Name"
                  error={lastNameError}
                  placeholder=""
                  id="lastName"
                  type="text"
                  onChange={(event) =>
                    handleInputChange("lastName", event.target.value)
                  }
                  onBlur={() => handleInputBlur("lastName")}
                />
              </div>
              {/* location */}
              <InputComponent
                label="Location"
                id="location"
                type="text"
                error={locationError}
                placeholder=""
                onChange={(event) =>
                  handleInputChange("location", event.target.value)
                }
                onBlur={() => handleInputBlur("location")}
              />
              {/* Occupation */}
              <InputComponent
                label="Occupation"
                id="occupation"
                type="text"
                placeholder=""
                onChange={(event) =>
                  handleInputChange("occupation", event.target.value)
                }
                onBlur={(event) =>
                  handleInputBlur("occupation", event.target.value)
                }
                error={occupationError}
              />
              {/* Choose a picture */}
              <Dropzone
                multiple={false}
                onDrop={(acceptedFiles) => {
                  handleInputChange("picture", acceptedFiles[0]);
                  console.log(acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps, isFocused }) => (
                  <div
                    {...getRootProps()}
                    className={
                      isFocused
                        ? "border border-blue-600 border-dashed p-4 rounded-xl flex justify-between"
                        : "border border-black border-dashed p-4 rounded-xl flex justify-between"
                    }
                  >
                    {enteredValues.picture === "" ? (
                      <label className="text-sm opacity-60">
                        Please choose an image for your avatar
                      </label>
                    ) : (
                      <label className="text-sm">
                        {enteredValues.picture.name}
                      </label>
                    )}

                    <input {...getInputProps()} name="picture" />
                    <button onClick={() => handleInputChange("picture", "")}>
                      <FontAwesomeIcon icon={faXmarkSquare} className="xl" />
                    </button>
                  </div>
                )}
              </Dropzone>
              {/* Email */}
              <InputComponent
                label="Email"
                id="email"
                type="email"
                placeholder=""
                onChange={(event) =>
                  handleInputChange("email", event.target.value)
                }
                onBlur={() => handleInputBlur("email")}
                error={emailError}
              />
              {/* Password */}
              <InputComponent
                label="Password"
                id="password"
                type="password"
                placeholder=""
                onChange={(event) =>
                  handleInputChange("password", event.target.value)
                }
                onBlur={() => handleInputBlur("password")}
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
                      <span>Signing up</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="w-full bg-slate-800 hover:bg-slate-700"
                      type="button"
                      onClick={async (e) => {
                        if (
                          emailError ||
                          passwordError ||
                          enteredValues.email === "" ||
                          enteredValues.password === ""
                        ) {
                          toast({
                            variant: "destructive",
                            title: "Cannot submit the form",
                            description:
                              "Please fill the input fields correctly",
                            action: (
                              <ToastAction altText="Try again">
                                Try again
                              </ToastAction>
                            ),
                          });
                        } else if (enteredValues.picture === "") {
                          toast({
                            variant: "destructive",
                            title: "Avatar missing!",
                            description:
                              "Please select a valid image for your avatar",
                            action: (
                              <ToastAction altText="Try again">
                                Try again
                              </ToastAction>
                            ),
                          });
                        } else {
                          await handleSubmit(e);
                          navigate("/home");
                        }
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}

                <Link
                  className="text-sm opacity-70 hover:opacity-100 cursor-pointer border-b border-white hover:border-black transition duration-200 max-w-max"
                  to={"/login"}
                >
                  Already have an account, login now!
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
