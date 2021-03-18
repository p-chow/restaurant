<template>
  <section>
    <div>
        <ul id="boxedUL">
            <li id="boxed"><router-link to="/" exact>Home</router-link></li>
            <li id="boxed"><router-link to="/orders" exact>Orders</router-link></li>
            <li id="boxed"><router-link to="/dashboard" exact>DashBoard</router-link></li>
        </ul>
        <ul id="boxedUL">
          <li id="boxed" v-for='(items, id) in orders' :key='id'>
              <section>
                  <div id="float-child"><ul>
                    <li id="inside" v-for='(item, id) in items[1]' :key='id'>
                      <p>{{item[0]}} : {{item[1]}}</p>
                    </li>
                  </ul></div>
                  <div>
                      <button v-bind:id="items[0]" v-on:click="deleteItem($event)">Delete</button> 
                      <button v-bind:id="items[0]" v-on:click="route($event)">Modify</button>
                  </div>
              </section>
          </li>
      </ul>
    </div>
  </section>
</template>

<script>
import database from '../firebase.js'

export default {
    data(){
        return{
            orders: [],
        }
    },
    methods:{
      fetchItems: function(){   
        database.collection('orders').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            let data = doc.data();
            let value1 = data["Prawn omelette"];
            let value2 = data["Dry Beef Hor Fun"]; 
            let value3 = data["Sambal KangKung"]; 
            let value4 = data["Pork Fried Rice"];
            let value5 = data["Mapo Tofu"];
            let value6 = data["Cereal Prawn"];
            this.orders.push([doc.id,[["Prawn omelette", value1], 
                                       ["Dry Beef Hor Fun", value2], 
                                       ["Sambal KangKung", value3],
                                       ["Pork Fried Rice", value4],[
                                           "Mapo Tofu", value5],
                                           ["Cereal Prawn", value6]]]);
          });
        });
      },
      deleteItem(event){
        let doc_id = event.target.getAttribute("id");
        var index = 0;
        database.collection('orders').doc(doc_id).delete();
        for (let i = 0; i < this.orders.length; i++) {
                const curr_order = this.orders[i];
                const order_id = curr_order[0];
                if (order_id == doc_id) {
                    index = i;
                    break;
                }
            }
        this.orders.splice(index,1);        
    },
    route(event) {
        let doc_id = event.target.getAttribute("id");
        console.log("doc id present?");
        console.log(doc_id);
      this.$router.push({ name: 'modify', params: { docId: doc_id} })
    }
    },
    created(){
      this.fetchItems();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  float: left;
}

#boxedUL {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

#boxed {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

#inside {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

#float-child {
    width: 70%;
    float: left;
    padding: 20px;
} 

</style>
