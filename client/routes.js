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
        user: {},
        passenger_name:'',
        reg:'',

        init() {
            findTaxiByRoute()
        },

        findTaxiByRoute() {
            // const access_token = localStorage.getItem('access_key_pass')
            axios
                .post(`${remote_url}/api/taxis`, {
                    // Headers:{
                        // "Authorization" : `Bearer ${access_token}`,
                     departure: this.departure,
                    destination: this.destination
                    // }
                   
                })
                .then(result => {
                    console.log(result.data.data);
                    console.log(result.data.data);
                    this.taxis = result.data.data
                    this.price = result.data.price.price
                    this.reg = result.data.data.reg_number


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

const access_token = localStorage.getItem('access_key_pass')
            axios
                .post(`${remote_url}/api/card_payments`, entry,{
                    Headers:{
                        "Authorization" : `Bearer ${access_token}`,
                    }

                })
                .then(results => {
                    console.log(results.data);
                    this.success_pay = true
                    this.payment_screen=false
                    this.this_info = results.data
                     this.error_message = results.data.message
                     this.error = false
                    
                     this.user = JSON.parse(localStorage.getItem('user_name'))
                    this.passenger_name = `Thank you for payment ${this.user.username}`;
                    console.log(this.passenger_name);
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