/**
 * -------------------------------------------------------------
 *  
 * File: main.js
 * Project: Amoplex Technologies
 * File Created: Thursday, 14th January 2021 1:10:10 pm
 * Author: Lucas Schüller (lucas@amoplex.de)
 * -----
 * Last Modified: Thursday, 14th January 2021 1:10:13 pm
 * Modified By: Lucas Schüller (lucas@amoplex.de)
 * -----
 * Copyright - 2021 Amoplex Technologies
 *  
 * -------------------------------------------------------------
 */

let json = null;

function loadJson() {
    let link = location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/assets/json/team.json";
    $.getJSON(link, function(data) {
        json = data;
    }).done(function() {
        nextMember();
    });
}


$(document).ready(function() {
    loadJson();

    $(".darkmode").on("click", function() {
        if ($("body").attr("data-dark") === "true") {
            $("body").removeAttr("data-dark");
        } else {
            $("body").attr("data-dark", "true");
        }
    });
});

function previousMember() {
    selector = ".modal .description ";

    let previousIndex = parseInt($(".modal").data("index"));
    let index = previousIndex - 1;

    if (index < 0) index = json.length - 1;
    generateHTML(index);

    animateElement(".description .exchange" + previousIndex + "1", "slideOutRight", function(index) {
        $(selector + ".exchange" + previousIndex + "1").remove();
        $(selector + ".exchange" + index + "1").show();
        animateElement(selector + ".exchange" + index + "1", "slideInLeft");
    }, index);
    animateElement(".description .exchange" + previousIndex + "2", "slideOutRight", function(index) {
        $(selector + ".exchange" + previousIndex + "2").remove();
        $(selector + ".exchange" + index + "2").show();
        animateElement(selector + ".exchange" + index + "2", "slideInLeft");
    }, index);
    animateElement(".img img.exchange" + previousIndex + "3", "slideOutDown", function(index) {
        $(".img img.exchange" + previousIndex + "3").hide();
        $(".img img.exchange" + index + "3").show();
        animateElement(".img img.exchange" + index + "3", "slideInDown");
    }, index);
}

function nextMember() {
    selector = ".modal .description ";

    if (json == null) {
        return;
    }

    if (typeof $(".modal").data("index") === "undefined") {
        $(selector + ".exchange1").addClass("exchange01");
        $(selector + ".exchange2").addClass("exchange02");

        $(selector + ".exchange1").removeClass("exchange1");
        $(selector + ".exchange2").removeClass("exchange2");

        let data = json[0];
        $(".modal .img img").attr("src", data.img);
        $(".modal .img img").attr("alt", data.name);
        $(".modal .img img").addClass("exchange03");

        let html = `<li class="name"><h1>${data.name}<span>, ${data.age}</span></h1></li>`;
        html += `<li class="bio"><p>${data.bio}</p></li>`;
        $(selector + ".exchange01").html(html);

        html = `<ul class="contact"><li>PHONE: <a href="tel://${data.phone}">${data.phone}</a></li>`;
        html += `<li>E-MAIL: <a href="mailto://${data.email}">${data.email}</a></li></ul>`;
        $(selector + ".exchange02").html(html);
        $(".modal").data("index", "0");

        json.forEach(function(member, index) {
            if (index !== 0) $(".modal .img").append(`<img src="${member.img}" alt="${member.name}" class="exchange${index}3" style="display: none;">`);
        });

        $(".modal").addClass("animate__slow");
        $(".modal").show();
        animateElement(".modal", "fadeInDownBig");
        return;
    }

    let previousIndex = parseInt($(".modal").data("index"));
    let index = previousIndex + 1;

    if (index >= json.length) index = 0;
    generateHTML(index);

    animateElement(".description .exchange" + previousIndex + "1", "slideOutLeft", function(index) {
        $(selector + ".exchange" + previousIndex + "1").remove();
        $(selector + ".exchange" + index + "1").show();
        animateElement(selector + ".exchange" + index + "1", "slideInRight");
    }, index);
    animateElement(".description .exchange" + previousIndex + "2", "slideOutLeft", function(index) {
        $(selector + ".exchange" + previousIndex + "2").remove();
        $(selector + ".exchange" + index + "2").show();
        animateElement(selector + ".exchange" + index + "2", "slideInRight");
    }, index);
    animateElement(".img img.exchange" + previousIndex + "3", "slideOutUp", function(index) {
        $(".img img.exchange" + previousIndex + "3").hide();
        $(".img img.exchange" + index + "3").show();
        animateElement(".img img.exchange" + index + "3", "slideInUp");
    }, index);
}

function generateHTML(index) {
    let html = "";
    let data = json[index];
    let selector = ".modal .description ";
    $(".modal").data("index", "" + index);

    html += `<div class="exchange${index}1"><li class="name"><h1>${data.name}<span>, ${data.age}</span></h1></li>`;
    html += `<li class="bio"><p>${data.bio}</p></li></div>`;
    $(selector).prepend(html);

    $(selector + ".social .youtube").attr("href", data.social.youtube);
    $(selector + ".social .twitter").attr("href", data.social.twitter);
    $(selector + ".social .facebook").attr("href", data.social.facebook);
    $(selector + ".social .linkedin").attr("href", data.social.linkedin);


    html = "";
    html += `<div class="exchange${index}2"><ul class="contact"><li>PHONE: <a href="tel://${data.phone}">${data.phone}</a></li>`;
    html += `<li>E-MAIL: <a href="mailto://${data.email}">${data.email}</a></li></ul></div>`;
    $(html).insertAfter(selector + ".social");
    $(selector + `.exchange${index}1`).hide();
    $(selector + `.exchange${index}2`).hide();
}

function animateElement(element, animationName, callback, callbackParam = null) {
    const node = document.querySelector(element);
    node.classList.add('animate__animated', "animate__" + animationName);

    function handleAnimationEnd() {
        node.classList.remove('animate__animated', "animate__" + animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') {
            if (callbackParam !== null) {
                callback(callbackParam);
            } else {
                callback();
            }
        }

    }
    node.addEventListener('animationend', handleAnimationEnd);
}