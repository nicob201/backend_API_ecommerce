import PaymentService from "../services/payment.service.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.session.user._id;
        const session = await PaymentService.createCheckoutSession(userId);

        // Devolver el ID de la sesión a Stripe
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creando la sesión de pago:', error);
        res.status(500).json({ error: error.message });
    }
};
