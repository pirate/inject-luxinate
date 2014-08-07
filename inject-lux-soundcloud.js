// location of the hosted lux php script (can be on another machine or server)
document.luxinate_location = "http://localhost/lux/lux.php"

// AJAX call to luxinate download script
document.luxinate = function(songurl, type, source) {
    if (!type) type = "audio";
    if (!source) source = "individual";
    console.log("Fetching " source + " " + type + " " + songurl);

    var url = document.luxinate_location + "?url=" + encodeURIComponent(songurl)+"&type="+encodeURIComponent(type)+"&source="+encodeURIComponent(source);

    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", url, false);
    xhReq.send(null);
    var serverResponse = xhReq.responseText;
    console.log(serverResponse);
}

// site-specific luxinate button template
document.luxbutton_template = ['<a href="#" onclick="','" class="sc-button sc-button-small sc-button-responsive sc-button-download sc-button-lux" title="Download this track with Luxinate." tabindex="0">Lux</a>"'];

// generic luxbutton builder based on site-specific luxbutton_template, url, type, and source
var get_luxbutton = function(url, type, source) {
    if (!type) type = "audio";
    if (!source) source = "individual";
    var onclickevent = "document.luxinate('"+url+"','"+type+"','"+source+"')";
    return document.luxbutton_template[0] + onclickevent + document.luxbutton_template[1]
}

// specific button builders (url extraction logic may change based on source and type)
var get_individual_luxbutton = function(buttongroup) {
    var url = "http://soundcloud.com" + buttongroup.parents('.sound').find('.soundTitle__title').attr('href');
    return get_luxbutton(url);
}
var get_user_luxbutton = function() {
    var url = "http://soundcloud.com" + buttongroup.parents('.sound').find('.soundTitle__title').attr('href');
    return get_luxbutton(url, "audio", "user");
}
var get_playlist_luxbutton = function(buttongroup) {
    var url = "http://soundcloud.com" + buttongroup.parents('.sound').find('.soundTitle__title').attr('href');
    return get_luxbutton(url, "audio", "playlist");
}

// site-specific injection logic
document.inject_luxbuttons = function() {
    $('.playlist .sound__soundActions').not('.haslux').each(function(i, obj) {
        if ($(obj).find(".sc-button-group").length !== 0) {
            var buttongroup = $(obj).find(".sc-button-group").first();
            var luxbutton = $(get_playlist_luxbutton(buttongroup));
            buttongroup.append(luxbutton);
            $(obj).addClass('haslux');
            console.log("Added playlist luxbutton.");
        }
    });
    $('.sound__soundActions').not('.haslux').each(function(i, obj) {
        if ($(obj).find(".sc-button-group").length !== 0) {
            var buttongroup = $(obj).find(".sc-button-group").first();
            var luxbutton = $(get_individual_luxbutton(buttongroup));
            buttongroup.append(luxbutton);
            $(obj).addClass('haslux');
            console.log("Added individual luxbutton.");
        }
    });
}

// run once on initial pageload
document.inject_luxbuttons();

// run whenever ajax content gets added to the page
$(document).ajaxStop(document.inject_luxbuttons);

// run again on pageload finish
if (window.addEventListener) window.addEventListener('load', document.inject_luxbuttons, false);    // Normal, Sane W3C-compliant browsers (chrome, firefox, safari)
else if (window.attachEvent) window.attachEvent('onload', document.inject_luxbuttons);              // Ugh, Microsoft (IE7+)
