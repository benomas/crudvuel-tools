import Vue from 'vue';
import VueVersion from '../src/crudvuelTools.js'

Vue.config.productionTip = false;

describe('Crudvel grid', () => {
  it('grid for use with crudvel resources', () => {
    let Component = Vue.extend(crudvuelTools);
    let vv = new Component();
    expect(vv.crudvuelTools).toBe(Vue.crudvuelTools);
  });

  it('grid for use with crudvel resources', () => {
    let Component = Vue.extend(crudvuelTools);
    let vm = new Component().$mount();
    expect(vm.$el.textContent.replace(/(^\s+|\n+)/g, '')).toBe('You are using Vue ')
  });
});
