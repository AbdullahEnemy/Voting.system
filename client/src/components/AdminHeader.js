import { Link } from "react-router-dom";

export default function AdminHeader() {
  const handleSignOut = () => {
    window.localStorage.clear();
    window.location.href = "/sign-in";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <Link to="/" className="navbar-brand">
          Voting app
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link
                to="/constituencies"
                className="nav-link active"
                aria-current="page"
              >
                Constituencies
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                to="/candidates"
                className="nav-link active"
                aria-current="page"
              >
                Candidates
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                to="/elections"
                className="nav-link active"
                aria-current="page"
              >
                Parties
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                to="/elections"
                className="nav-link active"
                aria-current="page"
              >
                Elections
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                to="/requests"
                className="nav-link active"
                aria-current="page"
              >
                Requests
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
