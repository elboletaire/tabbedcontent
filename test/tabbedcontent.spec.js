var $ = global.jQuery = require('jquery')

require('../src/tabbedcontent.js')

describe('$.fn.tabbedContent', () => {
  beforeEach(() => {
    $.fx.off = true
    jasmine.getFixtures().fixturesPath = './base/test/'
    loadFixtures('fixture.html')
  })

  describe('init', () => {
    it('sets the first tab as active', (done) => {
      $('.tabscontent').tabbedContent()

      expect($('ul > li:first-of-type')).toBeMatchedBy('.active')
      done()
    })

    it('hides all contents except for the first tab', (done) => {
      $('.tabscontent').tabbedContent()

      expect($('#tab-1')).toBeVisible()
      expect($('#tab-2')).not.toBeVisible()
      expect($('#tab-3')).not.toBeVisible()
      expect($('#tab-n')).not.toBeVisible()

      done()
    })

    it('hides all contents except for the first tab and non content elements', (done) => {
      loadFixtures('fixture2.html');
      $('.tabscontent').tabbedContent({"contentElements": ".tabcontent-element"});

      expect($('#tab-1')).toBeVisible()
      expect($('#tab-2')).not.toBeVisible()
      expect($('#tab-3')).not.toBeVisible()
      expect($('#tab-n')).not.toBeVisible()
      expect($('.tabscontent a:eq(0)')).toBeVisible()
      expect($('.tabscontent a:eq(1)')).toBeVisible()
      expect($('.tabscontent a:eq(2)')).toBeVisible()
      expect($('.tabscontent a:eq(3)')).toBeVisible()
      done();
    })
  })

  describe('events', () => {
    it('properly changes the tab when clicking', (done) => {
      $('.tabscontent').tabbedContent()

      $("a[href='#tab-2']").trigger('click')

      expect($('#tab-1')).not.toBeVisible()
      expect($('#tab-2')).toBeVisible()
      expect($('#tab-3')).not.toBeVisible()
      expect($('#tab-n')).not.toBeVisible()

      done()
    })

    it('actually calls the events', (done) => {
      var event = {
        type: 'tabcontent.switch',
      }
      spyOnEvent('.tabscontent', 'tabcontent.init')
      $('.tabscontent').tabbedContent({ history: false })
      expect($('.tabscontent')).toHandle('tabcontent.init')

      spyOnEvent('.tabscontent', 'tabcontent.switch')
      $("a[href='#tab-n']").trigger('click')
      expect($('.tabscontent')).toHandle('tabcontent.switch')

      expect($('#tab-1')).not.toBeVisible()
      expect($('#tab-2')).not.toBeVisible()
      expect($('#tab-3')).not.toBeVisible()
      expect($('#tab-n')).toBeVisible()

      done()
    })
  })

  describe('API', () => {
    it('properly shows if it\'s the first tab', (done) => {
      var api = $('.tabscontent').tabbedContent().data('api')
      api.switch(2)
      expect(api.isFirst()).toBeFalsy()
      api.switch(0)
      expect(api.isFirst()).toBeTruthy()

      done()
    })

    it('properly shows if it\'s the last tab', (done) => {
      var api = $('.tabscontent').tabbedContent().data('api')
      api.switch(0)
      expect(api.isLast()).toBeFalsy()
      api.switch(3)
      expect(api.isLast()).toBeTruthy()

      done()
    })

    it('properly passes to the next tab using the api', (done) => {
      var api = $('.tabscontent').tabbedContent({loop: true}).data('api')
      api.switch(0)
      expect(api.getCurrent()).toEqual(0)
      api.next()
      expect(api.getCurrent()).toEqual(1)
      api.switch(3)
      api.next()
      expect(api.getCurrent()).toEqual(0)

      done()
    })

    it('properly passes to the previous tab using the api', (done) => {
      var api = $('.tabscontent').tabbedContent({loop: true}).data('api')
      api.switch(3)
      expect(api.getCurrent()).toEqual(3)
      api.prev()
      expect(api.getCurrent()).toEqual(2)
      api.switch(0)
      api.prev()
      expect(api.getCurrent()).toEqual(3)

      done()
    })
  })
});
