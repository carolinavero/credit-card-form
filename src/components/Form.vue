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
                        {{ cardNumberDefault }}
                    </div>
                </div>
                <div class="row card-footer">

                    <div class="card-name">
                        <div>
                            <div>Cardholder's Name</div>
                            {{ cardNameDefault | capitalize }}
                        </div>
                            
                    </div>

                    <div class="col-5">
                        <div class="card-date">
                            <div>Valid thru</div>
                            {{ expireDateDefault }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-back">
                <div class="bg-dark"></div>
                <div class="text-small">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Facere quibusdam, quae vitae eos odio ad assumenda voluptates sit, 
                    magni obcaecati aspernatur ipsam rerum facilis sint earum possimus magnam in atque!
                </div>
                <div class="card-cvc">
                    CVC  {{ cardCvcDefault }}
                </div>
            </div>

        </div>
      </div>

    <form 
        id="card"
        @submit="checkForm"
        action="/cards"
        novalidate="true"
        method="post"
      >

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
            </ul>
        </p>

        <p>
            <label for="card-number">Card Number</label>
            <input 
                id="card-number" 
                type="text" 
                name="card-number" 
                placeholder="Type the card number"
                v-model="cardNumber"
                maxlength="20"
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
                    type="text" 
                    name="expire-date" 
                    placeholder="MM/YY"
                    v-model="expireDate"
                    maxlength="5"
                    >
            </p>

            <p class="col-6 ml-2">
                <label for="card-cvc">CVC / CVV2</label>
                <input 
                    id="card-cvc" 
                    type="number" 
                    name="card-cvc"
                    placeholder="XXX" 
                    @input="updateValue"
                    :value="cardCvc"
                    @focus="flipped = true"
                    @blur="flipped  = false"
                >
            </p>

        </div>
        
        <p>
            <input type="submit" value="Save Card" class="btn-submit" >
        </p>
        

    </form>

  </div>

</template>

<script>
export default {
    name: 'Form',
    data() {
        return {
           cardNumber: '',
           cardNumberDefault: 'XXXX XXXX XXXX XXXX',
           expireDate: '',
           expireDateDefault: '01/22',
           cardName: '',
           cardNameDefault: 'John Doe',
           cardCvc: '',
           cardCvcDefault: '123',
           flipped: false,
           errors: [],
        }
    },
    mounted() {
        if(localStorage.cardName) this.cardName = localStorage.cardName;
        if(localStorage.cardNumber) this.cardNumber = localStorage.cardNumber;
    },
    watch: {
        cardNumber: {
            immediate: false,
            handler(value) {
                if (value) {
                    this.cardNumberDefault = value
                    
                } else {
                    this.cardNumberDefault = 'XXXX XXXX XXXX XXXX';
                }
            }
        },
        cardName: {
            immediate: false,
            handler(value) {
                if (value) {
                    this.cardNameDefault = value
                    
                } else {
                    this.cardNameDefault = 'John Doe';
                }
            }
        },
        expireDate: {
            immediate: false,
            handler(value) {
                if (value) {
                    this.expireDateDefault = value
                    
                } else {
                    this.expireDateDefault = '01/21';
                }
            }
        },
        cardCvcDefault: {
            immediate: false,
            handler(value) {
                if (value) {
                    this.cardCvcDefault = value
                    
                } else {
                    this.cardCvcDefault = '123';
                }
            }
        }
    },
    methods: {
        checkForm(event) {
            event.preventDefault()
            console.log("submit!");
      
            if(this.cardNumber && this.cardName && this.expireDate && this.cardCvc) {
                return true;
            }
            this.errors = [];

            if(!this.cardNumber) this.errors.push("Card number is required")
            if(!this.cardName) this.errors.push("Card name is required")
            if(!this.expireDate) this.errors.push("Expire date is required")
            if(!this.cardCvc) this.errors.push("CVC is required")

            return 
        },
        saveCard() {
            localStorage.cardName = this.cardName;
            localStorage.cardNumber = this.cardNumber;
        },
        updateValue(event) {
            const value = event.target.value;
            if(String(value).length <= 3) {
                this.cardCvc = value
            }
            this.$forceUpdate()
        }
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
    border: none;
    padding: 1rem;
    margin-top: .5rem;
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
  height: 100%; 
   */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card-back {
  padding: 1rem;
  transform: rotateY(180deg);
  position: absolute;
  left: 0;
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

@media (max-width: 500px) {
    .card-block {
        flex-direction: column;
    }
    .card {
        max-width: 80vw;
    }
    form {
        width: 80vw;
        margin-top: 3rem;
    }
}
</style>