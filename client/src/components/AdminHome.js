import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <>
      <div className="container bg-light rounded mt-5">
        <div className="text-primary pt-5">
          <h1>Admin Home</h1>
        </div>
        <div className="m-5">
          <Link
            to="/constituencies"
            className="btn btn-lg btn-outline-primary m-5"
            aria-current="page"
          >
            Constituencies
          </Link>

          <Link
            to="/candidates"
            className="btn btn-lg btn-outline-primary m-5"
            aria-current="page"
          >
            Candidates
          </Link>

          <Link
            to="/parties"
            className="btn btn-lg btn-outline-primary m-5"
            aria-current="page"
          >
            Parties
          </Link>

          <Link
            to="/elections"
            className="btn btn-lg btn-outline-primary m-5"
            aria-current="page"
          >
            Elections
          </Link>

          <Link
            to="/requests"
            className="btn btn-lg btn-outline-primary m-5"
            aria-current="page"
          >
            Requests
          </Link>
        </div>
      </div>
    </>
  );
}
