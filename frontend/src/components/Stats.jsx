function Stats({ logs = [], alerts = [] }) {
  const failedLogins = logs.filter(l => l.action === "failed_login").length;
  const uniqueIPs = new Set(logs.map(l => l.ip)).size;
  const hasThreats = alerts.length > 0;

  return (
    <div className="stats">

      <div className="stat-card">
        <p>Total Logs</p>
        <h3>{logs.length}</h3>
        <span className="stat-sub green">+12% from yesterday</span>
      </div>

      <div className="stat-card">
        <p>Threats Detected</p>
        <h3 className={hasThreats ? "danger" : ""}>{alerts.length}</h3>
        <span className="stat-sub" style={{ color: hasThreats ? "#E24B4A" : "#1D9E75" }}>
          {hasThreats ? "Review alerts" : "No active threats"}
        </span>
      </div>

      <div className="stat-card">
        <p>Failed Logins</p>
        <h3 className={failedLogins > 0 ? "danger" : ""}>{failedLogins}</h3>
        <span className="stat-sub">Last 24 hours</span>
      </div>

      <div className="stat-card">
        <p>Unique IPs</p>
        <h3>{uniqueIPs}</h3>
        <span className="stat-sub">Active sources</span>
      </div>

    </div>
  );
}

export default Stats;
