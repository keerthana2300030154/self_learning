const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];
const SAMPLE_HEIGHTS = [30, 44, 36, 52, 40, 24, null]; // null = computed from today's logs

function Alerts({ alerts = [], logs = [] }) {
  const hasThreats = alerts.length > 0;

  // today's bar height based on log count
  const todayHeight = Math.min(8 + logs.length * 6, 56);

  return (
    <>
      {/* ---- Threat Detection Card ---- */}
      <div className="card">
        <h3>
          <span className="card-icon icon-amber">⚠</span>
          Threat detection
        </h3>

        <div className={`alert ${hasThreats ? "danger" : "safe"}`}>
          <div className="alert-icon">
            {hasThreats ? "!" : "✓"}
          </div>
          <div>
            <div style={{ fontWeight: 500, marginBottom: 2 }}>
              {hasThreats ? `${alerts.length} threat${alerts.length > 1 ? "s" : ""} detected` : "System secure"}
            </div>
            <div style={{ fontSize: 12 }}>
              {hasThreats ? "Review suspicious activity below" : "No threats detected"}
            </div>
          </div>
        </div>

        {hasThreats && alerts.map((a, i) => (
          <div key={i} className="alert danger" style={{ marginTop: 8 }}>
            <div className="alert-icon">!</div>
            <div>
              <strong>{a.user}</strong> — {a.reason}
            </div>
          </div>
        ))}

        <div className="legend-title">Risk legend</div>
        <div className="legend-item"><span className="dot dot-red"></span> Critical — privilege escalation, data exfil, port scan</div>
        <div className="legend-item"><span className="dot dot-amber"></span> Medium — failed login attempts</div>
        <div className="legend-item"><span className="dot dot-green"></span> Low — successful login, file access</div>
      </div>

      {/* ---- Activity Chart Card ---- */}
      <div className="card">
        <h3>
          <span className="card-icon icon-green">↗</span>
          Activity (last 7 days)
        </h3>

        <div className="chart-bars">
          {WEEK_DAYS.map((day, i) => {
            const isToday = day === "Today";
            const height = isToday ? todayHeight : SAMPLE_HEIGHTS[i];
            return (
              <div className="bar-col" key={day}>
                <div
                  className={`bar ${isToday ? "today" : ""}`}
                  style={{ height: `${height}px` }}
                />
                <div className={`bar-label ${isToday ? "today" : ""}`}>{day}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Alerts;
