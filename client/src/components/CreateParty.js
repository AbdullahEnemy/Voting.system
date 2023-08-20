import React, { useState } from "react";

export default function CreateParty() {
  const [formData, setFormData] = useState({
    name: "",
    partyLeader: "",
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
      const response = await fetch("http://localhost:4000/parties/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = "/parties";
        alert("Party created successfully");
      } else {
        alert("Failed to create Party");
      }
    } catch (error) {
      console.error("Error creating Party:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner-2">
        <h1>Create Party</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>PartyName:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>PartyLeader:</label>
            <input
              type="text"
              name="partyLeader"
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
