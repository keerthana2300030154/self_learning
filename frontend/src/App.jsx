import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LogForm from "./components/LogForm";
import Dashboard from "./components/Dashboard";
import Alerts from "./components/Alerts";
import Stats from "./components/Stats";
import { getLogs, getAlerts, resetLogs } from "./services/api";
import "./App.css";

function App() {
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const fetchData = async () => {
    try {
      const logsRes = await getLogs();
      const alertsRes = await getAlerts();

      setLogs(logsRes?.data || []);
      setAlerts(alertsRes?.data || []);
    } catch (err) {
      console.error("API ERROR:", err);
      setLogs([]);
      setAlerts([]);
    }
  };

  useEffect(() => {
    // 🔥 CLEAR BACKEND DATA ON LOAD
    resetLogs();

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">

      <Navbar />

      <h1>🛡️ Cloud Security Monitoring Dashboard</h1>
      <p className="subtitle">
        Real-time threat detection & forensic analysis system
      </p>

      {/* Dashboard */}
      <div id="dashboard">
        <Stats logs={logs} alerts={alerts} />
      </div>

      {/* Add Log */}
      <LogForm onAdd={fetchData} />

      {/* Logs */}
      <div id="logs">
        <Dashboard logs={logs} />
      </div>

      {/* Alerts */}
      <div id="alerts">
        <Alerts alerts={alerts} />
      </div>

    </div>
  );
}

export default App;