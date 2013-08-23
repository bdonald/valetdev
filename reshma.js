//Checkout

! function () {
    "use strict";
    angular.module("valetGuestApp", ["firebase"]).config(["$routeProvider",
        function (a) {
            return a.when("/pledge", {
                templateUrl: "views/pledge.html",
                controller: "PledgeCtrl"
            }).when("/checkout", {
                templateUrl: "views/checkout.html",
                controller: "PledgeCtrl"
            }).otherwise({
                redirectTo: "/pledge"
            })
        }
    ])
}.call(this),
function () {
    "use strict";
    angular.module("valetGuestApp").controller("PledgeCtrl", ["$scope", "angularFire",
        function (a, b) {
            var c;
            return c = b("https://valetmap.firebaseio.com/", a, "pledges", []), a.pledge = {}, c.then(function () {
                return a.pledgeTotal = function () {
                    var b;
                    return b = 0, a.pledges && a.pledges.forEach(function (c) {
                        return b += c.amount, b += a.matchAmount(c.amount)
                    }), b
                }, a.toggleStatus = function (a) {
                    return "undefined" == typeof a.paid ? (a.paid = !0, !0) : a.paid = !a.paid
                }, a.matchAmount = function (a) {
                    return 175 >= a ? 6 * a : 1050
                }, a.addPledge = function (b) {
                    var c;
                    if ("number" != typeof b.amount) {
                        if (c = parseInt(b.amount), isNaN(c)) return !1;
                        b.amount = c
                    }
                    return a.pledgeSheet.$invalid ? (console.log("Invalid pledge attempted"), !1) : (b.timestamp = Date.now(), console.log(b), a.pledges.push(b), a.pledge = {}, a.completedPledge = b)
                }
            })
        }
    ])
}.call(this);



