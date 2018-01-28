import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const defaultNote =  {
    id: +new Date(),
    title: '我的笔记',
    content:'我的第一遍笔记内容！',
    favorite:false
}
//初始化 vuex使用单一状态数，用一个store包含了所有层级的状态，他是一个唯一的数据源。
//而state是存放数据的地方，也就是状态的地方
const state = {
  notes:[defaultNote],
  activeNote:defaultNote,
  show: 'all'
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
