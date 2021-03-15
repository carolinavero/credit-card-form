<template>

  <div class="card-block">

      <div class="card-block__content">

        <div class="card"
            data-cy="credit-card"
            v-bind:class="{ 'card-flipped': flipped }"
        >
            <div class="card-front">
                <div class="row card-header">
                    <div class="col-6 card-chip">
                        <img src="../assets/chip.png" alt="chip">
                    </div>
                    <div class="col-6 card-logo"
                        data-cy="card-logo"
                        v-bind:class="[ mastercard ? 'mastercard' : 'visa' ]"
                    ></div>
                </div>

                <div class="row">
                    <div class="col-12 card-number">
                        {{ cardNumberDefault }}
                    </div>
                </div>
                <div class="row card-footer">

                    <div class="card-name">
                        <div>
                            <div class="text-card-label">Cardholder's Name</div>
                            {{ cardNameDefault | capitalize }}
                        </div>
                            
                    </div>

                    <div class="col-5">
                        <div class="card-date">
                            <div class="text-card-label">Valid thru</div>
                            {{ expiryDateDefault }}
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

        <blockquote class="errors-list" data-cy="errors-list" v-if="errors.length">
            <b class="note-title">Please correct the following error(s):</b>
            <!-- <ul>
                <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
            </ul> -->
        </blockquote>

        <p>
            <label for="card-number">Card Number</label>
            <input 
                id="card-number" 
                type="text" 
                data-cy="card-number"
                name="card-number" 
                placeholder="Type the card number"
                v-model="cardNumber"
                maxlength="20"
                v-mask="cardNumberMask"
                v-bind:class="{ error: hasError }"
            >
            <small data-cy="card-number-error" class="text-error">{{ cardNumberError }}</small>
        </p>
        
        <p>
            <label for="card-name">Cardholder's Name</label>
            <input 
                id="card-name" 
                type="text" 
                name="card-name" 
                data-cy="card-name"
                placeholder="Type the name"
                v-model="cardName"
                v-bind:class="{ error: hasError }"
            >
            <small data-cy="card-name-error" class="text-error">{{ cardNameError }}</small>
        </p>

        <div class="row">
            <p class="col-6">
                <label for="expiry-date">Expiry Date</label>
                <input 
                    id="expiry-date" 
                    type="text" 
                    name="expiry-date" 
                    data-cy="expiry-date" 
                    placeholder="MM/YY"
                    v-model="expiryDate"
                    maxlength="5"
                    v-mask="expiryDateMask"
                    v-bind:class="{ error: hasError }"
                    >
                <small data-cy="expiry-date-error" class="text-error">{{ expiryDateError }}</small>
            </p>

            <p class="col-6 ml-2">
                <label for="card-cvc">CVC / CVV2</label>
                <input 
                    id="card-cvc" 
                    type="number" 
                    name="card-cvc"
                    data-cy="card-cvc"
                    placeholder="XXX" 
                    @input="updateValue"
                    :value="cardCvc"
                    @focus="flipped = true"
                    @blur="flipped  = false"
                    v-bind:class="{ error: hasError }"
                >
                <small data-cy="card-cvc-error" class="text-error">{{ cardCvcError }}</small>
            </p>
          

        </div>
        
        <p>
            <input type="submit" value="Save Card" data-cy="submit" class="btn-submit" >
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
           cardNumberMask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/], 
           cardNumberError: '',
           expiryDate: '',
           expiryDateDefault: '01/22',
           expiryDateMask: [/\d/, /\d/, '/', /\d/, /\d/], 
           expiryDateError: '',
           cardName: '',
           cardNameDefault: 'John Doe',
           cardNameError: '',
           cardCvc: '',
           cardCvcDefault: '123',
           cardCvcError: '',
           flipped: false,
           mastercard: false,
           errors: [],
           hasError: false
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
                    this.cardNumberDefault = value;
                    this.cardNumberError = '';

                    if (value == 5) {
                        this.mastercard = true;
                    }
                } else {
                    this.cardNumberDefault = 'XXXX XXXX XXXX XXXX';
                }
            
            }
        },
        cardName: {
            immediate: false,
            handler(value) {
                if (value) {
                    this.cardNameDefault = value;
                    this.cardNameError = '';
                } else {
                    this.cardNameDefault = 'John Doe';
                }
            }
        },
        expiryDate: {
            immediate: false,
            handler(value) {
                if (value) {
                    this.expiryDateDefault = value;
                    this.expiryDateError = '';
                    
                } else {
                    this.expiryDateDefault = '01/21';
                }
            }
        },
        cardCvc: {
            immediate: false,
            handler(value) {
                if (value) {
                    this.cardCvcDefault = value
                    this.cardCvcError = ''
                    
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

            this.errors = [];

            if(!this.cardNumber) {
                let errorMsg = "Card number is required";
                this.errors.push(errorMsg);
                this.cardNumberError = errorMsg;

            } 
            if(!this.cardName) {
                let errorMsg = "Card name is required";
                this.errors.push(errorMsg);
                this.cardNameError = errorMsg;
            }

            if(!this.expiryDate) { 
                this.errors.push("Expiry date is required")
                this.expiryDateError = "Expiry date is required";
            } else if(!this.validExpiryDate(this.expiryDate)) {
                this.errors.push("Expiry date is not valid!");
                this.expiryDateError = "Expiry date is not valid!";
            }

            if(!this.cardCvc) {
                let errorMsg = "CVC is required";
                this.errors.push(errorMsg);
                this.cardCvcError = errorMsg;
                
            }
            return 
        },

        validExpiryDate(checkDate) {
            let re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
            return re.test(checkDate)
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
    margin-left: 2%;
}
.card-flipped {
  transform: rotateY(180deg);
}

.card-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.card-header {
    justify-content: space-between;
    align-items: center;
}
.card-footer {
    margin: 2rem 0 1rem;
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
    width: 100%;
    margin-top: 2rem;
}

.col-6 {
    width: 49%;
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
    border: 2px solid transparent;
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
.errors-list {
    border-left: 5px solid #d9534f;
    background-color: #fff2f2;
    padding: 1rem;
    display: flex;
}
.errors-list .note-title {
    color: #d9534f;
}
.text-error {
    color: #d9534f;
}
.error {
    border-color: #d9534f;
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
  height: auto;
  perspective: 1000px;
}

.card {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 10px #ccc;
}

.card-front, 
.card-back {
   background-color: black;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card-front {
    padding: 1rem;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #fff;
    border-radius: 2rem;
}

.card-back {
    padding: 1rem;
    transform: rotateY(180deg);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #fff;
    border-radius: 2rem;
}
.card-cvc {
    margin-top: 1rem;
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

.text-card-label {
    font-size: .85rem;
}

@media (max-width: 500px) {
    .card-block {
        flex-direction: column;
    }
    .card-block__content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .card {
        max-width: 80vw;
    }
    form {
        width: 80vw;
        margin-top: 3rem;
        margin-left: 0;
    }
}

</style>