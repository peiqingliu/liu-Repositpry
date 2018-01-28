<template>
  <!--中间note信息-->
  <div class="notes-list">
    <!--头部信息-->
    <div class="list-header">
      <h2>Notes | heavenru.com</h2>
      <div class="btn-group btn-group-justfied" role="group">
        <!--all-->
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default"
                    @click="toggleShow('all')"
                    :class="{active :show === 'all'}">
              All Notes
            </button>
        </div>
        <!--favorite-->
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default"
                    @click="toggleShow('favorite')"
                    :class="{active:show === 'favorite'}">
              Favorite Notes
            </button>
        </div>
      </div>

      <div class="btn-group btn-group-justfied" role="group">
        <div class="input-group search">
          <input type="text" class="form-control" v-model="search" placeholder="Search for..." />
          <span class="input-group-addon">
            <i class="glyphicon glyphicon-search"></i>
          </span>
        </div>
      </div>
    </div>
    <!--渲染笔记列表-->
    <div class="container">
      <div class="list-group">
        <div v-for="(note,index) in searchNotes" :key="index"
             class="list-group-item"
             :class="{active: activeNote === note}"
             @click="updateActiveNote(note)">
          <h4 class="list-group-item-heading">
            {{note.title.trim().substring(0,30)}}
          </h4>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped>
  .notes-list {
    flex:1;
    background-color: #F5F5F5;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
  }

  .list-header {
    padding: 5px 25px 25px 25px;
  }

  .list-header .search{
    margin-top: 20px;
  }

  .list-header h2 {
    font-weight: 300;
    text-transform: uppercase;
    text-align: center;
    font-size: 22px;
    padding-bottom: 8px;
  }

  .container {
    height: calc(100% - 204px);
    max-height: calc(100% - 204px);
    overflow: auto;
    width: 100%;
    padding: 0;
  }

  .container .list-group-item{
    border: 0;
    border-radius: 0;
  }

  .list-group-item-heading{
    font-weight: 300;
    font-size: 15px;
  }
</style>
<script>
  //关于辅助函数的使用https://www.cnblogs.com/doudoujun/p/6393000.html
  // 在单独构建的版本中辅助函数为 Vuex.mapState
  import {mapGetters, mapState, mapActions} from 'vuex'
  export default {
    name:'NoteList',
    data(){
      return {
        search:''
      }
    },
    //值得注意的是我们这里需要在computed计算属性里面去获取这个show，activeNote
    // 而当一个组件需要获取的状态比较多的时候都声明为计算属性就会显得比较冗余，因此可以引入mapstate这个辅助函数：
    computed:{//关于计算属性的理解:computed在vue的dom加载完之后,就会依赖（data里的数据）属性，其实就是在mounted的时候阶段执行,这是一个计算属性
              //触发不需要条件,会随着data里面的属性改变,而做出相应的变化
              //我们可以将同一个我们可以将同一函数定义为一个 method 而不是一个计算属性。对于最终的结果，两种方式确实是相同的。
              // 然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。
              // 这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

      // 使用对象展开运算符将 getters 混入 computed 对象中
      //等同于:this.$store.getters.filteredNotes
      //该处的作用是:过虑掉最爱的和全部,当做计算属性
      ...mapGetters([
        'filteredNotes' //等同于this.$store.getters.filteredNotes
      ]),
      //当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组:
      //如果组件中使用的getters 和store 里面的getters 相同，那就用 数组形式，如果不相同，那就要用对象形式。
      //show等同于 show(){
      // return this.$store.state.show}
      ...mapState([
        'show',
        'activeNote'
      ]),
      searchNotes(){//在计算属性中可以使用实现未定义的数据
        console.log(this.search);//计算属性依赖于缓存,当依赖变化,则该计算属性发生变化
        console.log(this);
        if(this.search.length > 0 ){
          return this.filteredNotes.filter((note) => note.title.toLowerCase().indexOf(this.search) > -1)
        }else{
          return this.filteredNotes;
        }
      }
    },
    methods:{
      //mapActions其实是一种语法糖
      /*toggleListShow(){
        this.$store.dispatch("toggleListShow");
      },*/
      ...mapActions([
        'toggleListShow',
        'setActiveNote'
      ]),
      toggleShow(type){
          console.log('查询'+type+'!');
          console.log( this)//this.search this并不是vue的实例 而是Promise()构造函数,类似于代理对象它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）
          this.toggleListShow({show:type});//此处的toggleListShow是actions中的函数，this是该vue实例,因为已经通过mapActions注入进来了
      },
      updateActiveNote(note){
        console.log('更新正在选中的note!');
        console.log(note);
        this.setActiveNote({note})
      }
    }
  }
</script>
