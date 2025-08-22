import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [gdpData, setGdpData] = useState([]);
  const [form, setForm] = useState({ country: "", iso_code: "", year: "", gdp: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/gdp")
      .then(res => setGdpData(res.data));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/gdp", form);
    setGdpData([...gdpData, res.data]);
    setForm({ country: "", iso_code: "", year: "", gdp: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Country GDP Records</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
        <input placeholder="ISO Code" value={form.iso_code} onChange={e => setForm({ ...form, iso_code: e.target.value })} />
        <input type="number" placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
        <input type="number" placeholder="GDP" value={form.gdp} onChange={e => setForm({ ...form, gdp: e.target.value })} />
        <button type="submit">Add Record</button>
      </form>

      <table className="mt-4 border">
        <thead>
          <tr><th>Country</th><th>Year</th><th>GDP</th></tr>
        </thead>
        <tbody>
          {gdpData.map(r => (
            <tr key={r._id}>
              <td>{r.country}</td>
              <td>{r.year}</td>
              <td>{r.gdp.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
