import { Router } from "express";
import { createCheckoutSession } from "../controllers/payment.controller.js";

const router = Router();

// Ruta para crear una sesión de pago
router.post('/create-checkout-session', createCheckoutSession);

// Ruta para manejar la redirección después de un pago exitoso
router.get('/success', (req, res) => {
    res.send('Pago exitoso, gracias por tu compra!');
});

// Ruta para manejar la redirección si el usuario cancela el pago
router.get('/cancel', (req, res) => {
    res.send('Pago cancelado! :(');
});

export default router;
