$.fn.classList = function() { return this[0].className.split(/\s+/); };

function showSection(cla) {
    $('section').hide();
    $('section.' + cla).show();
}

$(function() {
    showSection("actu");

    $("#menu li").click(function() {
        let cla = $(this).classList();
        showSection(cla[0]);
    });
});