import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useUserContext } from "../../context/UserProvider";
import app_config from "../../config";

const Signup = () => {
  const navigate = useNavigate();
  const url = app_config.backend_url;

  const [avatar, setAvatar] = useState("");
  // 1. Create a form object which should match with model fields
  const userForm = {
    username: "",
    email: "",
    contact: "",
    password: "",
  };

  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  // Signin with google
  const [user, setUser] = useState({});
  const saveGoogleUser = async (googleObj) => {
    setAvatar(googleObj.picture);
    const response = await fetch(url + "/user/add", {
      method: "POST",
      body: JSON.stringify({
        username: googleObj.name,
        email: googleObj.email,
  avatar: googleObj.picture,
  createdAt: new Date(),
  type : 'google'
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log(response.status);
      const data = await response.json();
      // console.log("data saved");
      sessionStorage.setItem("user", JSON.stringify(data));
      setLoggedIn(true);

      
      const response2 = await fetch(url + "/webpage/add", {
        method: "POST",
        body: JSON.stringify({
          title: "",
          description: "",
          type: "",
          user: data._id,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response2.status === 200) console.log("page created");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registered successfully!!",
      });

      navigate("/home");
    } else if (response.status) {
      console.log(response.status);
      console.log("something went wrong");
      Swal.error({
        icon: "error",
        title: "OOPS",
        text: "!! something went wrong!!",
      });
    }
  }

  const handleCallbackResponse = async (response) => {
    // console.log("Encoded jwt id token:" + response.credential);
    var userObject = jwt_decode(response.credential);
        // console.log(userObject);
    setUser(userObject);
    // setAvatar(userObject.picture);
    //after signin the button of "signin with google" hides
    document.getElementById("signInDiv").hidden = true;

    const res = await fetch(url + "/user/checkemail/" + userObject.email);
    if (res.status === 200) {
      const data = await res.json();
      sessionStorage.setItem("user", JSON.stringify(data));
      setLoggedIn(true);
      navigate("/");
    } else {
      saveGoogleUser(userObject);
    }
  };

  const { setLoggedIn } = useUserContext();
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "941149713723-22urp8pss6cdudmhnf9007ak61t6t68j.apps.googleusercontent.com",
      callback: handleCallbackResponse, //token visible
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt(); //enable prompt
  }, []);
  //If we h

  // 2. Create a function for form submission

  const userSubmit = async (formdata, { resetForm }) => {
    console.log(formdata);
    const response = await fetch("http://localhost:5000/user/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      console.log(response.status);
      console.log("data saved");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registered successfully!!",
      });
      resetForm();
      // navigate("/main/login");
      navigate("/main/signin");
    } else {
      console.log(response.status);
      console.log("something went wrong");
      Swal.error({
        icon: "error",
        title: "OOPS",
        text: "!! something went wrong!!",
      });
    }
  };

  //   3. use Formik component

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short Username!")
      .max(20, "Too Long Username!")
      .required("Username is Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required"),
  });

  return (
    <section class="vh-100">
      <div class="container py-5 ">
        {/* <div class="row"></div> */}
        <div class="card" style={{ width: "100%" }}>
          <div class="row 0-g">
            <div class="col-md-6 col-sm-6 quote-bg" id="img">
              <div className="login-bg"></div>
            </div>

            <div class="col-md-6 col-sm-6 ">
              <div class="card-body">
                <h1 class="mt-5 mb-5">Signup Here</h1>
                <Formik
                  initialValues={userForm}
                  onSubmit={userSubmit}
                  validationSchema={formSchema}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="Username"
                        variant="outlined"
                        className="w-100 mb-4"
                        id="username" // name can also used
                        onChange={handleChange}
                        value={values.username} // value passed above
                        helperText={errors.username}
                        error={Boolean(errors.username && touched.username)}
                      />
                      <TextField
                        label="Email"
                        variant="outlined"
                        className="w-100 mb-4"
                        id="email"
                        onChange={handleChange}
                        value={values.email}
                        helperText={touched.email ? errors.email : ""}
                        error={Boolean(errors.email && touched.email)}
                      />
                      <TextField
                        label="Password"
                        variant="outlined"
                        className="w-100 mb-4"
                        id="password"
                        type="password"
                        onChange={handleChange}
                        value={values.password}
                        helperText={touched.password ? errors.password : ""}
                        error={Boolean(errors.password && touched.password)}
                      />
                      <TextField
                        label="Contact"
                        variant="outlined"
                        className="w-100 mb-4"
                        id="contact"
                        onChange={handleChange}
                        value={values.contact}
                        helperText={touched.contact ? errors.contact : ""}
                        error={Boolean(errors.contact && touched.contact)}
                      />

                      <Button type="submit" variant="contained">
                        Signup
                      </Button>
                      <div class="loginpage " id="loginpage">
                        Already have account
                        <Link to="/main/signin">Login Here</Link>
                      </div>
                    </form>
                  )}
                </Formik>
                <div
                style={{with:"100%"}}
                  role="button"
                  id="signInDiv">
                  <i className="fab fa-google"
                    style={{ marginLeft: "6px" }}
                  ></i>
                </div>
                {Object.keys(user).length !== 0 && (
                  <button onClick={(e) => handleSignOut(e)}>Signout</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
