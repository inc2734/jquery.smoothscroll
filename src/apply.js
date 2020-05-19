import $ from 'jquery';

export function apply(event, params = {}) {
  const defaults = {
    target  : undefined,
    duration: 1000,
    easing  : 'easeOutQuint',
    offset  : 0,
    hash    : true,
  };

  const settings = $.extend(defaults, params);

  const targetPermalink   = settings.currentTarget.href.split('#')[0];
  const locationPermalink = window.location.href.split('#')[0];

  if (targetPermalink !== locationPermalink) {
    return true;
  }

  const getTargetBody = () => {
    const wst = $(window).scrollTop();
    if (0 === wst) {
      $(window).scrollTop(wst + 1);
    }

    if (0 < $('html').scrollTop()) {
      return $('html');
    }

    if (0 < $('body').scrollTop()) {
      return $('body');
    }
  };

  const body = getTargetBody();
  if (! body) {
    return true;
  }

  const targetHash = settings.currentTarget.hash.split('%').join('\\%').split('(').join('\\(').split(')').join('\\)');
  const offset     = $(targetHash).eq(0).offset();

  if (! targetHash || ! offset) {
    return true;
  }

  const scroll = () => {
    const scrollOffset = 'function' === typeof settings.offset
      ? settings.offset()
      : settings.offset;

    body.animate(
      {
        scrollTop: offset.top - scrollOffset
      },
      settings.duration,
      settings.easing,
      () => {
        if (true === settings.hash) {
          window.history.pushState('', '', targetHash);
        }
      }
    );
  };

  const disableMouseWheel = () => {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', () => body.stop(true), false);
    }

    window.onmousewheel = document.onmousewheel = function() {
      body.stop(true);
    };
  };

  event.preventDefault();

  scroll();
  disableMouseWheel();
}
