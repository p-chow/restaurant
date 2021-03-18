<template>
  <div>
      <label for="item1" v-for="(item, index) in datapacket" v-bind:key="index">{{item[0]}} : {{item[1]}}<br />
      <input
        v-bind:id="index"
        type="number"
        name="item1"
        placeholder="0"
        min="0"
        value="0"
      />
      <br /><br/>
    </label><br/>
        <button v-on:click="updateOrder($event)">Update Order</button> 

  </div>
</template>

<script>
import database from '../firebase.js'

export default {
        data(){
            return{
                datapacket: [],
            }
        },
        props: { 
            docId :String
        },
        methods:{
            fetchItems: function(){
                database.collection('orders').doc(this.docId).get().then(doc => {
                let data = doc.data();
                let value1 = data["Prawn omelette"];
                let value2 = data["Dry Beef Hor Fun"]; 
                let value3 = data["Sambal KangKung"]; 
                let value4 = data["Pork Fried Rice"];
                let value5 = data["Mapo Tofu"];
                let value6 = data["Cereal Prawn"];
                this.datapacket.push(["Prawn omelette", value1], 
                                       ["Dry Beef Hor Fun", value2], 
                                       ["Sambal KangKung", value3],
                                       ["Pork Fried Rice", value4],
                                       ["Mapo Tofu", value5],
                                        ["Cereal Prawn", value6]);
            });},
            updateOrder: function(){
              var itemList = [];
              for (let i = 0; i < this.datapacket.length; i++) {
                itemList.push(document.getElementById("" + i).value);
              }
              database
                .collection("orders")
                .doc(this.docId)
                .update({
                "Prawn omelette": itemList[0], 
                "Dry Beef Hor Fun" : itemList[1], 
                "Sambal KangKung" : itemList[2], 
                "Pork Fried Rice" : itemList[3],
                "Mapo Tofu" : itemList[4], 
                "Cereal Prawn": itemList[5], 
                })
                .then(() => this.$router.push({ path: "/orders" }));            
                }
        },
        created(){
            this.fetchItems();
        },
    
}
</script>

<style>
button {
  width: 100px;
  height: 40px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
#inside {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
</style>
