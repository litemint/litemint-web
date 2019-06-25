///////////////////////////////////////////////////////////////////////////////
// file index.js
// Copyright (c) 2018 Frédéric J. Rézeau. All rights reserved.
///////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    "use strict";

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Smooth scrolling.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    $("#wallet-count").animate(
        { value: parseInt($("#wallet-count").html()) },
        {
            duration: 1000,
            step: function (now) { $(this).html(numberWithCommas(parseInt(now))); }
        });

    // Burger menu.
    (function () {
        var burger = document.querySelector('.navbar-burger');
        var menu = document.querySelector('#' + burger.dataset.target);
        burger.addEventListener('click', function () {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    })();
    // Top menu styling.
    $(window).scroll(function () {
        var pos = $(window).scrollTop();
        if (pos === 0) {
            $("#navbar").removeClass('site-navbar-scrolled');
        }
        else {
            $("#navbar").addClass('site-navbar-scrolled');
        }
    });

    $(".close-modal").click(function () {
        $("#modalbox").removeClass("is-active");
    });

    $("#app-launcher").click(function () {
        window.location = "https://litemint.app";
    });

    $.ajax("https://api.litemint.com/.market/getrates").then(
        function success(response) {
            var fee = "$" + (1 / response["XLM"].rate * 0.00001).toFixed(7); // 100 stroop
            $("#fee").html(fee);
        }
    );
});
