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


    $.ajax(
        {
            url: 'data/customers.json',
            success: function(result) {
                let list = '';
                customers = result;
                customers.forEach( (element, index) => {
                    element.__proto__ = cutomerMethods;
                    list += element.rowList(index);
                });
                $("#customerlist").html(list);
                $("#customerlist>div[order]").click( function() {
                    pageAction[pageSelection](this);
                })
            } 
        }
    );

});