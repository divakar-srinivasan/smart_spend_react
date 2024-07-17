import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../redux/slices/slice";
import "../css/LandingPage.css";
import img from "../assets/login.jpg";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setNameState] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setNameState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setShowMessage(true);
    } else {
      dispatch(setName(name));
      console.log("success");
      navigate("/CreateBudgetPage");
    }
  };

  return (
    <div className="landing-page">
      <header className="header">
        <AiFillHome className="icon" />
        <h1 className="logo">
          Home<span style={{ color: "black" }}>Budget</span>
        </h1>
      </header>
      <main className="main-content">
        <div className="content-left">
          <div className="content-left-wrapper">
            <h2 className="title">
              Take Control of <span className="highlight">Your Money</span>
            </h2>
            <p className="subtitle">
              Personal budgeting is the secret to financial freedom. Start your
              journey today.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                required
                type="text"
                value={name}
                onChange={handleChange}
                className="input-name"
                placeholder="What is your name?"
              />
              {showMessage && (
                <p className="msg" style={{ color: "red" }}>
                  Enter your name!
                </p>
              )}
              <button type="submit" className="create-account-button">
                Create Account <span className="icon">👤</span>
              </button>
            </form>
          </div>
        </div>
        <div className="content-right">
          <img src={img} alt="Chart" className="chart-image" />
        </div>
      </main>
      <footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
      </footer>
    </div>
  );
};

export default LoginUser;
