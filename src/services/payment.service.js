import Stripe from "stripe";
import config from "../config/config.js";
import { getCartByUserIdService } from "./cart.service.js";

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

class PaymentService {
    async createCheckoutSession(userId) {
        try {
            // Obtener el carrito del usuario
            const cart = await getCartByUserIdService(userId);

            if (!cart || cart.products.length === 0) {
                throw new Error('El carrito está vacío');
            }

            // Formatear los productos para que Stripe los entienda
            const lineItems = cart.products.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product.title,
                    },
                    unit_amount: item.product.price * 100,
                },
                quantity: item.units,
            }));
            // Crear la sesión de pago de Stripe
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${config.STRIPE_BASE_URL}/payments/success`,
                cancel_url: `${config.STRIPE_BASE_URL}/payments/cancel`,
            });

            return session;
        } catch (error) {
            console.error('Error creando sesión de Stripe:', error);
            throw new Error(error.message);
        }
    }
}

export default new PaymentService();
