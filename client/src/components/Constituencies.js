import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Constituencies() {
  const [constituencies, setConstituencies] = useState([]);
  const tableHeading = [
    "Constituency Number",
    "District",
    "Election Date",
    "Actions",
  ];
  const navigate = useNavigate();
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
  const handleDeleteClick = (id) => {
    const token = window.localStorage.getItem("token");
    document.cookie = `token=${token}; path=/id;`;

    console.log(`http://localhost:4000/constituency/${id}`);

    fetch(`http://localhost:4000/constituency/${id}`, {
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
          alert("Constituency deleted successfully");
          window.location.href = "/constituencies";
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
  };

  const handleEditClick = (constituency) => {
    navigate(`/constituencies/${constituency._id}/edit`);
    window.localStorage.setItem("constituency", JSON.stringify(constituency));
  };

  const table_row = (item) => {
    return (
      <>
        <td>{<Link to={`/constituencies/${item._id}`}>{item.number}</Link>}</td>
        <td>{item.district}</td>
        <td>{item.electionDate ? item.electionDate : "Not Set"}</td>
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
      <h1 className="text-center">Constituencies</h1>
      {constituencies.length > 0 ? (
        <table className="table table-striped table pb-5">
          <thead>
            <tr>
              {tableHeading.map((heading) => (
                <th key={tableHeading.indexOf(heading)}> {heading} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {constituencies.map((constituency) => (
              <tr key={constituency.id}>{table_row(constituency)}</tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="mt-5">No constituency registered yet</h5>
      )}
      <Link
        to={"/constituencies/new"}
        className="btn btn-lg btn-outline-primary m-5"
        aria-current="page"
      >
        Create Constituency
      </Link>
    </div>
  );
}
