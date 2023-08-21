import React, { useState, useEffect } from "react";

export default function RequestCreate() {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [party, setParty] = useState("");
  const [constituencyNumber, setConstituencyNumber] = useState("");
  const [constituencies, setConstituencies] = useState([]);
  const [parties, setParties] = useState([]);

  const token = window.localStorage.getItem("token");
  document.cookie = `token=${token}; path=/;`;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/request/create", {
      method: "POST",
      crossDomain: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        candidateName,
        candidateEmail,
        constituencyNumber,
        party,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          window.location.href = "/requests";
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

  useEffect(() => {
    fetch("http://localhost:4000/parties", {
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
            setParties(data);
            console.log(data);
            console.log(parties);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert(
          "An error occurred while fetching parties. Please try again later."
        );
      });

    // eslint-disable-next-line
  }, []);

  const handleChangeConstituency = (event) => {
    console.log("Event: ", event.target.value);
    setConstituencyNumber(event.target.value);
  };

  const handleChangeParty = (event) => {
    console.log("Event: ", event.target.value);
    setParty(event.target.value);
  };

  return (
    constituencies && (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Request</h3>

            <div className="mb-3">
              <label>Name</label>
              <input
                type="candidateName"
                className="form-control"
                placeholder="Name"
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="candidateName"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setCandidateEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Select Constituency</label>
              <select value={constituencyNumber} onChange={handleChangeConstituency}>
                <option value="">Select an option</option>
                {constituencies.map((option, index) => (
                  <option key={index} value={option.number}>
                    {option.number}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Select Party</label>
              <select value={party} onChange={handleChangeParty}>
                <option value="">Select an option</option>
                {parties.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Request
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
