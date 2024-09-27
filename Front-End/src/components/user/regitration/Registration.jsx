import { Form, Link, useNavigate } from "react-router-dom";
import "./Registration.css";
import { useState } from "react";
import axios from "../../../../constents/axios.js";

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState(null);
  const [conPass, setConPass] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5 && password.length <= 10;
  };
  const confirmPass = (password, password2) => {
    return password == password2;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = name.trim() !== "";
    const isConPass = confirmPass(password, password2);

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);
    setNameValid(isNameValid);
    setConPass(isConPass);

    if (!isEmailValid || !isPasswordValid || !isNameValid || !isConPass) {
      return;
    }

    // const userDetails= {name,email,password}
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/", formData);

      if (response.status === 201) {
        navigate("/login");
      } else {
        alert("the user alredy exist");
        // console.log('Unexpected response:', response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="formReg"
        onSubmit={handleSubmit}
        method="POST"
        id="regForm"
      >
        <lable id="title">Registration page</lable>
        <table>
          <tbody>
            <tr>
              <td className="lbl">Name</td>
              <td>
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="name"
                  id="name"
                  className="textbox"
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {!nameValid ? (
                  <label className="help" style={{ color: "red" }}>
                    Name cannot be empty
                  </label>
                ) : (
                  <label className="help">Max 25 Characters</label>
                )}
              </td>
            </tr>
            <tr>
              <td className="lbl">E-mail:</td>
              <td>
                <input
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  id="email"
                  className="textbox"
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {!emailValid ? (
                  <label className="help" style={{ color: "red" }}>
                    Invalid Email
                  </label>
                ) : (
                  <label className="help">sample@gmail.com</label>
                )}
              </td>
            </tr>
            <tr>
              <td className="lbl">Password:</td>
              <td>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="password"
                  id="password"
                  className="textbox"
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {!passwordValid ? (
                  <label className="help" style={{ color: "red" }}>
                    Password must be between 5-10 characters
                  </label>
                ) : (
                  <label className="help">5 To 10 Characters</label>
                )}
              </td>
            </tr>
            <tr>
              <td className="lbl">Confirm:</td>
              <td>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                  name="password2"
                  id="password2"
                  className="textbox"
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {conPass ? (
                  <lable className="help">Must Match The Password</lable>
                ) : (
                  <lable className="help" style={{ color: "red" }}>
                    Password Not Matching
                  </lable>
                )}
              </td>
            </tr>
            <tr>
              <td className="lbl">Upload Image:</td>
              <td>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  id="image"
                  accept="image/*"
                  className="textbox"
                />
              </td>
            </tr>
            <br></br>
          </tbody>
        </table>
        <button type="submit" id="send" value="">
          Send a Request
        </button>

        <Link className="linkLogin" to={"/login"}>
          Alredy have an account?Login
        </Link>
      </form>
    </div>
  );
}

export default Registration;
