import {
  NEW_NOTE,
  TOGGLE_FAVORITE,
  DELETE_NOTE,
  TOGGLE_LIST_SHOW,
  UPDATE_NOTE,
  SET_CURRENT_ACTIVE_NOTE
} from './mutations-types';
//action 和mutions 的定义方法是类似的，我们要dispatch 一个action,
// 所以actions 肯定有一个名字，dispatch action 之后它要做事情，就是commit mutation, 所以还要给它指定一个函数。
// 因为要commit mutation ,所以 函数也会自动获得一个默认参数context,
// 它是一个store 实例，通过它可以获取到store 实例的属性和方法,如 context.state 就会获取到 state 属性， context.commit 就会执行commit命令。
//例如:
/*actions: {
increment(context) {
  context.commit("INCREMENT");
},
decrement(context) {
  context.commit("DECREMENT");
}
}*/
//　其实actions 还可以简写一下， 因为函数的参数是一个对象，函数中用的是对象中一个方法，我们可以通过对象的解构赋值直接获取到该方法。
// 修改一下 actions：(修改上面的)
/*actions: {
  increment({commit}){
    commit("INCREMENT")//INCREMENT是mutations里面的定义的函数类型
  },
  decrement({commit}){
    commit("DECREMENT")
  }
}*/
export default{
  //新增一篇文章
  newNote({commit}){
    console.log('点击新增按钮之后,已经进入到action中');
    commit(NEW_NOTE);
  },
  //切换当前激活文章的favorite状态
  toggleFavorite({commit}){
    commit(TOGGLE_FAVORITE);
  },
  //删除当前激活文章
  deleteNote({commit}){
    console.log('点击删除按钮之后,已经进入到action中');
    commit(DELETE_NOTE);
  },
  //切换收藏文章列表
  toggleListShow({commit},data = {show:'all'}){
    console.log("2");
    console.log(data);
    commit(TOGGLE_LIST_SHOW,data);
  },
  //文章编辑更新
  updateNote({commit}, data={note:{}}){
    commit(UPDATE_NOTE,data);
  },
  // 点击文章标题，实时更新编辑文章内容
  setActiveNote({commit},data = {note:{}}){
    commit(SET_CURRENT_ACTIVE_NOTE,data);
  }
}
