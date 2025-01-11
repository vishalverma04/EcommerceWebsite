import { asyncHander } from "../utils/asyncHandler";

const addNewHeroImage = asyncHander(async (req, res) => {
   let heroImageLocalPaths=[]
        const heroImagefile=req.files?.heroImage
      
        let images=[]
        if(productImages!=undefined){
          productImages.forEach(element => {
            productImageLocalPaths.push(element.path)
          });
          images=await uploadOnCloudinary(productImageLocalPaths)
        }
});