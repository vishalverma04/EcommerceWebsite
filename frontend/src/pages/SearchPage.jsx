import React from 'react';
import { useProductContext } from '../contexts/ProductContext';
import ProductCard from '../components/homeComponents/HomeProduct';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import NoResultsPage from './SeachedResultNull';
import FilterSection from '../components/FilterComponent';

import { useLocation } from 'react-router-dom';

const SearchPage = () => {

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { searchQuery } = useParams();
    const { loading ,filteredResults} = useProductContext();

    const location =useLocation();
    const category = location.state?.category;

    if(loading) return <Loader />
    return (
        <>
            <div className='flex'>
            <FilterSection open={!category}/>
            {filteredResults.length > 0 ? (<div className="min-h-screen w-[100%] bg-gray-50 p-6">
            {!category?<h1 className="text-2xl font-bold text-gray-800">
                Search Results for "<span className='tect-blue-600'>{searchQuery}</span>"
            </h1>:<h1 className="text-2xl font-bold text-blue-600">
                 {category.toUpperCase()} 
            </h1>}

            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
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
