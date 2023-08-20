import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Constituency() {
  const [constituency, setConstituency] = useState(null);
  const [voters, setVoters] = useState(null);
  const [candidates, setCandidates] = useState(null);

  const token = window.localStorage.getItem("token");
  document.cookie = `token=${token}; path=/;`;

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/constituency/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch constituency details");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setConstituency(data.constituency);
          setVoters(data.voters);
          setCandidates(data.candidates);
        } else {
          throw new Error("Failed to fetch constituency details");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert("An error occurred while fetching constituency details.");
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container bg-light rounded mt-5">
      {constituency ? (
        <div>
          <h1 className="text-center">
            <strong>Constituency: {constituency.number}</strong>
          </h1>
          <div className="row text-left">
            <div className="col-lg-6">
              <h4>
                <strong>District: </strong> {constituency.district}
              </h4>
              <h4>
                <strong> Candidates: </strong>
              </h4>
              <ul>
                {candidates.length > 0
                  ? candidates.map((candidate) => (
                      <li key={candidate.id}>
                        <h5>{candidate.username}</h5>
                      </li>
                    ))
                  : "No candidate available"}
              </ul>
              <h4>
                <strong> Voters: </strong>
              </h4>
              <ul>
                {voters.length > 0
                  ? voters.map((voter) => (
                      <li key={voter.id}>
                        <h5>{voter.username}</h5>
                      </li>
                    ))
                  : "No voter available"}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading constituency details...</p>
      )}
    </div>
  );
}
