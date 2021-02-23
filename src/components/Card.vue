<template>
  <div class="main-block">
     <h1>{{ title }}</h1>
     <div class="card">
         <Form v-model="cardResult"
         />
     </div>
  </div>
</template>

<script>
import Form from './Form'

export default {
    name: 'Card',
    data: function() {
        return {
            cardResult: ''
        }
    },
    props: {
        title: String,
        cardNumber: String,
    },
    components: {
        Form
    }
}
</script>

<style scoped>

.main-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.card {
    background-color: #f7f7f7;
    padding: 3rem;
    width: 70vw;
    margin-top: 2rem;
}

</style>