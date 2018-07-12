// http://localhost:8090/Customers
// http://localhost:8090/{Customer}/orders
// http://localhost:8090/{order}/details

$(document).ready(function () {
    $("input[type='radio']")
            .click(function () {
                if ($(this).attr('id') === "p1") {
                    $("#page2").hide();
                    $("#page1").show();
                    pageSelection = "p2";
                } else {
                    $("#page1").hide();
                    $("#page2").show();
                    pageSelection = "p1";
                }
            });
            
// how to control new page
//https://stackoverflow.com/questions/1664049/can-i-force-a-page-jump-in-html-printing
//https://stackoverflow.com/questions/21269836/how-to-define-page-breaks-when-printing-html
//https://www.w3schools.com/cssref/pr_print_pageba.asp
//https://www.youtube.com/watch?v=UxRz6o-4Q-8    
    $(document).keypress(function (event) {
        event.preventDefault();
        switch (event.which) {
            case 32:  // spaceo
               window.print();
               break;
           case 99: // c : Customers
               let saveContent = window.document.body.innerHTML;
//             window.document.body.innerHTML = document.getElementById("customerlist").innerHTML               
               window.document.body.innerHTML = $("#customerlist").html();
               window.print();
               window.document.body.innerHTML = saveContent; // restore the esaved content
               break;
           case 111: // o ; Customer + orders
               // new Tab
               // let coprint = window.open("about:blank",'PrintDoc');
               // new Window
               let coprint = window.open("about:blank",'PrintDoc', "height=200,width=200");
               coprint.document.writeln(`<button onclick="this.style.display='none';window.print();window.close();">Print</button><hr>`);
               let custid = document.querySelector("caption[id]").id;
               let customer = customers.find( function(element) { return element.CustomerID === custid });
               coprint.document.writeln(customer.card());
               coprint.document.writeln(`<div style="page-break-before: always;"></div>`);
               let orderlist = document.getElementById("orders");
               coprint.document.writeln(orderlist.innerHTML);
                // print customer + orders 
               break;
        }
    });



    $.ajax(
            {
                url: 'http://localhost:8090/CustomerBrowser/Customers',
                success: function (result) {
                    let list = '';
                    customers = result;
                    customers.forEach((element, index) => {
                        element.__proto__ = cutomerMethods;
                        list += element.rowList(index);
                    });
                    $("#customerlist").html(list);
                    $("#customerlist>div[order]").click(function () {
                        pageAction[pageSelection](this);
                    })
                }
            }
    );

});