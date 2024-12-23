import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchedItems = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
      {/* Add logic to fetch and display results */}
    </div>
  );
};

export default SearchedItems;
