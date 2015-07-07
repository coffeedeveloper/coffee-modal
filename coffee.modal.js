;(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    define('Modal', ['jquery'], function ($) {
      return (root.Modal = factory($));
    });
  } else {
    root.Modal = factory(jQuery);
  }
})(this, function ($) {
  var tmpl = [];
  tmpl.push('<div class="modal">');
  tmpl.push('<div class="modal-dialog">');
  tmpl.push('<div class="modal-content">');

  tmpl.push('<div class="modal-header">');
  tmpl.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
  tmpl.push('<h4 class="modal-title">Modal title</h4>');
  tmpl.push('</div>'); //modal-header

  tmpl.push('<div class="modal-body"></div>');

  tmpl.push('<div class="modal-footer">');
  tmpl.push('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
  tmpl.push('<button type="button" class="btn btn-primary">Save changes</button>');
  tmpl.push('</div>');//modal-footer

  tmpl.push('</div>');//modal-content
  tmpl.push('</div>');//modal-dialog
  tmpl.push('</div>');//modal

  var template = tmpl.join('');

  function Modal (opts) {
    this.defaults = {
      size: '',
      trigger: null,
      event: 'click',
      el: '.modal',
      effect: 'fade',
      title: '',
      body: '',
      open: $.noop,
      opened: $.noop,
      close: $.noop,
      closed: $.noop,
      loaded: $.noop
    };
    this.opts = $.extend({}, this.defaults, opts || {});

    this.$el = $(this.opts.el);
    this.$header = $('.modal-header', this.$el);
    this.$title = $('.modal-title', this.$el);
    this.$body = $('.modal-body', this.$el);
    this.$footer = $('.modal-footer', this.$el);

    this.set({
      title: this.opts.title,
      body: this.opts.body
    });

    this.effect = this.opts.effect;

    var that = this;

    var bind = function () {
      $.each([
        {o: 'open', e: 'show.bs.modal'},
        {o: 'opened', e: 'shown.bs.modal'},
        {o: 'close', e: 'hide.bs.modal'},
        {o: 'closed', e: 'hidden.bs.modal'},
        {o: 'loaded', e: 'loaded.bs.modal'}
      ], function (i, d) {
        that.$el.on(d.e, $.proxy(that.opts[d.o], that));
      });
    };

    bind();
  }

  Modal.fn = Modal.prototype = {
    show: function () {
      this.$el.modal('show');
    },
    hide: function () {
      this.$el.modal('hide');
    },
    toggle: function () {
      this.$el.modal('toggle');
    },
    set: function (prop, val) {
      if (typeof prop === 'object') {
        for (var p in prop) {
          this['$'+p].html(prop[p]);
        }
      } else {
        this['$'+prop].html(val);
      }
    }
  };

  return Modal;
});
