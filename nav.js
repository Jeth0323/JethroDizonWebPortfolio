// scrollings
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

function checkScroll() {
  var boxes = document.querySelectorAll('.fadein');
  for (var i = 0; i < boxes.length; i++) {
    var fromTop = boxes[i].getBoundingClientRect().top;
    if (fromTop < window.innerHeight - 50) {
      boxes[i].classList.add('visible');
    }
  }
}

// hamburger menu
var hamburgBtn = document.getElementById('hamburgr');
var mobiMenuEl = document.getElementById('mobiMenu');

if (hamburgBtn && mobiMenuEl) {
  hamburgBtn.addEventListener('click', function() {
    hamburgBtn.classList.toggle('open');
    mobiMenuEl.classList.toggle('open');
  });

  var menulinks = mobiMenuEl.querySelectorAll('a');
  for (var j = 0; j < menulinks.length; j++) {
    menulinks[j].addEventListener('click', function() {
      hamburgBtn.classList.remove('open');
      mobiMenuEl.classList.remove('open');
    });
  }
}

// skill bar animations + shimmer
var myskillsEl = document.getElementById('myskills');
if (myskillsEl) {
  var alreadyRan = false;
  window.addEventListener('scroll', function() {
    if (alreadyRan) return;
    var pos = myskillsEl.getBoundingClientRect().top;
    if (pos < window.innerHeight - 80) {
      var allbars = myskillsEl.querySelectorAll('.skill-progfill');
      for (var k = 0; k < allbars.length; k++) {
        allbars[k].style.width = allbars[k].dataset.w + '%';
        (function(bar) {
          setTimeout(function() { bar.classList.add('filled'); }, 1200);
        })(allbars[k]);
      }
      alreadyRan = true;
    }
  });
}

// count-up on stat numbers
var statList = document.querySelector('.stat-list');
if (statList) {
  var statDone = false;
  window.addEventListener('scroll', function() {
    if (statDone) return;
    var pos = statList.getBoundingClientRect().top;
    if (pos < window.innerHeight - 60) {
      var nums = statList.querySelectorAll('.stat-number');
      for (var n = 0; n < nums.length; n++) {
        var raw = nums[n].textContent.trim();
        var num = parseInt(raw);
        if (!isNaN(num) && num > 1) {
          (function(el, target, suffix) {
            var start = 0;
            var step = Math.ceil(target / 30);
            var t = setInterval(function() {
              start += step;
              if (start >= target) { start = target; clearInterval(t); }
              el.textContent = start + suffix;
            }, 30);
          })(nums[n], num, raw.replace(/[0-9]/g, ''));
        }
      }
      statDone = true;
    }
  });
}

// highlights the current page link 
var thispage = window.location.pathname.split('/').pop();
if (thispage === '') thispage = 'index.html';

var allnavlinks = document.querySelectorAll('.nav-item, .mobi-menu a');
for (var x = 0; x < allnavlinks.length; x++) {
  if (allnavlinks[x].getAttribute('href') === thispage) {
    allnavlinks[x].classList.add('active');
  }
}

// simple mouse trail
document.addEventListener('mousemove', function(e) {
  var isLight = document.body.classList.contains('lightmode');
  var color = isLight ? 'rgba(37,99,235,.45)' : 'rgba(59,130,246,.5)';
  var dot = document.createElement('div');
  dot.style.cssText = 'position:fixed;left:' + e.clientX + 'px;top:' + e.clientY + 'px;width:6px;height:6px;border-radius:50%;background:' + color + ';pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:opacity .4s,transform .4s';
  document.body.appendChild(dot);
  setTimeout(function() {
    dot.style.opacity = '0';
    dot.style.transform = 'translate(-50%,-50%) scale(0)';
  }, 30);
  setTimeout(function() { dot.remove(); }, 430);
});

// dark / light mode toggle
var themeBtn = document.getElementById('themetoggle');
if (themeBtn) {
  var saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('lightmode');
    themeBtn.textContent = '☾ dark';
  }
  themeBtn.addEventListener('click', function() {
    var isLight = document.body.classList.toggle('lightmode');
    themeBtn.textContent = isLight ? '☾ dark' : '☀ light';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}