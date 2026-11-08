let orders = JSON.parse(localStorage.getItem("orders")) || [];

let customer = document.getElementById("name");
let service = document.getElementById("service");
let quantity = document.getElementById("quantity");
let price = document.getElementById("price");
let date = document.getElementById("date");

let addOrderButton = document.getElementById("add-order");
let emptyState = document.getElementById("empty-state");
let orderList = document.getElementById("order-list");
let clearOrder = document.getElementById("clear-order");
let totalOrder = document.getElementById("total-order");


function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
};


function displayOrder() {
    orderList.innerHTML = "";

    orders.forEach((order, index) => {
        let row = `
        <tr>
            <td>${order.customer}</td>
            <td>${order.service}</td>
            <td>${order.quantity}</td>
            <td>${order.price}</td>
            <td>${order.date}</td>
            <td><button class="delete_btn" data-index="${index}">Delete</button></td>
        </tr>`;

        orderList.innerHTML += row;
    });

    totalOrder.textContent = orders.length;

    if (orders.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
};

// delete button
orderList.addEventListener("click", function(event) {
    console.log("Clicked:", event.target);
    if (event.target.classList.contains("delete_btn")) {
        let index = Number(event.target.dataset.index);
        console.log("deleting index:", index);

        orders.splice(index, 1);
        saveOrders();
        displayOrder();
    }
});

console.log("delete listener registered:", orderList);



addOrderButton.addEventListener("click", function(){

    //alert("service is: [" + service.value + "]");

    if (customer.value.trim() === "" || 
    service.value === "" || 
    quantity.value === "" || 
    Number(quantity.value) <= 0 || 
    price.value === "" || 
    Number(price.value) <= 300 || 
    date.value === "") {
        alert("Input a valid order");
        return;
    }

    console.log("button clicked");

    let newOrder = {
        customer: customer.value,
        service: service.value,
        quantity: Number(quantity.value),
        price: Number(price.value),
        date: date.value
    };

    orders.unshift(newOrder);
    saveOrders();
    displayOrder();

    customer.value = "";
    service.selectedIndex = 0;
    quantity.value = "";
    price.value = "";
    date.value = "";

});

// The delete button listener

clearOrder.addEventListener("click", function() {
    let answer = confirm("Are you sure you want to clear all orders?");
    
    if (answer) {
        orders = [];
        saveOrders();
        displayOrder();
    }
});

displayOrder();