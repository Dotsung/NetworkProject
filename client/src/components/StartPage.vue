<template>
  <v-card ref="form" style="margin-left:350px;margin-right:350px;margin-top:80px;">
    <v-card-text style="text-align:center;">
      <div class="panel-title" style="margin-top:50px;"><h2>기숙사 관리 프로그램</h2></div>
      <div class="panel-title">환영합니다!</div>
      <div class="panel-body" style="margin-bottom:10px;margin-left:20px;margin-right:20px;">
        <div>
          <h6 style="text-align:left;">이메일</h6>
          <input type="text" class="form-control"
            v-model="email"
            v-on:keyup.enter="createTodo(name)">
        </div>
        <div style="margin-top:5px;">
          <h6 style="text-align:left;">비밀번호</h6>
          <input type="password" id="in" class="form-control"
            placeholder=""
            v-model="password"
            v-on:keyup.enter="createTodo(name)">
        </div>
          <v-btn block color="secondary" dark style="margin-top:20px;">로그인</v-btn>
      </div>
      <a href="/signup"><h4>회원가입하기</h4></a>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TodoPage',
  data(){ 
    return {
    name:null,
    todos: [],
    }
  },
  methods:{
    deleteTodo(todo){
      var vm = this
      this.todos.forEach(function(_todo,i, obj){
        if(_todo._id === todo._id){
          console.log('1');
          vm.$http.delete('/api/todos/'+todo._id)
          .then((res) => {
              console.log('2');
              //obj.splice(i, 1)
              this.getTodos();
          })
        }
      })
    },
    createTodo(name){
      if(name != null){
        var vm = this;
        this.$http.defaults.headers.post['Content-Type'] = 'application/json';
        this.$http.post('/api/todos/',{
          name:name
        }).then((res) => {
            vm.todos.push(res);
            this.getTodos();
        })
        this.name = null
      }
    },
    getTodos(){
      var vm = this;
      this.$http.get('/api/todos/')
      .then((res) => {
          vm.todos = res.data;
          this.getTodos();
      })
    }
  },
  mounted(){
    this.getTodos();
  }
}
</script>