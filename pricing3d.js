// Slider Settings -----
var slider_value = 0,
    // to get value: excecute $slider.slider('value') on live page

    // -- For the "amount flag" --
    flag_text = "0 - 1K", // change the text of the "amount flag"
    change_amount_flag_margin = false, // Change margin on page load, set to true
    amount_flag_margin = '-62px'; // left-margin of the "amount flag"
// end Slider settings -----

var pricesMonthlyStarter, pricesMonthlyStarter_was, pricesMonthlyProfesional, pricesMonthlyProfesional_was, pricesMonthlyAgency, pricesMonthlyAgency_was, pricesAnnualyStarter, pricesAnnualyStarter_was, pricesAnnualyProfesional, pricesAnnualyProfesional_was, pricesAnnualyAgency, pricesAnnualyAgency_was, sliderAmountMap = [1e3, 3e3, 5e3, 1e4, 15e3, 2e4, 3e4, 5e4, 1e5, 3e5, 5e5, 1e6, 1000001],
    eBayTab = $("#eBay-tab"),
    HelpdeskTab = $("#Helpdesk-tab");

function setPrice(e) {
    if (e <= 1e3) $("#amount").text("0 - 1K");
    else if (e > 1e3 && e < 1e6) {
        var n = Math.round(e) / 1e3;
        $("#amount").text("Up to: " + n + "K")
    } else {
        n = 1;
        $("#amount").text("Over " + n + "M")
    }
}

//document.styleSheets[0].cssRules[0].style.setProperty('--amount-before-margin-right', 0);
function maxTooltipMargin(n) {
    var t = $('.amount').outerWidth(),
        s = $('.slider').outerWidth(),
        m = s - t,
        a;
    n > m ? a = m : a = n;
    //n > m ? document.styleSheets[0].cssRules[0].style.setProperty('--amount-before-margin-right', (t - n) + "px") : document.styleSheets[0].cssRules[0].style.setProperty('--amount-before-margin-right', 0);
    return a;
}

function setPacketsPrices(e) {
    e > 8 && (
            $("#monthly_starter").closest(".pricing-plans--item").hide(),
            $("#monthly_profesional").closest(".pricing-plans--item").hide,
            $("#annualy_starter").closest(".pricing-plans--item").hide(),
            $("#annualy_profesional").closest(".pricing-plans--item").hide,
            $(".tool-span").hide()), e <= 8 && (
            $("#monthly_starter").closest(".pricing-plans--item").show(),
            $("#monthly_profesional").closest(".pricing-plans--item").show(),
            $("#annualy_starter").closest(".pricing-plans--item").show(),
            $("#annualy_profesional").closest(".pricing-plans--item").show,
            $(".tool-span").show()
        ),
        $("#monthly_starter .pricing-change").text(pricesMonthlyStarter[e]),
        $("#monthly_profesional .pricing-change").text(pricesMonthlyProfesional[e]),
        $("#monthly_agency .pricing-change").text(pricesMonthlyAgency[e]),
        $("#annualy_starter .pricing-change").text(pricesAnnualyStarter[e]),
        $("#annualy_profesional .pricing-change").text(pricesAnnualyProfesional[e]),
        $("#annualy_agency .pricing-change").text(pricesAnnualyAgency[e]),
        // --- was
        $("#monthly_starter_was .pricing-change").text(pricesMonthlyStarter_was[e]),
        $("#monthly_profesional_was .pricing-change").text(pricesMonthlyProfesional_was[e]),
        $("#monthly_agency_was .pricing-change").text(pricesMonthlyAgency_was[e]),
        $("#annualy_starter_was .pricing-change").text(pricesAnnualyStarter_was[e]),
        $("#annualy_profesional_was .pricing-change").text(pricesAnnualyProfesional_was[e]),
        $("#annualy_agency_was .pricing-change").text(pricesAnnualyAgency_was[e])
}
var _c$ = 0; // dirty fix for "left" error
$(".pricing-main-tab").on("click", function() {
        switch ($(this).attr("id")) {
            case "#Helpdesk-tab":
                $("#sales-slider").hide();
                break;
            default:
                $("#sales-slider").show()
        }
    }),
    pricesMonthlyStarter = [16, 25, 39, 60, 79, 105, 132, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesMonthlyStarter_was = [20, 31, 49, 75, 99, 131, 165, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesMonthlyProfesional = [20, 38, 52, 79, 113, 140, 172, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesMonthlyProfesional_was = [25, 48, 65, 99, 141, 175, 215, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesMonthlyAgency = [25, 47, 65, 100, 140, 172, 220, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesMonthlyAgency_was = [31, 59, 81, 125, 175, 215, 275, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesAnnualyStarter = [12, 19, 29, 45, 59, 79, 99, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesAnnualyStarter_was = [20, 32, 48, 75, 98, 132, 165, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesAnnualyProfesional = [15, 29, 39, 59, 85, 105, 129, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesAnnualyProfesional_was = [25, 48, 65, 98, 142, 175, 215, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesAnnualyAgency = [19, 35, 49, 75, 105, 129, 165, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],
    pricesAnnualyAgency_was = [32, 58, 82, 125, 175, 215, 275, "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us", "Contact Us"],

    HelpdeskTab.is(".w--current") && (null), $(function() {
        $slider = $("#slider").slider({
                range: "min",
                step: 1e-4,
                max: sliderAmountMap.length - 1,
                slide: function(e, n) {
                    var t = Math.floor(n.value);
                    setPrice(sliderAmountMap[t]), setPacketsPrices(t);
                    if (_c$ > 0) { // dirty fix for "left" error
                        var a = $(this).find(".ui-slider-handle:first").position(),
                            i = parseInt(a.left);
                        $(".amount").css("margin-left", maxTooltipMargin(i) + "px");
                    }
                    //const s = window.matchMedia("(max-width: 767px)");
                    //s.matches ? $(".amount").css("margin-left", i + "px") : s.matches || $(".amount").css("margin-left", i /*- 63*/ + "px");
                    // -- hide and show currency/ links for "Contact US"
                    $('#price-key').each(function() {
                        var curr = $('.pricing-currency'),
                            mo = $('.pricing-per-month-span'),
                            bill = $('.billed'),
                            chat = $('.pricing-chat-link'),
                            price = $('.pricing-change');
                        switch ($(this).text()) {
                            case ("Contact Us"):
                                $(curr).add(mo).add(bill).hide();
                                $(price).addClass('c');
                                $(chat).css({ 'display': 'block' });
                                $(".price.was").hide();
                                break;
                            default:
                                $(curr).add(mo).add(bill).attr('style', "");
                                $(price).removeClass('c');
                                $(chat).hide();
                                $(".price.was").show();
                        };
                    });
                    _c$ = _c$ + 1;// dirty fix for "left" error
                    // -- end hide show currency/ links 
                }
            }),
            $("#amount").text(flag_text),
            // set default to 3k
            $slider.slider('value', slider_value),
            $slider.slider('option', 'slide')(null, { value: $slider.slider('value') });
    }), $(document).ready(function() {
        $(".pricing-faq--question").on("click", function() {
            $(this).toggleClass("active")
        }), $("a[data-w-tab='Tab 1']").on("click", function() {
            $(".text-plan").text("Annualy")
        }), $("a[data-w-tab='Tab 2']").on("click", function() {
            $(".text-plan").text("Monthly")
        })
    });

// Set Slider
// amount position
if (change_amount_flag_margin) {
    $(window).on('load', function() {
        $(".amount").css({ 'margin-left': amount_flag_margin });
    });
}
