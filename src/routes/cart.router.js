import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import * as cartController from "../controllers/cart.controller.js";

const router = Router();

// Rutas para GET
router.get("/", isAuthenticated, cartController.getCarts);
router.get("/:cid", isAuthenticated, cartController.getCartById);

// Rutas para POST
router.post("/", isAuthenticated, cartController.createCart);

// Rutas para PUT
router.put("/:cid/product/:pid", isAuthenticated, cartController.updateProductUnits);

// Rutas para DELETE
router.delete("/:cid", isAuthenticated, cartController.deleteCart);
router.delete("/:cid/product/:pid", isAuthenticated, cartController.deleteProductFromCart);

export default router;
