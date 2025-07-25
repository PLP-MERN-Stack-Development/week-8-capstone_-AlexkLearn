import { useState } from "react";
import useProviders from "../hooks/useProviders"; // ensure this matches your project
import ProviderCard from "../components/ProviderCard";
import Loader from "../components/Loader";

const Home = () => {
  const [filters, setFilters] = useState({ skill: "", location: "" });
  const [page, setPage] = useState(1);
  const { providers, totalPages, loading } = useProviders(filters, page);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // Reset to first page when filters change
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Find Service Providers</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <input
          name="skill"
          onChange={handleChange}
          value={filters.skill}
          placeholder="Search by skill (e.g. plumber)"
          className="input w-60"
        />
        <input
          name="location"
          onChange={handleChange}
          value={filters.location}
          placeholder="Location (e.g. Githurai)"
          className="input w-60"
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {providers.length === 0 && <p>No providers found.</p>}
            {providers.map((p) => (
              <ProviderCard key={p._id} provider={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;