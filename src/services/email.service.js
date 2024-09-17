import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.MAILING_EMAIL,
    pass: config.MAILING_PASSWORD,
  },
});

// Email con ticket de compra
const sendEmailTicket = async (to, subject, text, html) => {
  const mailOptions = {
    from: config.MAILING_EMAIL,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {}
};

// Logica para Email del ticket de compra
export const sendPurchaseTicketEmail = async (ticket, products, totalAmount, userEmailLogged) => {
  const productDetails = products.map(item => `
    <tr>
      <td>${item.title ?? 'N/A'}</td>
      <td>${item.units ?? 'N/A'}</td>
      <td>${item.price ?? 'N/A'}</td>
      <td>${item.total ?? 'N/A'}</td>
    </tr>
  `).join("");

  const emailHTML = `
    <h1>Detalle de tu compra</h1>
    <p>Gracias por tu compra! Detalle de los productos:</p>
    <p><strong>Número de Orden:</strong> ${ticket.code}</p>
    <table border="1">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${productDetails}
      </tbody>
    </table>
    <p>Total: $ ${totalAmount}</p>
  `;
  await sendEmailTicket(userEmailLogged, "Detalle de tu compra", "", emailHTML);
};

// Email para reseteo de contraseña
export const sendResetEmail = async (email, token) => {
  const resetUrl = `${config.BASE_URL}/api/sessions/reset-password/${token}`;
  const message = `
    <h1>Password Reset Request</h1>
    <h4>You requested a password reset</h4>
    <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
  `;

  await transporter.sendMail({
    to: email,
    subject: "Password Reset Request - API",
    html: message,
  });
};

// Email con los datos del user eliminado
export const sendDeletedUserEmail = async (email, user) => {
  const message = `
    <h1>User Deleted!</h1>
    <h4>Your user account has been deleted</h4>
    <p>Here are the details of your deleted account:</p>
    <ul>
      <li>First Name: ${user.first_name}</li>
      <li>Last Name: ${user.last_name}</li>
      <li>Email: ${user.email}</li>
    </ul>
  `;

  await transporter.sendMail({
    to: email,
    subject: "User Deleted - API",
    html: message,
  });
};

// Email con los datos del producto eliminado
export const sendDeletedProductEmail = async (email, product) => {
  const message = `
    <h1>Product Deleted!</h1>
    <h4>Your product has been deleted</h4>
    <p>Here are the details of your product:</p>
    <ul>
      <li>Title: ${product.title}</li>
      <li>Description: ${product.description}</li>
      <li>Price: ${product.price}</li>
      <li>Code: ${product.code}</li>
      <li>Stock: ${product.stock}</li>
    </ul>
  `;

  await transporter.sendMail({
    to: email,
    subject: "Product Deleted - API",
    html: message,
  });
};

export default { sendEmailTicket, sendPurchaseTicketEmail };
