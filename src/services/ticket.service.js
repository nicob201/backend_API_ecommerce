import ticketModel from "../dao/models/ticket.model.js";
import cartModel from "../dao/models/cart.model.js";
import emailService from "../services/email.service.js";
import { nanoid } from "nanoid";

const { sendPurchaseTicketEmail } = emailService;

// Crea un ticket a partir del carrito
async function createTicketService(cid) {
  const cart = await cartModel.findById(cid).populate("products.product");

  const products = cart.products.map(item => ({
    product: item.product._id,
    title: item.product.title,
    units: item.units,
    price: item.product.price,
    total: item.units * item.product.price
  }));

  const totalAmount = products.reduce((acc, item) => acc + item.total, 0);

  const ticket = await ticketModel.create({
    amount: totalAmount,
    purchaser: cart.user,
    code: nanoid(10),
    products: products
  });

  // Llamado a la funcion de envio del email
  await sendPurchaseTicketEmail(ticket, products, totalAmount);

  return ticket;
}

// Devuelve el ticket dado su id
async function getTicketByIdService(tid) {
  const ticket = await ticketModel.findById(tid).populate("products.product");
  if (!ticket) {
    throw new Error("Ticket not found!");
  }
  return ticket;
}

export {
  createTicketService,
  getTicketByIdService
};
