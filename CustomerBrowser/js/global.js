// globals
let customers;
let orders;
let orderDetails;


let pageSelection = "p2";
let pageAction = {
    p1: showCustomerDetails,
    p2: showCustomerOrders,
    od: showOrderDetails
}


// Customers
function showCustomerDetails(thisObj) {
    let index = $(thisObj).attr('order') | 0; // cast it to number
    let card = customers[index].card();
    $("section").html(card);
}


// orders
//http://localhost:8090/CustomerBrowser/ALFKI/orders
function showCustomerOrders(thisObj) {
    let CustomerID = thisObj.id;
    let url = `http://localhost:8090/CustomerBrowser/${CustomerID}/orders`;
    //url = 'data/orders.json' // for testing
    $.ajax(
        {
            url: url,
            success: function(result) {
                orders = result;
                let list = `<table border="1"><caption id="${thisObj.id}">Orders For Customer:${thisObj.innerText}</caption>`;
                orders.forEach( (element, index) => {
                    element.__proto__ = orderMethods;
                    list += element.createTableRow(index);
                });
                list += "</table>";
                $("#orders").html(list);
                $("#orderdetails").html("Order Details");
                
                $(".orderButton").click( function() {
                    pageAction['od'](this);
                })
            },
            error: function() {
                alert("Error!!!!!");
            }
        }
    );
}

// serve as customers prototype by setting __proto__
let cutomerMethods = {
    card: function()  { 
        let buffer = 'Customer Card';
        for (key in this) {
            if (!$.isFunction(this[key])) {
                 buffer += `<div>${key} - ${this[key]}</div>\n`
            }
        }
        return buffer;
    },
    rowList: function(index) {
        let buffer = '';
        buffer = `<div id='${this.CustomerID}' order='${index}'  title='${this.ContactName}'>${this.CompanyName}</div>`
        return buffer;
    }
}

// error this will save the window as this
// let cutomerMethods = {
//     card: () => { },
//     rowList: () => {alert(this)}
// }

// Orders
let orderMethods = {
    createRowHeader: function() {
        return "row header";
    },
    createTableRow : function() {
        let tr = '<tr>';
        tr += `<td title='Show order details'><a href='#' class='orderButton'>${this.OrderID}</a></td>`
        tr += `<td title='OrderDate'>${this.OrderDate}</td>`
        tr += `<td title='RequiredDate'>${this.RequiredDate}</td>`
        tr += `<td title='ShippedDate'>${this.ShippedDate}</td>`
        tr += `<td title='ShipCity'>${this.ShipCity}</td>`
        tr += `<td title='ShipCountry'>${this.ShipCountry}</td>`
        tr += "</tr>";
        return tr;
    }
}


let orderDetailsMethods = {
    createRowHeader: function() {},
    createTableRow: function() {
        let row = "<TR>"
        row += `<TD title='ProductName'>${this.ProductName}</TD>`;
        row += `<TD title='UnitPrice'>${this.UnitPrice}</TD>`;
        row += `<TD title='Quantity'>${this.Quantity}</TD>`;
        row += `<TD title='total'>${this.UnitPrice*this.Quantity}</TD>`;
        row += `<TD title='Discount'>${this.Discount}</TD>`;
        row += `</TR>`;
        return row;
    }
}


// Order Details
function showOrderDetails(thisObj) {
    let orderID = thisObj.innerText;
    let url = `http://localhost:8090/CustomerBrowser/${orderID}/details`;
    //url = 'data/orderdetails.json' // for testing
    $.ajax(
        {
            url: url,
            success: function(result) {
                orderDetails = result;
                let list = `<table id="od"  border="1"><caption>Orders details For Order:${thisObj.innerText}</caption>`;
                orderDetails.forEach( (element, index) => {
                    element.__proto__ = orderDetailsMethods;
                    list += element.createTableRow(index);
                });
                list += "</table>";
                $("#orderdetails").html(list);
            } 
        }
    );    
}

