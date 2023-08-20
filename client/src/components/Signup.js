import React, { useState, useEffect } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [constituency, setConstituency] = useState("");
  const [constituencies, setConstituencies] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/users/signup", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        CNIC,
        constituency,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          window.location.href = "/sign-in";
        } else {
          alert("Something went wrong");
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:4000/constituency", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setConstituencies(data);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert(
          "An error occurred while fetching constituencies. Please try again later."
        );
      });
    // eslint-disable-next-line
  }, []);

  const handleOptionChange = (event) => {
    console.log("Event: ", event.target.value);
    setConstituency(event.target.value);
  };

  return (
    constituencies && (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>CNIC</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setCNIC(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Select Constituency</label>
              <select value={constituency} onChange={handleOptionChange}>
                <option value="">Select an option</option>
                {constituencies.map((option, index) => (
                  <option key={index} value={option.number}>
                    {option.number}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    )
  );
}
