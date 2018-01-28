
//主要定义组件中需要的方法
import {
  NEW_NOTE,
  TOGGLE_FAVORITE,
  DELETE_NOTE,
  TOGGLE_LIST_SHOW,
  UPDATE_NOTE,
  SET_CURRENT_ACTIVE_NOTE
} from './mutations-types';

export default {
  [NEW_NOTE](state,data = {
    newNote:{
      id:+new Date(),
      title:'新增的Note标题',
      content:'哈哈哈',
      favorite:false
    }
  }){
    console.log("经过actions分发,进入到mutations的新增方法!");
    state.notes.push(data.newNote);//新增的放进去
    state.activeNote = data.newNote;//设置为正在进行的
  },
  [TOGGLE_FAVORITE](state){
    state.activeNote.favorite = !state.activeNote.favorite
  },
  [DELETE_NOTE](state){
    console.log("经过actions分发,进入到mutations的删除方法!");
    for(let i=0;i<state.notes.length;i++){
      if(state.notes[i].id === state.activeNote.id){
        state.notes.splice(i,1);
        state.activeNote = state.notes[0] || {};
        return;
      }
    }
  },
  [TOGGLE_LIST_SHOW](state,data){
    console.log(3);
    console.log(state);
    state.show = data.show;
  },
  [UPDATE_NOTE](state,data){
    console.log('?');
    state.notes.forEach((note) =>{
      if(note.id === data.note.id){
        console.log(data);
          note = data.note;
      }
    })
  },
  [SET_CURRENT_ACTIVE_NOTE](state,data){
    console.log('3');
    state.activeNote = data.note;
  }
}
