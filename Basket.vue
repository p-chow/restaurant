<template>
  <div>
      <h3>Menu:</h3>
      <ul>
          <li v-for="(item, x) in itemData" :key='x'>
              <p>{{item[0]}} x {{item[1]}}</p>
          </li>
      </ul>
      <button @click = "findTotal(), sendOrder()">Add Order</button>
      <p v-show="show">Subtotal: {{sub}}</p>
      <p v-show="show">Grand Total: {{grand}}</p>

  </div>
</template>

<script>
import database from '../firebase.js'
export default {
    props:{
        itemData:{
            type: Array
        }
    },
    methods: {
        sendOrder: function(){
            console.log("called the function");
            var itemList = {"Prawn omelette": 0, "Dry Beef Hor Fun" : 0, "Sambal KangKung" : 0, "Pork Fried Rice" : 0, "Mapo Tofu" : 0, "Cereal Prawn" : 0};
            for (let i = 0; i < this.itemData.length; i++) {
                const curr_item = this.itemData[i];
                const item_name = curr_item[0]
                const item_qty = curr_item[1];
                itemList[item_name] = item_qty;
            }
           //var i = 0;
         console.log(this.itemData);
            database.collection('orders').add({
                "Prawn omelette": itemList["Prawn omelette"], 
                "Dry Beef Hor Fun" : itemList["Dry Beef Hor Fun"], 
                "Sambal KangKung" : itemList["Sambal KangKung"], 
                "Pork Fried Rice" : itemList["Pork Fried Rice"],
                "Mapo Tofu" : itemList["Mapo Tofu"], 
                "Cereal Prawn": itemList["Cereal Prawn"], 
            //      for(i=0; i<this.itemData.length; i++){
            // var curr = this.itemData[i];
            //     name: curr[0],
            //     quantity: curr[1],
            //     price: curr[2],
            //      }
    }).then(() => {location.reload()});

        },
        findTotal: function(){
                        console.log("called the second function");
            var subTotal = 0;
            for (let i = 0; i < this.itemData.length; i++) {
                const curr_item = this.itemData[i];
                const item_price = curr_item[2];
                const item_qty = curr_item[1];
                subTotal = subTotal + item_price * item_qty;
            }
            this.sub = subTotal;
            this.show = true;
        },
    },
    computed: {
        grand: function(){
            return this.sub * 1.07;
        }
    },
    data() {
        return {
            sub: 0,
            show: false,
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  width: 100px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>
