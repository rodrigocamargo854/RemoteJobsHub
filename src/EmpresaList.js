"use client";

import { useState, useEffect } from "react";

export default function RemoteCompaniesPage() {
    const [companies, setCompanies] = useState([]);
    const [visibleCompanies, setVisibleCompanies] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchRegion, setSearchRegion] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);
    
    const BATCH_SIZE = 10;

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            let url = "/companies";
            const params = new URLSearchParams();
    
            if (searchName) params.append("name", searchName);
            if (searchRegion) params.append("region", searchRegion);
    
            if (params.toString()) url += `?${params.toString()}`;

            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const data = await response.json();

            setCompanies(data);
            setVisibleCompanies(data.slice(0, BATCH_SIZE));
            setLoadMoreDisabled(data.length <= BATCH_SIZE);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCompanies(); 
    }, []);

    const handleLoadMore = () => {
        const currentLength = visibleCompanies.length;
        const nextBatch = companies.slice(currentLength, currentLength + BATCH_SIZE);
        setVisibleCompanies([...visibleCompanies, ...nextBatch]);

        if (visibleCompanies.length + nextBatch.length >= companies.length) {
            setLoadMoreDisabled(true);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
            <header className="w-full max-w-4xl flex items-center justify-between bg-gray-900 p-4 rounded-lg shadow">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
                        R
                    </div>
                    <span className="text-xl font-semibold">Rodrigo Camargo Development</span>
                </div>
            </header>

            <h1 className="text-3xl font-bold mt-6 text-center">Remote Companies</h1>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-6 w-full max-w-lg">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="p-2 border border-gray-600 rounded bg-gray-900 text-white w-full"
                />
                <input
                    type="text"
                    placeholder="Search by region"
                    value={searchRegion}
                    onChange={(e) => setSearchRegion(e.target.value)}
                    className="p-2 border border-gray-600 rounded bg-gray-900 text-white w-full"
                />
                <button
                    onClick={fetchCompanies}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}

            <ul className="w-full max-w-2xl bg-gray-900 shadow rounded p-4 text-white">
                {visibleCompanies.length > 0 ? (
                    visibleCompanies.map((company, index) => (
                        <li key={index} className="border-b border-gray-700 p-3 flex flex-col sm:flex-row sm:items-center gap-4">
                            {company.Logo ? (
                                <img
                                    src={company.Logo}
                                    alt={`${company.Name} Logo`}
                                    className="w-12 h-12 rounded-full bg-white p-1"
                                />
                            ) : (
                                <img
                                    src={`https://logo.clearbit.com/${company.Name.toLowerCase().replace(/\s+/g, '')}.com`}
                                    alt={`${company.Name} Logo`}
                                    className="w-12 h-12 rounded-full bg-white p-1"
                                    onError={(e) => (e.target.style.display = "none")} 
                                />
                            )}

                            <div className="flex flex-col text-center sm:text-left">
                                <strong className="text-lg">{company.Name}</strong>
                                <span className="text-gray-400">{company.Region}</span>
                                <a 
                                    href={company.Website} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-400 hover:text-blue-300 text-sm break-all"
                                >
                                    {company.Website}
                                </a>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center">No companies found.</p>
                )}
            </ul>

            {!loadMoreDisabled && (
                <button
                    onClick={handleLoadMore}
                    className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600"
                >
                    Load More
                </button>
            )}
        </div>
    );
}