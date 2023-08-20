import React, { useState } from "react";

export default function CreateConstituency() {
  const [formData, setFormData] = useState({
    number: "",
    district: "",
    isElectionConducted: false,
    electionDate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = window.localStorage.getItem("token");
    document.cookie = `token=${token}; path=/register;`;

    try {
      const response = await fetch(
        "http://localhost:4000/constituency/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        window.location.href = "/constituencies";
        alert("Constituency created successfully");
      } else {
        alert("Failed to create constituency");
      }
    } catch (error) {
      console.error("Error creating constituency:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner-2">
        <h1>Create Constituency</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Constituency Number:</label>
            <input
              type="text"
              name="number"
              className="form-control"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>District:</label>
            <input
              type="text"
              name="district"
              className="form-control"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
