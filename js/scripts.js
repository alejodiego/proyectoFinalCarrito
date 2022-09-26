let btnsesion = document.getElementById("inicioSesion")
btnsesion.addEventListener("click",iniciarSesion);

function iniciarSesion(){

  Swal.fire({
    title: 'Login Form',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
    <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: 'Sign in',
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Please enter login and password`)
      }
      if (login == "admin" || password == 1234){
        Swal.fire("Login correcto.")
        sessionStorage.setItem('sesion', 'true');
      }else{
        Swal.fire("Login incorrecto.")
        // iniciarSesion()
      }
    }
  })
let sesion = sessionStorage.getItem('sesion');
if (sesion){
  document.getElementById("inicioSesion").innerHTML = "Cerrar Sesion";
}



}

let totalItemsCarrito = 0;
const botonesAgregarCarrito = document.querySelectorAll('.addCarrito');
botonesAgregarCarrito.forEach(botonAgregarCarrito => {
  botonAgregarCarrito.addEventListener("click", agregarCarritoClicked);
});

const contenedorCarrito = document.querySelector(".contenedorCarrito");

function agregarCarritoClicked(event) {
  const boton = event.target;
  const card = boton.closest('.card');

  const cardTitulo = card.querySelector('.producto').textContent;
  const cardPrecio = card.querySelector('.precio').textContent;
  const cardImagen = card.querySelector('.card-img-top').src;

  agregarItemsCarrito(cardTitulo, cardPrecio, cardImagen);
}

function agregarItemsCarrito(cardTitulo, cardPrecio, cardImagen) {
  const elementsTitle = contenedorCarrito.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === cardTitulo) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      Swal.fire("Agregado al carrito correctamente.");
      updateShoppingCartTotal();
      //calcularTotalItems();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
    <div class="row shoppingCartItem">
          <div class="col-6">
              <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${cardImagen} class="shopping-cart-image">    
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${cardTitulo}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="item-price mb-0 shoppingCartItemPrice">${cardPrecio}</p>
              </div>
          </div>
          <div class="col-4">
              <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                  <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                      value="1">
                  <button class="btn btn-danger buttonDelete" type="button">X</button>
              </div>
          </div>
      </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  contenedorCarrito.append(shoppingCartRow);
  Swal.fire("Agregado al carrito correctamente.");
  shoppingCartRow.querySelector(".buttonDelete").addEventListener("click", removerItemCarrito);

  shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  let total2 = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    total2 = total2 + shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
  document.getElementById('cantidadItems').innerHTML = `${total2}`;
}

function removerItemCarrito(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}