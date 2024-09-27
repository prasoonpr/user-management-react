import { Link } from "react-router-dom";
import axios from "../../../../constents/axios.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/userSlice.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailvalid, setEmailvalid] = useState(true);
  const [passvalid, setPassvalid] = useState(true);
  const [message,setMessage]=useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isemail = email.trim() !== "";
    const isPassword = password.trim() !== "";

    setEmailvalid(isemail);
    setPassvalid(isPassword);

    if (!isemail || !isPassword) {
      return;
    }
    const userCredentails = { email, password };
    try {
      const response = await axios.post("/login", userCredentails);
      setMessage(response.data.message);
     
      
      
      if (response.status === 201) {
        const user = response.data.userDetails;
        const token = response.data.token;
        localStorage.setItem("token", token);
        dispatch(setUser(user));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="forme" onSubmit={handleSubmit} method="POST" id="regForm">
        {message?<lable id="title" style={{color:"red"}}>{message}</lable>:<lable id="title">Login page</lable>}
        {/* <lable id="title">Login page</lable> */}
       
        <br/>
        <table>
          <tbody>
           
            <tr>
              <td className="lbl">E-mail:</td>
              <td>
                <input
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  id="mail"
                  className="textbox"
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                
                {emailvalid ? (
                  <lable className="help">sample@gmail.com</lable>
                ) : (
                  <lable className="help" style={{ color: "red" }}>
                    email cannot be empty
                  </lable>
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
              {passvalid ? (
                  <lable className="help"></lable>
                ) : (
                  <lable className="help" style={{ color: "red" }}>
                    password cannot be empty
                  </lable>
                )}
              
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" id="send" value="Send Request" />
        <br />
        <Link className="linkLogin" to={"/"}>
          Alredy have an account?Login
        </Link>
      </form>
    </div>
  );
}

export default Login;
