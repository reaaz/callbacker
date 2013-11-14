$(document).ready(function () {
    $("button").click(function(e) {
        // Build the URL for the appropriate environment and make a POST request
        // with the payload.

        var button = e.target;
        if (button) {
            var environment = button.id;
            var payload = $("#payload").text();
            var contentType = $("#contentType").text();
            // Build URL that environment buttons hit
            var url = "http://id-" + environment + ".intranet.peoplesearchmedia.com/verification/complete";
            var request = 'type: "POST", url: "' + url + '", contentType: "' + contentType + '", data: \'' + payload + '\'';
            var text = '$.ajax({' + request + '}).done(function (data) { console.log(data); });';
            window.prompt("Copy to clipboard with Ctrl-C [Cmd-C] and press Enter: ", text);
        }
    });
});