import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateParty() {
  const constituency = JSON.parse(window.localStorage.getItem("party"));

  const [formData, setFormData] = useState(constituency);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = window.localStorage.getItem("token");
    document.cookie = `token=${token}; path=/id;`;

    try {
      const response = await fetch(`http://localhost:4000/parties/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = "/parties";
        window.localStorage.removeItem("party");
        alert("Party updated successfully");
      } else {
        alert("Failed to update party");
      }
    } catch (error) {
      console.error("Error updating Party:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner-2">
        <h1>Update Party</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Party Leader:</label>
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
