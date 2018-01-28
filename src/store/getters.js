

//有时候我们需要从 store 中的 state 中派生出一些状态，Vuex 允许我们在 store 中定义『getters』（可以认为是 store 的计算属性）。
// Getters 接受 state 作为其第一个参数，也可以接受getter作为第二个参数：
//关于使用:Getters 会暴露为 store.getters 对象：
// 我们可以很容易地在任何组件中使用它：
/*computed: {
doneTodosCount () {
  return this.$store.getters.filteredNotes
}
}*/
//就像映射state一样，getters也可以通过mapGetters进行映射：
const filteredNotes = (state) =>{
  if(state.show === 'all'){
    return state.notes || {};
  }else if(state.show == 'favorite'){
    return state.notes.filter(note =>note.favorite) || {};
  }
}
const show = state => state.show;
const activeNote = state => state.activeNote;

export default {
  filteredNotes,
  show,
  activeNote
}
