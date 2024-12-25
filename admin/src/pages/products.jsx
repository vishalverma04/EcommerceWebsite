import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      // Replace this with actual API call
      const mockProducts = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 100) + 50,
        discount: Math.floor(Math.random() * 30),
        stock: Math.floor(Math.random() * 20) + 1,
        image: "https://via.placeholder.com/150",
      }));
      setProducts(mockProducts);
      setTotalProducts(mockProducts.length);
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    setSortKey(key);
    const sortedProducts = [...products].sort((a, b) =>
      key === "price" || key === "discount" || key === "stock"
        ? a[key] - b[key]
        : a[key].localeCompare(b[key])
    );
    setProducts(sortedProducts);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Search and Add New Product */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded w-1/3"
        />
        <button
          onClick={() => navigate("/addNewProduct")}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Add New Product
        </button>
      </div>

      {/* Total Products */}
      <div className="mb-4 text-gray-700">
        <span className="font-bold">{totalProducts}</span> products available
      </div>

      {/* Sort Options */}
      <div className="mb-4">
        <label className="mr-2">Sort by:</label>
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select</option>
          <option value="price">Price</option>
          <option value="discount">Discount</option>
          <option value="stock">Stock</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg"
            onClick={() => navigate(`/updateproduct/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">Price: ${product.price}</p>
            <p className="text-gray-700 mb-2">Discount: {product.discount}%</p>
            <p className="text-gray-700">Stock: {product.stock}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePagination(i + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
