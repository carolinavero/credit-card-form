<template>

  <div class="card-block">

      <div class="card-block__content">

        <div class="card card-black"
            v-bind:class="[ flipped ? 'card-flipped' : '' ]"
        >
            <div class="card-front">
                <div class="row card-header">
                    <div class="col-6 card-chip">
                        <img src="../assets/chip.png" alt="chip">
                    </div>
                    <div class="col-6 card-logo mastercard"></div>
                </div>

                <div class="row">

                    <div class="col-12 card-number">
                        {{ cardNumber }}
                    </div>
                </div>
                <div class="row card-footer">

                    <div class="col-12 card-name">
                        {{ cardName | capitalize }}
                    </div>

                </div>

                <div class="row">
                     <div class="col-6">
                        <div class="card-date">
                            <div>Valid thru</div>
                            {{ expireDate }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-back">
                <div class="bg-dark"></div>
                <div class="text-small">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere quibusdam, quae vitae eos odio ad assumenda voluptates sit, magni obcaecati aspernatur ipsam rerum facilis sint earum possimus magnam in atque!
                </div>
                <div class="card-cvc">
                    CVC  {{ cardCvc }}
                </div>
            </div>

        </div>
      </div>

    <form 
        id="card"
        @submit="checkForm"
        action="#"
        method="post"
      >
        <p>
            <label for="card-number">Card Number</label>
            <input 
                id="card-number" 
                type="number" 
                name="card-number" 
                placeholder="Type the card number"
                v-model.number="cardNumber"
            >
        </p>
        
        <p>
            <label for="card-name">Cardholder's Name</label>
            <input 
                id="card-name" 
                type="text" 
                name="card-name" 
                placeholder="Type the name"
                v-model="cardName"
            >
        </p>

        <div class="row">
            <p class="col-6">
                <label for="expire-date">Expire Date</label>
                <input 
                    id="expire-date" 
                    type="number" 
                    name="expire-date" 
                    placeholder="MM / YY"
                    v-model="expireDate"
                    >
            </p>

            <p class="col-6 ml-2">
                <label for="card-cvc">CVC / CVV2</label>
                <input 
                    id="card-cvc" 
                    type="number" 
                    name="card-cvc"
                    placeholder="XXX" 
                    v-model.number="cardCvc"
                    maxlength="3"
                    @focus="flipped = true"
                    @blur="flipped  = false"
                >
            </p>

        </div>
        
        <p>
            <input type="submit" value="Save Card" class="btn-submit">
        </p>

    </form>

  </div>

</template>

<script>
export default {
    name: 'Form',
    data() {
        return {
           cardNumber: 'XXXX XXXX XXXX XXXX',
           expireDate: '00/00',
           cardName: 'CARDHOLDER NAME',
           cardCvc: 'XXX',
           flipped: false
        }
    },
    methods: {
        checkForm(event) {
            event.preventDefault()
            console.log("clicou em submit");
            console.log(event.target)
          
        },
    },
    filters: {
        capitalize: function(value) {
            if(!value) return ''
            value = value.toString()
            return value.toUpperCase()
        }
    }

}
</script>

<style scoped>

.ml-2 {
    margin-left: 1rem;
}
.card-flipped {
  transform: rotateY(180deg);
}

.card-block {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.card-header {
    justify-content: space-between;
    align-items: center;
}
.card-footer {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.card-chip img {
    width: auto;
    max-height: 30px;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30vw;
}

.col-6 {
    width: 50%;
    display: flex;
}
.col-12 {
    width: 100%;
    display: flex;
}
.row {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.card-logo {
    width: 50px;
    height: 100px;
    background-position: right center;
    background-size: contain;
    background-repeat: no-repeat;
}
.mastercard {
    background-image:  url("../assets/master.svg");
    width: 100px;
}
.visa {
    background-image:  url("../assets/visa.webp");
}

p {
    display: flex;
    flex-direction: column;
    width: 100%;
}

input {
    border: none;
    padding: 1rem;
    margin-top: .5rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.btn-submit {
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    background-color: #4caf50;
    border-radius: .5rem;
    cursor: pointer;
}
.btn-submit:hover {
    background-color: #3f9242;
}

.card-block__content {
  background-color: transparent;
  width: 350px;
  height: 250px;
  perspective: 1000px;
}

.card {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1rem;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 10px #ccc;
}


.card-block__content:hover .card {
  transform: rotateY(180deg);
}

/* .card-turned {
  transform: rotateY(180deg);
} */

/* .card-front {
    background: #ECE9E6;  
    background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  
    background: linear-gradient(to right, #FFFFFF, #ECE9E6);
} */

.card-black {
    background: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #fff;
}

.card-front, 
.card-back {
  /* position: absolute;
  width: 100%;
  height: 100%; */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card-back {
  padding: 1rem;
  transform: rotateY(180deg);
}

.bg-dark {
    height: 30px;
    width: 100%;
    background-color: grey;
    margin-bottom: 1rem;
}

.text-small {
    font-size: .5rem;
}
</style>