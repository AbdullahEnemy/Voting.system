import { useState, useEffect } from "react";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const tableHeading = [
    "Email",
    "Name",
    "Constituency Number",
    "Party",
    "Action",
  ];

  const token = window.localStorage.getItem("token");
  document.cookie = `token=${token}; path=/id;`;

  useEffect(() => {
    fetch("http://localhost:4000/users/candidates", {
      method: "GET",
      credentials: "include",
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
          setCandidates(data);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert(
          "An error occurred while fetching Candidates. Please try again later."
        );
      });
    // eslint-disable-next-line
  }, []);
  const handleDeleteClick = (id) => {
    const token = window.localStorage.getItem("token");
    document.cookie = `token=${token}; path=/id;`;

    console.log(`http://localhost:4000/users/candidates/${id}`);

    fetch(`http://localhost:4000/users/candidates/${id}`, {
      method: "PATCH",
      credentials: "include",
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
          alert("Candidates deleted successfully");
          window.location.href = "/candidates";
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert(
          "An error occurred while fetching candidates. Please try again later."
        );
      });
  };

  const table_row = (item) => {
    return (
      <>
        <td>{item.email}</td>
        <td>{item.username}</td>
        <td>{item.constituencyNumber}</td>
        <td>{item.party}</td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleDeleteClick(item._id)}
          >
            Delete
          </button>
        </td>
      </>
    );
  };

  return (
    <div className="container bg-light rounded mt-5">
      <h1 className="text-center">Candidates</h1>
      {candidates.length > 0 ? (
        <table className="table table-striped table pb-5">
          <thead>
            <tr>
              {tableHeading.map((heading) => (
                <th key={tableHeading.indexOf(heading)}> {heading} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidates.indexOf(candidate)}>{table_row(candidate)}</tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="mt-5">No Candidate registered yet</h5>
      )}
    </div>
  );
}
