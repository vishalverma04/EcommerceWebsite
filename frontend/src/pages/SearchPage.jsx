import React from 'react';
import { useProductContext } from '../contexts/ProductContext';
import ProductCard from '../components/homeComponents/HomeProduct';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import NoResultsPage from './SeachedResultNull';
import FilterSection from '../components/FilterComponent';

const SearchPage = () => {
    const { searchQuery } = useParams();
    const { searchResults, loading ,filteredResults} = useProductContext();

    if(loading) return <Loader />
    return (
        <>
            <div className='flex'>
            <FilterSection/>
            {filteredResults.length > 0 ? (<div className="min-h-screen w-[100%] bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Search Results for "{searchQuery}"
            </h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    {filteredResults.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
        </div>
        </div>): <div className="min-h-screen w-[100%] bg-gray-50 p-6">
        <NoResultsPage searchQuery={searchQuery}/>
        </div>
        }
            </div>
        </>
    );
};

export default SearchPage;
