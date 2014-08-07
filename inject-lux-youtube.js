var luxinate = function(songurl) {
    console.log("Fetching " + songurl);
    var url = "http://localhost/lux/lux.php?url=" + songurl;
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "http://localhost/lux/lux.php?url="+songurl, false);
    xhReq.send(null);
    var serverResponse = xhReq.responseText;
    console.log(serverResponse);
}

var getluxbutton = function() {
    var songurl = document.location.toString()
    var button = '<span><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text yt-uix-button-empty yt-uix-button-has-icon  yt-uix-tooltip" type="button" onclick="document.luxinate(\'' + songurl + '\')" title="Luxinate" data-position="bottomright" data-orientation="vertical" data-force-position="true" data-button-toggle="true" data-tooltip-text="Luxinate"><span class="yt-uix-button-icon-wrapper"><img src="http://localhost/lux/lux.png" style="height: 20px;" class="yt-uix-button-icon yt-sprite" alt="Luxinate"></span></button></span>';
    return button;
}

var luxifypage = function() {
    console.log("LUXIFY PAGE");
    var buttongroup = document.getElementById('watch-like-dislike-buttons');
    if (buttongroup && !(buttongroup.classList.contains('haslux'))) {
            buttongroup.innerHTML += document.getluxbutton();
            buttongroup.classList.add('haslux');
            console.log("Added luxbutton.");
    }
}

document.luxinate = luxinate;
document.getluxbutton = getluxbutton;
document.luxifypage = luxifypage;

document.luxifypage()

if (window.addEventListener) {
    window.addEventListener('load', document.luxifypage, false);
} 
else if (window.attachEvent) {
    window.attachEvent('onload', document.luxifypage);// Microsoft
}
