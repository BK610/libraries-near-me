"use client";
import { useState } from "react";

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch("/api");
      if (!response.ok) {
        throw new Error("Failed to fetch CSV data");
      }

      const data = await response.json();
      const filteredData = data.filter((row) => row.ZIP === zipCode);
      setResults(filteredData);
      setError(null);
    } catch (err) {
      setError("Failed to read CSV file." + err);
      setResults([]);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Library Search</h1>
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Enter ZIP code"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {results && <p>{results.length} results.</p>}
      <ul>
        {results.map((row, index) => (
          <li key={index}>
            {Object.entries(row).map(([key, value]: [string, string]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
