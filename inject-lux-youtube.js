// location of the hosted lux php script (can be on another machine or server)
document.luxinate_location = "http://localhost/lux/lux.php"

// AJAX call to luxinate download script
document.luxinate = function(songurl, type, source) {
    if (!type) type = "audio";
    if (!source) source = "individual";
    console.log("Fetching " + source + " " + type + " " + songurl);

    var url = document.luxinate_location + "?url=" + encodeURIComponent(songurl)+"&type="+encodeURIComponent(type)+"&source="+encodeURIComponent(source);

    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", url, false);
    xhReq.send(null);
    //return false;
    var serverResponse = xhReq.responseText;
    console.log(serverResponse);
    return false;
}

// site-specific luxinate button template
document.luxbutton_template = ['<span><button onclick="', '" class="yt-uix-button yt-uix-button-size-default yt-uix-button-text yt-uix-button-empty yt-uix-button-has-icon  yt-uix-tooltip" type="button" title="Luxinate" data-position="bottomright" data-orientation="vertical" data-force-position="true" data-button-toggle="true" data-tooltip-text="Luxinate"><span class="yt-uix-button-icon-wrapper"><img src="http://localhost/lux/lux.png" style="height: 20px;" class="yt-uix-button-icon yt-sprite" alt="Luxinate"></span></button></span>'];

// generic luxbutton builder based on site-specific luxbutton_template, url, type, and source
var get_luxbutton = function(url, type, source) {
    if (!type) type = "audio";
    if (!source) source = "individual";
    var onclickevent = "document.luxinate('"+url+"','"+type+"','"+source+"')";
    return document.luxbutton_template[0] + onclickevent + document.luxbutton_template[1]
}

// specific button builders (url extraction logic may change based on source and type)
var get_individual_luxbutton = function() {
    var url = document.location.toString();
    if (!url) return "";
    return get_luxbutton(url, 'audio', 'individual');
}
var get_user_luxbutton = function() {
    var url = document.location.toString();
    if (!url) return "";
    return get_luxbutton(url, 'audio', 'user');
}
var get_playlist_luxbutton = function() {
    var url = document.location.toString();
    if (!url) return "";
    return get_luxbutton(url, 'audio', 'playlist');
}

// site-specific injection logic
document.inject_luxbuttons = function() {
    var buttongroup = document.getElementById('watch-like-dislike-buttons');
    if (buttongroup && !(buttongroup.classList.contains('haslux'))) {
            var button_html = get_individual_luxbutton();
            if (button_html) {
                buttongroup.innerHTML += button_html;
                console.log("Added individual luxbutton.");
            }
            buttongroup.classList.add('haslux');
    }
}

// run once on initial pageload
document.inject_luxbuttons();

// run whenever ajax content gets added to the page
//$(document).ajaxStop(document.inject_luxbuttons);

// run again on pageload finish
if (window.addEventListener) window.addEventListener('load', document.inject_luxbuttons, false);    // Normal, Sane W3C-compliant browsers (chrome, firefox, safari)
else if (window.attachEvent) window.attachEvent('onload', document.inject_luxbuttons);              // Ugh, Microsoft (IE7+)
