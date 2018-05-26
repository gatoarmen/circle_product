!function(e, t) {
    var a = {
        catchMethods: {
            methodreturn: [],
            count: 0
        },
        init: function(t) {
            var a, r, n;
            t.originalEvent.origin.match(/vimeo/g) && "data"in t.originalEvent && (n = "string" === e.type(t.originalEvent.data) ? e.parseJSON(t.originalEvent.data) : t.originalEvent.data) && (a = this.setPlayerID(n),
            a.length && (r = this.setVimeoAPIurl(a),
            n.hasOwnProperty("event") && this.handleEvent(n, a, r),
            n.hasOwnProperty("method") && this.handleMethod(n, a, r)))
        },
        setPlayerID: function(t) {
            return e("iframe[src*=" + t.player_id + "]")
        },
        setVimeoAPIurl: function(e) {
            return "http" !== e.attr("src").substr(0, 4) ? "https:" + e.attr("src").split("?")[0] : e.attr("src").split("?")[0]
        },
        handleMethod: function(e) {
            this.catchMethods.methodreturn.push(e.value)
        },
        handleEvent: function(t, a, r) {
            switch (t.event.toLowerCase()) {
            case "ready":
                for (var n in e._data(a[0], "events"))
                    n.match(/loadProgress|playProgress|play|pause|finish|seek|cuechange/) && a[0].contentWindow.postMessage(JSON.stringify({
                        method: "addEventListener",
                        value: n
                    }), r);
                if (a.data("vimeoAPICall")) {
                    for (var i = a.data("vimeoAPICall"), o = 0; o < i.length; o++)
                        a[0].contentWindow.postMessage(JSON.stringify(i[o].message), i[o].api);
                    a.removeData("vimeoAPICall")
                }
                a.data("vimeoReady", !0),
                a.triggerHandler("ready");
                break;
            case "seek":
                a.triggerHandler("seek", [t.data]);
                break;
            case "loadprogress":
                a.triggerHandler("loadProgress", [t.data]);
                break;
            case "playprogress":
                a.triggerHandler("playProgress", [t.data]);
                break;
            case "pause":
                a.triggerHandler("pause");
                break;
            case "finish":
                a.triggerHandler("finish");
                break;
            case "play":
                a.triggerHandler("play");
                break;
            case "cuechange":
                a.triggerHandler("cuechange")
            }
        }
    };
    jQuery(document).ready(function() {
        e("iframe[src*='vimeo.com']").each(function(t) {
            var a = e(this).attr("src");
            if (null === a.match(/player_id/g)) {
                var r = -1 === a.indexOf("?") ? "?" : "&"
                  , n = e.param({
                    api: 1,
                    player_id: "vvvvimeoVideo-" + t
                });
                e(this).attr("src", a + r + n)
            }
        })
    }),
    e(t).on("message", function(e) {
        a.init(e)
    }),
    e.vimeo = function(e, r, n) {
        var i = {}
          , o = a.catchMethods.methodreturn.length;
        if ("string" == typeof r && (i.method = r),
        void 0 !== typeof n && "function" != typeof n && (i.value = n),
        "iframe" === e.prop("tagName").toLowerCase() && i.hasOwnProperty("method"))
            if (e.data("vimeoReady"))
                e[0].contentWindow.postMessage(JSON.stringify(i), a.setVimeoAPIurl(e));
            else {
                var s = e.data("vimeoAPICall") ? e.data("vimeoAPICall") : [];
                s.push({
                    message: i,
                    api: a.setVimeoAPIurl(e)
                }),
                e.data("vimeoAPICall", s)
            }
        return "get" !== r.toString().substr(0, 3) && "paused" !== r.toString() || "function" != typeof n || (function(e, r, n) {
            var i = t.setInterval(function() {
                a.catchMethods.methodreturn.length != e && (t.clearInterval(i),
                r(a.catchMethods.methodreturn[n]))
            }, 10)
        }(o, n, a.catchMethods.count),
        a.catchMethods.count++),
        e
    }
    ,
    e.fn.vimeo = function(t, a) {
        return e.vimeo(this, t, a)
    }
}(jQuery, window);
$(".js-accordion-trigger").bind("click", function(e) {
    $(this).parent().parent().toggleClass("is-expanded"),
    e.preventDefault()
}),
$(".js-mobile-menu-trigger").bind("click", function(e) {
    $(".nav-mobile").toggleClass("is-expanded"),
    e.preventDefault()
}),
$(function() {
    $("#modal-1").on("change", function() {
        $(this).is(":checked") ? ($("body").addClass("modal-open"),
        $("#masthead-video").vimeo("play")) : ($("body").removeClass("modal-open"),
        $("#masthead-video").vimeo("pause"))
    }),
    $("#modal-2").on("change", function() {
        $(this).is(":checked") ? ($("body").addClass("modal-open"),
        $("#footer-video").vimeo("play"),
        $("#scene-buy-now-detail .content").addClass("video")) : ($("body").removeClass("modal-open"),
        $("#scene-buy-now-detail .content").removeClass("video"),
        $("#footer-video").vimeo("pause"))
    }),
    $(".modal-fade-screen, .modal-close").on("click", function() {
        $(".modal-state:checked").prop("checked", !1).change(),
        $("#masthead-video").vimeo("pause")
    }),
    $(".modal-fade-screen, .modal-close").on("click", function() {
        $(".modal-state:checked").prop("checked", !1).change(),
        $("#footer-video").vimeo("pause")
    }),
    $(".modal-inner").on("click", function(e) {
        e.stopPropagation(),
        $("#masthead-video").vimeo("pause")
    }),
    $(".modal-inner").on("click", function(e) {
        e.stopPropagation(),
        $("#footer-video").vimeo("pause")
    })
}),
$(".grid-reveal .grid-item").on("click", function() {
    $(this).children("p").toggleClass("open")
}),
-1 !== document.URL.indexOf("app=true") && ($("header, .masthead, footer").hide(),
$("#content").addClass("no-margin")),
$(".country-selector a").click(function(e) {
    $("#contact-info-container").addClass("is-expanded"),
    e.preventDefault()
}),
$(".country-selector a").click(function(e) {
    $("#contact-info-container .content").hide(),
    $("#" + $(this).attr("href")).show(),
    e.preventDefault()
}),
$("#press-articles-expand").on("click", function(e) {
    $(this).hide(),
    $("#more-articles").addClass("show"),
    e.preventDefault()
}),
$("#go-setup-ios-trigger").on("click", function(e) {
    $("#go-setup-android").removeClass("show"),
    $("#go-setup-chooser a").removeClass("active"),
    $("#go-setup-ios").addClass("show"),
    $(this).addClass("active"),
    e.preventDefault()
}),
$("#go-setup-android-trigger").on("click", function(e) {
    $("#go-setup-ios").removeClass("show"),
    $("#go-setup-chooser a").removeClass("active"),
    $("#go-setup-android").addClass("show"),
    $(this).addClass("active"),
    e.preventDefault()
}),
$(".netgear-feature").addClass("on"),
$(".netgear-feature").on("click", function(e) {
    var o = $(this).attr("href");
    e.preventDefault(),
    $(".icon-list-tab").removeClass("active"),
    $(".netgear-feature").removeClass("active").removeClass("on"),
    $(this).addClass("active"),
    $(o).addClass("active")
}),
$("#subcription-picker a").on("click", function(e) {
    var o = $(this).attr("href");
    e.preventDefault(),
    $("#subcription-picker a").removeClass("active"),
    $("#subcription-content ul").removeClass("active"),
    $("#subcription-image img").removeClass("active"),
    $(this).addClass("active"),
    $("#" + o + "-list").addClass("active"),
    $("#" + o + "-image").addClass("active")
}),
-1 !== document.URL.indexOf("ref=disneyVideo") && ($("#disneyHeader").show(),
$("#disney-video").attr("src", "https://player.vimeo.com/video/198241152?api=1&player_id=masthead-video&title=0&byline=0&portrait=0&color=00b7d9&autoplay=1&quality=360p"),
$(".modal-trigger").hide());
