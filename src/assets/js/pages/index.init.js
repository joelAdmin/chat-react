$(document).ready(function() {
    $(".popup-img").magnificPopup({
            type: "image",
            closeOnContentClick: !0,
            mainClass: "mfp-img-mobile",
            image: { verticalFit: !0 }
        }),
        $("#user-status-carousel").owlCarousel({
            items: 4,
            loop: !1,
            margin: 16,
            nav: !1,
            dots: !1
        }),
        $("#user-profile-hide").click(function() {
            $(".user-profile-sidebar").hide()
        }),
        $(".user-profile-show").click(function() {
            $(".user-profile-sidebar").show()
        }),

        $(".chat-user-list li a").click(function() {
            $(".user-chat").addClass("user-chat-show")
        }),

        $(".contact-list li a").click(function() {
            $(".user-chat").addClass("user-chat-show")
        }),

        $(".item a").click(function() {
            $(".user-chat").addClass("user-chat-show")
        }),

        $(".user-chat-remove").click(function() {
            $(".user-chat").removeClass("user-chat-show")
        })
});