import axios from 'axios'


const remote_url = import.meta.env.VITE_SERVER_URL
const Routes = () => {
    return {

        taxis: [],
        taxi_data:[],
        taxi_info_id:[],
        taxi_info_price:[],
        destination: '',
        firstname: '', card_number: "",
        exp_month: '', exp_year: '', cvv: '',
        this_info: [],
        price: '',
        feedback_message: '',
        success_pay: false,
        error: false,
        passengers: 0,
        payment_screen: false,
        user: {},
        passenger_name: '',
        reg: '',
        assign_taxi:false,
        your_taxi:'',
        
        pass_id:'',
        user_pass_id:'', amount:'', taxi_trips_id:'', status:'',
        rating: 0, 
        comments: '', 
        drivers_id: '',
        Reviews:false,
        passengerside:'',
        allreview:'',
        id: '',

        init() {
            findTaxiByRoute(),
            this.drivers_details()

        },

        addreview(){
            this.getRatings()
            axios
            .post(`${remote_url}/api/ratings`, {
                rating:this.rating, comments:this.comments,drivers_id :this.drivers_id
            })
            .then((result)=>console.log(result.data.data)
            )
            .catch(error => console.error(error))
            
        },
        getRatings(){
            axios
            .get(`${remote_url}/api/getAllRatings`)
            .then((result)=> console.log(result.data))
        },

        // ends here

        findTaxiByRoute() {
            // const access_token = localStorage.getItem('access_key_pass')
            axios
                .post(`${remote_url}/api/taxis`, {
                    // Headers:{
                    // "Authorization" : `Bearer ${access_token}`,
                    // departure: this.departure,
                    route: this.destination
                    // }

                })
                .then(result => {
                    // console.log(result.data.data);
                    console.log(result.data.taxi[0]);
                    
                    // console.log(result.data.each_taxi[0].price);
                    this.taxi_data = result.data.taxi
                    JSON.stringify(this.taxi_data);
                    console.log(this.taxi_data);

                    // this.taxi_data_price = result.data.each_taxi[0].price;
                    // console.log(this.taxi_data_price);



                    localStorage.setItem('taxi', JSON.stringify(result.data.data))
                    this.taxis = result.data.data
                    console.log('all taxis'+this.taxis);
                    this.reg = result.data.data.reg_number
                    this.status = result.data.status.status
                    
                    console.log('????'+this.price);



                })
                .catch(err => console.log(err))

        },

        getReceipt() {
            axios
                .post(`${remote_url}/api/payment_receipt`, {
                    user_id: this.user_id,
                    taxi_trip_id: this.taxi_trip_id,
                    amount: this.amount,
                    payment_type: this.payment_type
                })
                .then(result => {
                    console.log(result.data.data);
                    console.log(result.data.data);
                    this.amount = result.data
                    // this.price = result.data.price.price

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
            else {

                const access_token = localStorage.getItem('access_key_pass')
                axios
                    .post(`${remote_url}/api/card_payments`, entry, {
                        Headers: {
                            "Authorization": `Bearer ${access_token}`,
                        }

                    })
                    .then(results => {
                        console.log(results.data);
                        this.success_pay = true
                        this.payment_screen = false
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
        },

        // passenger_payment(){
        //     this.findTaxiByRoute()
        //             this.your_taxi = this.taxis
        //             console.log(this.your_taxi);
            
        // },

        pay_taxi(){
            this.findTaxiByRoute()
            this.taxi_info_id = this.taxi_data[0].taxi_id;
            console.log(this.taxi_info_id);
            this.taxi_info_price = this.taxi_data[0].price;
            console.log(this.taxi_info_price);

            // console.log(JSON.parse(JSON.stringify(this.taxi_info)));
            // console.log(this.taxi_info.taxi_id);
            this.user = JSON.parse(localStorage.getItem('user_name'))
            this.pass_id = this.user.id;
            console.log(this.pass_id);
            axios
            .post(`${remote_url}/api/trip_payment/${this.pass_id}`,{
                user_id: this.pass_id, 
                amount: this.taxi_info_price, 
                taxi_id: this.taxi_info_id, 
                status: this.status

            })
            .then(results=>{
                console.log(results.data);
            })
        },

        // REVIEWS
        addreview(){
            
            axios
            .post(`${remote_url}/api/ratings`, {
                rating:this.rating, comments:this.comments,drivers_id :this.drivers_id
            })
            .then((result)=>{
                console.log(result.data.data)
                this.getRatings()
            }
            )
            .catch(error => console.error(error))
        },
        getRatings(){
            axios
            .get(`${remote_url}/api/getAllRatings/${this.id}`)
            .then((result)=> {
                this.allreview = result.data.data
                console.log(this.allreview);
                // console.log(result.data)
            })
        },
        // ENDS HERE

    }
}

export default Routes



// // console.log(result.data.data);
//                     // console.log(result.data.taxi[0]);
                    
//                     // console.log(result.data.each_taxi[0].price);
//                     this.taxi_data = result.data.data
//                     console.log(this.taxi_data);

//                     this.taxi_info = result.data.taxi[0];
//                     console.log(this.taxi_info);
//                     // this.taxi_data_price = result.data.each_taxi[0].price;
//                     // console.log(this.taxi_data_price);