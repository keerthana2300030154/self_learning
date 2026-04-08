const RISK = {
  failed_login: "amber",
  successful_login: "green",
  file_access: "green",
  privilege_escalation: "red",
  port_scan: "red",
  data_exfil: "red",
};

function getRisk(action) {
  return RISK[action] || "blue";
}

function Dashboard({ logs = [] }) {
  return (
    <div className="card">
      <h3>
        <span className="card-icon icon-blue">📋</span>
        Activity logs
        <span className="log-count">{logs.length} {logs.length === 1 ? "entry" : "entries"}</span>
      </h3>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>IP address</th>
            <th>Action</th>
            <th>Time</th>
            <th>Risk</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ color: "#94a3b8", paddingTop: "16px" }}>
                No logs yet. Add your first entry above.
              </td>
            </tr>
          ) : (
            logs.map((log, i) => {
              const color = getRisk(log.action);
              return (
                <tr key={i}>
                  <td>{log.user}</td>
                  <td><span className="ip-mono">{log.ip}</span></td>
                  <td>
                    <span className={`badge badge-${color}`}>
                      <span className={`dot dot-${color}`}></span>
                      {log.action}
                    </span>
                  </td>
                  <td>{log.time}</td>
                  <td><span className={`dot dot-${color}`}></span></td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
