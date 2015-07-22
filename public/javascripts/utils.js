if (window.location.hash) {
  var el = document.getElementById(window.location.hash);
  el.scrollIntoView();
  el.style.color = 'hsla(183, 95%, 65%, 1)';
}

var els = document.getElementsByClassName('c');
els = Array.prototype.slice.call(els);

function resetAnchors() {
  for(var i = 0; i < els.length; i++) {
    els[i].style.color = 'white';
  }
}

function anchorTo() {
  resetAnchors();
  this.scrollIntoView();
  this.style.color = 'hsla(183, 95%, 65%, 1)';
}

for(var i = 0; i < els.length; i++) {
  els[i].onclick = anchorTo;
}
