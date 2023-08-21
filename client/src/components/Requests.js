import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [link, setLink] = useState("request");
  const [allowActions, setAllowAction] = useState(true);
  const role = window.localStorage.getItem("role");
  const token = window.localStorage.getItem("token");
  document.cookie = `token=${token}; path=/;`;

  useEffect(() => {
    fetch(`http://localhost:4000/${link}`, {
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
          setRequests(data);
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
  }, [link]);
  const handleApproveClick = (id) => {
    const token = window.localStorage.getItem("token");
    document.cookie = `token=${token}; path=/id;`;

    console.log(`http://localhost:4000/request/${id}/approve`);

    fetch(`http://localhost:4000/request/${id}/approve`, {
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
          alert("Request approved successfully");
          window.location.href = "/requests";
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert(
          "An error occurred while fetching requests. Please try again later."
        );
      });
  };
  const handleRejectClick = (id) => {
    const token = window.localStorage.getItem("token");
    document.cookie = `token=${token}; path=/id;`;

    console.log(`http://localhost:4000/request/${id}/reject`);

    fetch(`http://localhost:4000/request/${id}/reject`, {
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
          alert("Request approved successfully");
          window.location.href = "/requests";
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert(
          "An error occurred while fetching requests. Please try again later."
        );
      });
  };

  const table_row = (item) => {
    return (
      <>
        <td>{item.candidateName}</td>
        <td>{item.party}</td>
        <td>{item.constituencyNumber}</td>
        {allowActions && role === "admin" && (
          <td>
            <button
              className="btn btn-outline-info mr-2"
              onClick={() => handleApproveClick(item._id)}
            >
              Approve
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleRejectClick(item._id)}
            >
              Reject
            </button>
          </td>
        )}
      </>
    );
  };

  const tableHeading = ["Name", "party", "Constituency"];

  if (allowActions) tableHeading.push("Actions");

  return (
    <div className="container bg-light rounded mt-5">
      <h1 className="text-center">Request</h1>
      <div>
        {role === "admin" && (
          <div>
            (
            <button
              onClick={() => {
                setLink("request");
                setAllowAction(true);
              }}
              className="m-3 btn btn-outline-primary"
            >
              Pending Requests
            </button>
            <button
              onClick={() => {
                setLink("request/approved");
                setAllowAction(false);
              }}
              className="m-3 btn btn-outline-primary"
            >
              Approved Requests
            </button>
            <button
              onClick={() => {
                setLink("request/rejected");
                setAllowAction(false);
              }}
              className="m-3 btn btn-outline-primary"
            >
              Rejected Requests
            </button>
            )
          </div>
        )}
      </div>
      {requests.length > 0 ? (
        <table className="table table-striped table pb-5">
          <thead>
            <tr>
              {tableHeading.map((heading) => (
                <th key={tableHeading.indexOf(heading)}> {heading} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={requests.indexOf(request)}>{table_row(request)}</tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="mt-5">No requests made yet</h5>
      )}
      {role === "voter" && (
        <Link
          to={"/requests/new"}
          className="btn btn-lg btn-outline-primary m-5"
          aria-current="page"
        >
          Create Request
        </Link>
      )}
    </div>
  );
}
