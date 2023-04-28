import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            This is a messaging app that was created because of the inspiration
            of my 2 daughters. Out in the world, our children are trying to
            figure out life the best they can despite the hardshipss of truth
            they will experience from sources we have no control over.
            Sometimes, the ones who care about them the most may no longer be
            there for them and would like to leave special notes for them to
            always be able to go to as a reminder on how great they are. This is
            a way we can communicate with them in a secure way and remind them
            how great they are and always will be able to go back and see those
            notes as constant encouragement that they always have someone who
            thinks the world of them.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
