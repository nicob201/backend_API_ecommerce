import {
  createTicketService,
  getTicketByIdService,
} from "../services/ticket.service.js";
import { sendPurchaseTicketEmail } from "../services/email.service.js";
import { getProductByIdService } from "../services/product.service.js";

// Crear un ticket a partir del carrito del user
async function createTicket(req, res) {
  const { cid } = req.params;
  const userEmailLogged = req.session.user.email;
  try {
    const ticket = await createTicketService(cid);
    if (!ticket) {
      return res.status(404).send({ status: "error", error: "Cart not found!" });
    }
    // Obtener detalles de los productos
    const products = await Promise.all(ticket.products.map(async (item) => {
      const product = await getProductByIdService(item.product);
      return {
        title: product.title,
        units: item.units,
        price: product.price,
        total: item.total,
      };
    }));
    const totalAmount = products.reduce((acc, product) => acc + product.total, 0);

    // Enviar el email al usuario con el ticket
    await sendPurchaseTicketEmail(ticket, products, totalAmount, userEmailLogged);

    res.send({ status: "success", payload: ticket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).send({ status: "error", error: "Failed to create ticket!" });
  }
}

// Devuelve un ticket por id
async function getTicketById(req, res) {
  const { tid } = req.params;
  try {
    const ticket = await getTicketByIdService(tid);
    if (!ticket) {
      return res
        .status(404)
        .send({ status: "error", error: "Ticket not found!" });
    }
    res.send({ status: "success", payload: ticket });
  } catch (error) {
    console.error("Error getting ticket:", error);
    res.status(500).send({ status: "error", error: "Failed to get ticket!" });
  }
}

export { createTicket, getTicketById };
