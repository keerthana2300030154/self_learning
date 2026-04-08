function Navbar() {
  return (
    <div className="navbar">

      <div className="logo">
        🛡️ SecuraX
      </div>

      <div className="nav-links">
        <span onClick={() =>
          document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" })
        }>
          Dashboard
        </span>

        <span onClick={() =>
          document.getElementById("logs").scrollIntoView({ behavior: "smooth" })
        }>
          Logs
        </span>

        <span onClick={() =>
          document.getElementById("alerts").scrollIntoView({ behavior: "smooth" })
        }>
          Alerts
        </span>
      </div>

    </div>
  );
}

export default Navbar;