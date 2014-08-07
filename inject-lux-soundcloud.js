var luxinate = function(songurl) {
    console.log("Fetching " + songurl);
    var url = "http://localhost/lux/lux.php?url=" + songurl;
    $.get(url, function(result) {
        console.log(url, result);
    });
}

document.luxinate = luxinate;

var getluxbutton = function(buttongroup) {
    var songurl = "http://soundcloud.com" + buttongroup.parents('.sound').find('.soundTitle__title').attr('href')
    var button = $('<a href="#" onclick="luxinate(\'' + songurl + '\')" class="sc-button sc-button-small sc-button-responsive sc-button-download sc-button-lux" title="Download this track with Luxinate." tabindex="0">Lux</a>"');
    return button;
}

var luxifypage = function() {
    $('.sound__soundActions').not('.haslux').each(function(i, obj) {
        if ($(obj).find(".sc-button-group").length !== 0) {
            var buttongroup = $(obj).find(".sc-button-group").first();
            var luxbutton = getluxbutton(buttongroup);
            buttongroup.append(luxbutton);
            $(obj).addClass('haslux');
            console.log("Added luxbutton.");
        }
    });
}

$.support.cors = true;
$(document).ajaxStop(luxifypage);

// var last, diff;

// var checkifxhrdone = function(xhrevent, request, settings) {
//     luxlog(xhrevent, request, settings)
//     if (last) {
//         diff = event.timeStamp - last;
//         luxlog("last XHR was " + diff + "seconds ago");
//         if (diff > 500) {
//             luxlog("Page is probably loaded.")
//         }
//     }
//     last = event.timeStamp;
// }


