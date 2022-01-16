$(document).ready(function() {
    "use strict";
       $(".dropdown-menu a.dropdown-toggle").on("click", function(t) {
            return $(this).next().hasClass("show") || $(this).parents(".dropdown-menu").first().find(".show").removeClass("show"), $(this).next(".dropdown-menu").toggleClass("show"), !1
        }), $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        }), $(function() {
            $('[data-toggle="popover"]').popover()
        }), $("#light-dark").on("click", function(t) {console.log('color dark', $("#bootstrap-style").attr("disabled"));
            "disabled" !== $("#bootstrap-style").attr("disabled") ? ($("#bootstrap-dark-style").attr("disabled", !1), $("#bootstrap-style").attr("disabled", !0), $("#app-dark-style").attr("disabled", !1), $("#app-style").attr("disabled", !0)) : ($("#bootstrap-dark-style").attr("disabled", !0), $("#bootstrap-style").attr("disabled", !1), $("#app-dark-style").attr("disabled", !0), $("#app-style").attr("disabled", !1))
        }), Waves.init()
});