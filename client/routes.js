import axios from 'axios'

const remote_url = import.meta.env.VITE_SERVER_URL
const Routes = () => {
    return {
        taxis: [],
        departure: '',
        destination: '',
        firstname: '', card_number: "",
        exp_month: '', exp_year: '', cvv: '',
        this_info: [],
        price: '',
        feedback_message: '',
        success_pay: false,
        error: false,
        passengers: 0,
        payment_screen:false,

        init() {
            findTaxiByRoute()
        },

        findTaxiByRoute() {
            axios
                .post(`${remote_url}/api/taxis`, {
                    departure: this.departure,
                    destination: this.destination
                })

                .then(result => {
                    console.log(result.data.data);
                    console.log(result.data.price);
                    this.taxis = result.data.data
                    this.price = result.data.price.price

                })
                .catch(err => console.log(err))

        },
        payhere() {
            const entry = {
                firstname: this.firstname, card_number: this.card_number, exp_month: this.exp_month, exp_year: this.exp_year, cvv: this.cvv,
            }
            if (!this.firstname || !this.card_number || !this.exp_month || !this.exp_year || !this.cvv) {
                this.error_message = 'Please fill all the empty fields'
                this.error = true;

            }
else{


            axios
                .post(`${remote_url}/api/card_payments`, entry)
                .then(results => {
                    console.log(results.data);
                })
                .then(() => {
                    this.success_pay = true
                    this.payment_screen=false
                    this.this_info = results.data
                     this.error_message = results.data.message
                     this.error = false
                })

                .catch(error => console.error(error))



            setTimeout(() => {
                this.error_message = ''
                this.error = false;
            }, 3000);
        }
    }

    }
}

export default Routes