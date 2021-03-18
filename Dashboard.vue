<template>
<section>
    <ul id="boxedUL">
            <li id="boxed"><router-link to="/" exact>Home</router-link></li>
            <li id="boxed"><router-link to="/orders" exact>Orders</router-link></li>
            <li id="boxed"><router-link to="/dashboard" exact>DashBoard</router-link></li>
        </ul>
    <div id="dashboard">
    <h1 id="head">Bar Chart</h1>
        <bar-chart></bar-chart>
    <h1 id="head">Line Chart</h1>
        <line-chart></line-chart>
    </div>
</section>
</template>

<script>
import BarChart from "./charts/Barchart.vue";
import LineChart from "./CallAPI.vue";

export default {
    components: {
        BarChart, LineChart,
    }
};

</script>

<style scoped>
</style>