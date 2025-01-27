import express from 'express';
import { 
    addNewCategory,
    getCategories,
    deleteCategory,
    addNewHeroImage,
    getHeroImages,
    deleteHeroImage,
    getCategoryCount
 } from '../controllers/settings.controllers.js';
import  {upload}  from '../middlewares/multer.middleware.js';
import { cacheCategory ,cacheHeroImages} from '../middlewares/redisCache.middleware.js';

const router = express.Router();

router.post('/addnewcategory',upload.single('image'),addNewCategory);
router.get('/getcategories',cacheCategory,getCategories);
router.delete('/deletecategory/:id',deleteCategory);

router.post('/addnewheroimage',upload.single('image'),addNewHeroImage);
router.get('/getheroimages',cacheHeroImages,getHeroImages);
router.delete('/deleteheroimage/:id',deleteHeroImage);

router.get('/getcategorycount',getCategoryCount)

export default router;