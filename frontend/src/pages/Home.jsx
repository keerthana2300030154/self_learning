import LogForm from "../components/LogForm";
import Dashboard from "../components/Dashboard";
import Alerts from "../components/Alerts";

function Home() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 Cloud Forensics Dashboard</h2>

      <LogForm />
      <Dashboard />
      <Alerts />
    </div>
  );
}

export default Home;