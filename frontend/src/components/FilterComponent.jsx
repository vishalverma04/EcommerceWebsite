import React from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useCategoryContext } from "../contexts/categoryContext";

const FilterSection = ({open=false}) => {
    const { filters, setFilters } = useProductContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        console.log(filters);
    };

    const { categories } = useCategoryContext();

    return (
        <div className="p-4 w-1/4 bg-gray-100 h-screen">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            {open && <div className="mb-4">
                <label className="block mb-1">Category</label>
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                >
                    <option value="">All</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name.toLowerCase()}>
                        {category.name}
                      </option>
                    ))}
                </select>
            </div>}
            <div className="mb-4">
                <label className="block mb-1">Sort by Price</label>
                <select
                    name="sortPrice"
                    value={filters.sortPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                >
                    <option value="">None</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Price Range</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                        placeholder="Min"
                        className="w-1/2 border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        placeholder="Max"
                        className="w-1/2 border border-gray-300 p-2 rounded"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={filters.brand}
                    onChange={handleChange}
                    placeholder="Brand"
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
        </div>
    );
};

export default FilterSection;
