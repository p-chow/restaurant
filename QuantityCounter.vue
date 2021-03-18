<template>
  <div>
      <button v-on:click = "decrement">-</button>
      <label> {{counter}} </label>
      <button v-on:click = "increment">+</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            counter: 0,
        }
    },
    props:{
        item:{
            type: Object
        }
    },
    methods:{
        increment: function(){
            if (this.counter < 10){
                this.counter += 1;
                this.$emit('counter', this.item, this.counter);
            } else {
                alert("You cannot buy more than 10 items");
            }
        },
        decrement: function(){
            if (this.counter > 0){
                this.counter -= 1;
                this.$emit('counter', this.item, this.counter);
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  width: 40px;
  height: 40px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>
