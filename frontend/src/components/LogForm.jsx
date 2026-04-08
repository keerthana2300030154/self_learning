import { useState } from "react";
import { addLog } from "../services/api";

function LogForm({ onAdd }) {
  const [form, setForm] = useState({ user: "", ip: "", action: "", time: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.user || !form.ip || !form.action || !form.time) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      await addLog(form);
      setForm({ user: "", ip: "", action: "", time: "" });
      onAdd();
    } catch (err) {
      console.error(err);
      alert("Failed to add log — check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>
        <span className="card-icon icon-blue">＋</span>
        Add security log
      </h3>

      <div className="form-row" style={{ marginBottom: "8px" }}>
        <input
          placeholder="Username"
          value={form.user}
          onChange={e => setForm({ ...form, user: e.target.value })}
        />
        <input
          placeholder="IP address (e.g. 192.168.1.1)"
          value={form.ip}
          onChange={e => setForm({ ...form, ip: e.target.value })}
        />
      </div>

      <div className="form-row">
        <select
          value={form.action}
          onChange={e => setForm({ ...form, action: e.target.value })}
        >
          <option value="">Select action</option>
          <option value="failed_login">failed_login</option>
          <option value="successful_login">successful_login</option>
          <option value="file_access">file_access</option>
          <option value="privilege_escalation">privilege_escalation</option>
          <option value="port_scan">port_scan</option>
          <option value="data_exfil">data_exfil</option>
        </select>
        <input
          placeholder="Time (e.g. 10:00)"
          value={form.time}
          onChange={e => setForm({ ...form, time: e.target.value })}
        />
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit log entry"}
      </button>
    </div>
  );
}

export default LogForm;
