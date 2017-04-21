import $ from 'jquery';

export default class SmoothScroll {
  constructor(target, params = {}) {
    this.target     = target;
    this.targetBody = this._getTargetBody();

    const defaults  = {
      duration: 1000,
      easing  : 'easeOutQuint',
      offset  : 0,
      hash    : true
    };
    this.params = $.extend(defaults, params);
  }

  _getTargetBody() {
    if (0 < $('html').scrollTop()) {
      return $('html');
    } else if (0 < $('body').scrollTop()) {
      return $('body');
    }
  }

  _scrollStop() {
    this.targetBody.stop(true);
  }

  off() {
    this.target.unbind('click.SmoothScroll');
  }

  on() {
    $(this.target).each((i, e) => {
      $(e).on('click.SmoothScroll', (event) => {
        event.preventDefault();

        const targetHash = event.currentTarget.hash.split('%').join('\\%').split('(').join('\\(').split(')').join('\\)');
        const offset     = $(targetHash).eq(0).offset();

        if (! this.targetBody) {
          return;
        }

        if (! targetHash || ! offset) {
          return;
        }

        const wst = $(window).scrollTop();
        if (0 === wst) {
          $(window).scrollTop(wst + 1);
        }

        this.targetBody.animate(
          {
            scrollTop: offset.top - this.params.offset
          },
          this.params.duration,
          this.params.easing,
          () => {
            if (true === this.params.hash) {
              window.history.pushState('', '', targetHash);
            }
          }
        );

        if (window.addEventListener) {
          window.addEventListener('DOMMouseScroll', this._scrollStop, false);
        }
        window.onmousewheel = document.onmousewheel = this._scrollStop;
      });
    });
  }
}
