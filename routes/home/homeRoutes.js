import express from "express";
import routeProtect from '../../middleware/routeValidation.js';

import 
{ 
    termsPage
} from "../../controllers/homeController.js";

const router = express.Router();

// Terms and condition page
router.get('/home/terms', routeProtect, termsPage);

export default router;