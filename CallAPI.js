import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    data: [],
                    fill: false,
                    borderColor: "red",
                    label: "west",
                }, {
                    data: [],
                    fill: false,
                    borderColor: "blue",
                    label: "national",
                }, {
                    data: [],
                    fill: false,
                    borderColor: "navy",
                    label: "east",
                }, {
                    data: [],
                    fill: false,
                    borderColor: "brown",
                    label: "central",
                }, {
                    data: [],
                    fill: false,
                    borderColor: "purple",
                    label: "south",
                }, {
                    data: [],
                    fill: false,
                    borderColor: "green",
                    label: "north",
                }, ]
            },
            options: {
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: 'PSI Twenty Four Hourly (By Region)'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function() {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
                .then(response => {
                    console.log("data printing");
                    console.log(response.data);
                    response.data.items.forEach(data => {
                        console.log("test");
                        console.log(data);
                        console.log(data.readings.psi_twenty_four_hourly)
                        console.log(data.timestamp)
                        this.datacollection.labels.push(data.timestamp);
                        this.datacollection.datasets[0].data.push(data.readings.psi_twenty_four_hourly.west)
                        this.datacollection.datasets[1].data.push(data.readings.psi_twenty_four_hourly.national)
                        this.datacollection.datasets[2].data.push(data.readings.psi_twenty_four_hourly.east)
                        this.datacollection.datasets[3].data.push(data.readings.psi_twenty_four_hourly.central)
                        this.datacollection.datasets[4].data.push(data.readings.psi_twenty_four_hourly.south)
                        this.datacollection.datasets[5].data.push(data.readings.psi_twenty_four_hourly.north)
                    })
                    this.renderChart(this.datacollection, this.options)
                })
        }
    },
    created() {
        this.fetchItems()
    }
}