import $ from "jquery";

function createURL(url, param) {
    var urlLink = '';
    $.each(param, function(item, key) {
        var link = '&' + item + "=" + key;
        urlLink += link;
    })
    urlLink = url + "?" + urlLink.substr(1);
    return urlLink.replace(' ', '');
}
