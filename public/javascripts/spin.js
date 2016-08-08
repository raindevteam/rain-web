var spin = document.getElementById("spin");
spin.volume = 0.2;
spin.play();

filterValue = 360;
filterDelta = -20;

window.setInterval(function() {
    filterChange();
}, 468.75);

function filterChange() {
    if (filterValue === 0) {
        filterDelta = 20;
    } else if (filterValue === 360) {
        filterDelta = -20;
    }

    filterValue += filterDelta;

    cssPropFilter = "hsla(" + filterValue + ", 100%, 39%, 0.30)";
    cssPropA = "hsla(" + filterValue + ", 100%, 39%, 1)";

    $(".filter").css("background-color", cssPropFilter);
    $("a").css("color", cssPropA);
}