import { Bar } from 'vue-chartjs'
import database from '/Users/patcha/Desktop/_BT3103/bt3103-week-7/src/firebase.js'

export default {
    extends: Bar,
    data: function() {
        return {
            datacollection: {
                labels: ["Pork Fried Rice", "Mapo Tofu", "Sambal KangKung", "Cereal Prawn", "Dry Beef Hor Fun", "Prawn omelette", ],
                datasets: [{
                    label: "",
                    backgroundColor: ['red', 'orange', 'yellow', 'aqua', 'pink', 'purple'],
                    data: [],
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total Number of each dish'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function() {
            var orders = {
                "Pork Fried Rice": 0,
                "Mapo Tofu": 0,
                "Sambal KangKung": 0,
                "Cereal Prawn": 0,
                "Dry Beef Hor Fun": 0,
                "Prawn omelette": 0,
            };
            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    orders["Prawn omelette"] += parseInt(doc.data()["Prawn omelette"]);
                    orders["Dry Beef Hor Fun"] += parseInt(doc.data()["Dry Beef Hor Fun"]);
                    orders["Sambal KangKung"] += parseInt(doc.data()["Sambal KangKung"]);
                    orders["Pork Fried Rice"] += parseInt(doc.data()["Pork Fried Rice"]);
                    orders["Mapo Tofu"] += parseInt(doc.data()["Mapo Tofu"]);
                    orders["Cereal Prawn"] += parseInt(doc.data()["Cereal Prawn"]);
                })
                for (var item in orders) {
                    this.datacollection.datasets[0].data.push(orders[item]);
                }
                console.log("pushed?")
                console.log(this.datacollection.datasets[0].data)
                this.renderChart(this.datacollection, this.options);

            })
        },
    },
    created() {
        this.fetchItems()
    }
}