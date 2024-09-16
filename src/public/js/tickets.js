// Funcion para crear un ticket (fetch al backend)
async function createTicket(cartId) {
  // Muestra el sweetalert de "Enviando email"
  const swalLoading = Swal.fire({
    title: 'Sending email...',
    text: 'Please wait while we generate and send the ticket details via email',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await fetch(`/api/tickets/${cartId}`, {
      method: "POST",
    });

    if (response.ok) {
      // Si la creación del ticket fue exitosa
      Swal.fire({
        icon: 'success',
        title: 'Ticket created successfully!',
        text: 'The email with the ticket details has been sent',
      });
    } else {
      // Si hubo un error al crear el ticket
      Swal.fire({
        icon: 'error',
        title: 'Failed to create ticket!',
        text: 'There was an issue creating the ticket. Please try again later.',
      });
    }
  } catch (error) {
    console.error("Error creating ticket!:", error);
    // Si hubo un error en la solicitud
    Swal.fire({
      icon: 'error',
      title: 'Error creating ticket!',
      text: 'There was an error while sending the email. Please try again.',
    });
  }
}

// Selecciona todos los botones de purchase y llama a la funcion createTicket
document.querySelectorAll('button[id^="purchaseButton-"]').forEach((button) => {
  button.addEventListener("click", async function () {
    const cartId = button.getAttribute("data-id");
    await createTicket(cartId); // Llama a la función y espera a que termine
  });
});

// Stripe
// Obtengo la clave pública de Stripe
const getStripePublicKey = async () => {
  const response = await fetch('/api/stripe-key');
  const data = await response.json();
  return data.publishableKey;
};

(async () => {
  const stripePublicKey = await getStripePublicKey();
  const stripe = Stripe(stripePublicKey);

  const checkoutButton = document.getElementById('checkout-button');

  if (checkoutButton) {
    checkoutButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/api/payments/create-checkout-session', {
          method: 'POST',
        });

        const session = await response.json();
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error(result.error.message);
        }
      } catch (error) {
        console.error('Error al crear la sesión de checkout:', error);
      }
    });
  }
})();
