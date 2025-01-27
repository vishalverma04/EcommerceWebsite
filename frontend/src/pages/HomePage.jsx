import React from 'react'
import HeroSection from '../components/homeComponents/Herosection'

import ProductListing from '../components/productListing'
import CategorySection from '../components/category/CategorySection'

function HomePage() {
    
  return (
    <>
        <HeroSection/>
        <CategorySection/>
        <ProductListing/>
        
    </>
  )
}

export default HomePage
