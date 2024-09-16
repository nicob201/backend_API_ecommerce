// Logica para manejo y cambio de roles de usuarios
document.addEventListener("DOMContentLoaded", () => {
  const confirmRoleChangeButtons = document.querySelectorAll(".confirm-role-change");

  confirmRoleChangeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");

      if (!userId) {
        console.error("User ID is missing!");
        return;
      }

      const selectedRadio = document.querySelector(`input[name="role-${userId}"]:checked`);
      const selectedRole = selectedRadio ? selectedRadio.value : null;

      fetch(`/api/users/admin/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newRole: selectedRole }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {
            Swal.fire({
              icon: "success",
              title: "Role Updated",
              timer: 2200,
              didClose: () => {
                location.reload();
              },
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to Change Role",
              text: data.error,
            });
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  });

  // Lógica para eliminar un usuario
  const deleteButtons = document.querySelectorAll('.delete-user');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const userId = button.getAttribute('data-id');

      if (!userId) {
        console.error("User ID is missing!");
        return;
      }

      // Confirmación antes de eliminar
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Confirm'
      });

      if (result.isConfirmed) {
        try {
          // Solicitud DELETE al servidor
          const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            );
            // Eliminar la tarjeta del usuario del DOM
            button.closest('.col').remove();
          } else {
            Swal.fire(
              'Error!',
              'There was a problem deleting the user.',
              'error'
            );
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire(
            'Error!',
            'There was a problem deleting the user.',
            'error'
          );
        }
      }
    });
  });
});
