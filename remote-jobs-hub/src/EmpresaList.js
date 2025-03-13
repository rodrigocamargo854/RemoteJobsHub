"use client";

import { useState, useEffect } from "react";

export default function RemoteCompaniesPage() {
    const [companies, setCompanies] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchRegion, setSearchRegion] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            let url = "/companies";
            const params = new URLSearchParams();
    
            if (searchName) params.append("name", searchName);
            if (searchRegion) params.append("region", searchRegion);
    
            if (params.toString()) url += `?${params.toString()}`;

            console.log("Fetching:", url);
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received data:", data);

            setCompanies(data);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        fetchCompanies(); 
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-black text-white">
            <h1 className="text-3xl font-bold mb-6">Remote Companies</h1>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="p-2 border border-gray-600 rounded bg-gray-900 text-white"
                />
                <input
                    type="text"
                    placeholder="Search by region"
                    value={searchRegion}
                    onChange={(e) => setSearchRegion(e.target.value)}
                    className="p-2 border border-gray-600 rounded bg-gray-900 text-white"
                />
                <button
                    onClick={fetchCompanies}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}

            <ul className="w-full max-w-2xl bg-gray-900 shadow rounded p-4 text-white">
                {companies.length > 0 ? (
                    companies.map((company, index) => (
                        <li key={index} className="border-b border-gray-700 p-2">
                            <strong>{company.Name}</strong> - {company.Region}
                        </li>
                    ))
                ) : (
                    <p>No companies found.</p>
                )}
            </ul>
        </div>
    );
}
