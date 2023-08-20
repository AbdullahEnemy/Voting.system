import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Parties() {
  const [parties, setparties] = useState([]);
  const tableHeading = ["Name", "partyLeader", "Actions"];
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  document.cookie = `token=${token}; path=/id;`;
  useEffect(() => {
    fetch("http://localhost:4000/parties", {
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
          setparties(data);
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
  const handleDeleteClick = (id) => {
    const token = window.localStorage.getItem("token");
    document.cookie = `token=${token}; path=/id;`;

    console.log(`http://localhost:4000/parties/${id}`);

    fetch(`http://localhost:4000/parties/${id}`, {
      method: "DELETE",
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
          alert("partY deleted successfully");
          window.location.href = "/parties";
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert(
          "An error occurred while fetching Parties. Please try again later."
        );
      });
  };

  const handleEditClick = (party) => {
    navigate(`/parties/${party._id}/edit`);
    window.localStorage.setItem("party", JSON.stringify(party));
  };

  const table_row = (item) => {
    return (
      <>
        <td>{<Link to={`/parties/${item._id}`}>{item.name}</Link>}</td>
        <td>{item.partyLeader}</td>
        <td>
          <button
            className="btn btn-outline-info mr-2"
            onClick={() => handleEditClick(item)}
          >
            Edit
          </button>
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
      <h1 className="text-center">Parties</h1>
      {parties.length > 0 ? (
        <table className="table table-striped table pb-5">
          <thead>
            <tr>
              {tableHeading.map((heading) => (
                <th key={tableHeading.indexOf(heading)}> {heading} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parties.map((party) => (
              <tr key={parties.indexOf(party)}>{table_row(party)}</tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="mt-5">No party registered yet</h5>
      )}
      <Link
        to={"/parties/new"}
        className="btn btn-lg btn-outline-primary m-5"
        aria-current="page"
      >
        Create Party
      </Link>
    </div>
  );
}
