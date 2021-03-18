<template>
  <section>
        <ul id="boxedUL">
            <li id="boxed"><router-link to="/" exact>Home</router-link></li>
            <li id="boxed"><router-link to="/orders" exact>Orders</router-link></li>
            <li id="boxed"><router-link to="/dashboard" exact>DashBoard</router-link></li>
        </ul>
    <div id="float-child">
        <ul>
          <li v-for='(item, id) in items' :key='id'>
              <p>{{item.name}}</p>
              <img v-bind:src="item.imageURL"/>
              <qtyCounter v-bind:item="item" v-on:counter="onCounter"></qtyCounter>
          </li>
      </ul>
      </div>
      <div id="float-child-right">
    <basket v-bind:itemData = "itemsSelected"></basket>
    </div>
  </section>
</template>

<script>
import Counter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'

export default {
    components: {
        'qtyCounter':Counter,
        'basket': Basket,
    },
    data(){
        return{
            itemsSelected: [],
            items: [],
        }
    },
    methods:{
      fetchItems: function(){
        database.collection('menu').get().then(snapshot => {
          let newItem={}
        snapshot.docs.forEach(doc => {
        newItem=doc.data()
        console.log("printing import item " + newItem)
        this.items.push(newItem)
        console.log(doc.data());
    });
});
console.log("printing final import");
console.log(this.items)
      },
        onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        var changed = new Boolean(false);
        var temp = this.itemsSelected;
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          if (item_name == item.name && count > 0){
              temp.splice(i, 1);
              temp.push([item.name, count, item.price]);
              changed = true;
              break;
          } else if (item_name == item.name && count == 0){
              temp.splice(i, 1);
              changed = true;
              break;
          }
        }
        if (changed == false) {
          temp.push([item.name, count, item.price]);
        }
        this.itemsSelected = temp;
      }
    },
    },
    created(){
      this.fetchItems();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#float-child {
    width: 80%;
    float: left;
    padding: 20px;
} 

#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
