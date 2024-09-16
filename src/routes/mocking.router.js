import { Router } from "express";
import { getMockProducts } from "../controllers/mocking.controller.js";

const router = Router();

router.get("/mockingproducts", getMockProducts);

export default router;