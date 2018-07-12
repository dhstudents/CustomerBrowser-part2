$(document).ready(function () {
    $("input[type='radio']")
        .click(function () {
            if ($(this).attr('id') === "p1") {
                $("#page1").hide();
                $("#page2").show();
            } else {
                $("#page2").hide();
                $("#page1").show();
            }
        })


    
});