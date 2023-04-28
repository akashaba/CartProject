window.onload = getProducts;

async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
    const jsonData = await response.json();

    for (let e of jsonData) {
        addNewProductRowToTable( e.id, e.name, e.price, e.image, e.stock);
    }

}


let cartData = [];
const cartTableBody = document.getElementById('tbodyCat');
function addNewProductRowToTable(id, name, price, image, stock) {

    const row = document.createElement('tr');
    let cell0 = document.createElement('td');
    cell0.appendChild(document.createTextNode(id));
    row.appendChild(cell0);

    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(name));
    row.appendChild(cell);

    let cell1 = document.createElement('td');
    cell1.appendChild(document.createTextNode(price));
    row.appendChild(cell1);

  
    let cell2 = document.createElement('td');
    let img = document.createElement('img');
    img.src = image;
    img.style.width = '50px';
    img.style.height = 'auto';
    cell2.appendChild(img);
    row.appendChild(cell2);

    let cell3 = document.createElement('td');
    cell3.appendChild(document.createTextNode(stock));
    row.appendChild(cell3);

    cell = document.createElement('td');
    const actionBtn = document.createElement('button');
    actionBtn.textContent = 'Add to Cart';
    actionBtn.addEventListener('click', (event)=>{
        if(stock > 0) {
            stock -= 1;
            cell3.textContent=stock
        }else {
            alert('Out of stock');
            price=0
        }
        
        const row = event.target.closest('tr');
        const id = row.querySelector('td:first-child').textContent;
        const name = row.querySelector('td:nth-child(2)').textContent;
        const price = parseFloat(row.querySelector('td:nth-child(3)').textContent);
        const quantity = 1; // assuming default quantity is 1
        const total = price * quantity;
    
        // check if item is already in cart
        const existingCartItem = cartData.find((item) => item.name === name);
        if (existingCartItem) {
          existingCartItem.quantity++;
          existingCartItem.total += price;
        } else {
          cartData.push({id, name, price, total, quantity });
        }
    
        // update cart table
        cartTableBody.innerHTML = '';
        cartData.forEach((item) => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.total.toFixed(2)}</td>
            <td>${item.quantity}</td>
            
          `;
          cartTableBody.appendChild(row);
        });
        const totalPriceElem = document.getElementById('totalPrice');
      
        
       
        // update total price
        const totalPrice = cartData.reduce((acc, item) => acc + item.total, 0);
       

        // add total row
        const row1 = document.createElement('tr');
        row1.innerHTML = `
        <td></td>
        <td></td>
        <td>Total</td>
        <td>${totalPrice.toFixed(2)}</td>
        <td></td>
        `;
        cartTableBody.appendChild(row1);
        const empCartMsge = document.getElementById('empty-cart-msg');
       
            empCartMsge.style.display = 'none';
       
        const row2 = document.createElement('tr');
    
   
    
    });
    cell.appendChild(actionBtn);
    row.appendChild(cell);
    if(stock > 0) {
    document.getElementById('tbodyProductList').appendChild(row);
    }

}
async function editProduct(id, name, price, image, stock) {
    let b = { "id":id, "name": name, "price": price, "image": image, "stock": stock }
    let setting = {
        method: 'PUT',
        body: JSON.stringify(b),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`http://localhost:3000/products/${id}`, setting);
    const jsonData = await response.json();
    return jsonData;
}

const errorMessages = document.getElementById('error-message');
const loginBtn = document.getElementById('btnLogin');


document.addEventListener("DOMContentLoaded", () => {
loginBtn.addEventListener('click', async (event)=>{
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch(`http://localhost:3000/users/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 200) {

        window.location.href = '../client/product.html';
        sessionStorage.setItem('username', username);
        localStorage.setItem('LoggedIn', true);
        
    }else if(response.status === 401) {
        errorMessages.style.display = 'block';
    }
})
})
const welcome = document.getElementById('welcome');
const username = sessionStorage.getItem('username');

if (username) {
  welcome.innerHTML = `Welcome: ${username}`;
} else {
  welcome.innerHTML = 'Welcome!';
}
const signoutBtn = document.getElementById('signoutBtn');

signoutBtn.addEventListener('click', () => {
  sessionStorage.clear();
  localStorage.setItem('LoggedIn', false);
  window.location.href = '../client/index.html';
});

document.addEventListener("DOMContentLoaded", () => {
    const orderBtn = document.getElementById('btnOrder');
    orderBtn.addEventListener('click', async(event)=>{
      if (cartData.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      for(let item of cartData) {
          const id= item.id
          const quantity= item.quantity;

      const response = await fetch(`http://localhost:3000/products/${id}`);
      const responseData = await response.json();
      const newStock = responseData.stock - quantity;
      const name = responseData.name;
      const price = responseData.price;
      const image = responseData.image;
    
      const putResponse = await fetch(`http://localhost:3000/products/${name}`, {
        method: 'PUT',
        body: JSON.stringify({id, name, price, image, stock: newStock}),
        headers: { 'Content-Type': 'application/json' }
      });
      const updatedStock = await putResponse.json()
    
    };
      cartData.length = 0;
      location.reload();
      
    });
  });

