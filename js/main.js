// NKM Advocates — Main JavaScript

// Header scroll state
var header = document.getElementById('siteHeader');
if (header) {
  window.addEventListener('scroll', function(){
    if (window.scrollY > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

// Department carousel
var track = document.getElementById('deptTrack');
if (track) {
  var countEl = document.getElementById('deptCount');
  var cards = track.children;
  var total = cards.length;
  function cardStep(){ return cards[0].getBoundingClientRect().width + 18; }
  function updateCount(){
    var idx = Math.round(track.scrollLeft / cardStep()) + 1;
    idx = Math.max(1, Math.min(total, idx));
    if (countEl) countEl.textContent = idx + ' / ' + total;
  }
  document.getElementById('deptNext').addEventListener('click', function(){
    track.scrollBy({left: cardStep(), behavior:'smooth'});
  });
  document.getElementById('deptPrev').addEventListener('click', function(){
    track.scrollBy({left: -cardStep(), behavior:'smooth'});
  });
  track.addEventListener('scroll', function(){ window.requestAnimationFrame(updateCount); });
  updateCount();
}

// Reveal on scroll
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(function(el){ observer.observe(el); });
} else {
  document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in-view'); });
}
