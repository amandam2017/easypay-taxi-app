import axios from 'axios'

const remote_url = import.meta.env.VITE_SERVER_URL
const Driver = () => {
    return {
        init() {
            this.displayTotal()
            // this.driver()

        },
        routes: [],
        departures: [],
        destinations: [],
        destination: '',
        departure: '',
        reg_number: '',
        no_of_cashpaid_passenger: '',
        trips:'',
        cardprice:'',
        cashprice:'',
        fare_total: 0,
        eftfare_total:0,
        rewardsRecieved: false,
        route_id:'',taxi_id:'',passenger_count:'',

        fullTaxi() {
            this.fare_total = this.fare_total - 15
            // this.fare_total += this.price * 15
            return this.trips++
        },
       
        totalTrip() {
            return this.cardprice +this.cashprice
        },

        passengerIncrement() {
            return this.fare_total++
        },
        passengerDecrement() {
            return this.fare_total--
        },
        passengerIncre(){
            return this.eftfare_total++
        },
        electronic_payment(){
        this.cardprice= Number(this.eftfare_total) * this.price
        console.log(this.fare_total);
         this.fare_total = Number(this.eftfare_total) 
        },
// cash_payment(){
//     return this.cashprice= this.no_of_cashpaid_passenger * this.price
// },

        driver() {
            const token = localStorage.getItem('access_key_driver')
            axios
                .get(`${remote_url}/api/routes`, {
                   // headers: {
                        //"Authorization": `Bearer ${token}`,
                   // }
                })
                .then(results => {
                    // console.log(this.departures = results.data.data2);
                    // console.log(this.destinations = results.data.data);

                    this.destinations = results.data.data;
                    this.departures = results.data.data;
                    
                    // this.fare_total = results.data.data

                    // console.log(this.destinations);

                })

                .catch(error => console.error(error))
        },
        driver_trip(){
            axios
            .post(`${remote_url}/api/trips`,
        { route_id:this.route_id,
            taxi_id:this.taxi_id,passenger_count:this.passenger_count,total_fare:this.total_fare}
            )
            .then(results => {
             console.log(results.data);
            })
        },

        displayTotal() {
            const token = localStorage.getItem('access_key_driver')
            axios.post(`${remote_url}/api/driver`,
                {
                    //  headers: {
                    // "Authorization" : `Bearer ${token}`,
                    departure: this.departure,
                    destination: this.destination,
                    no_of_cashpaid_passenger: this.no_of_cashpaid_passenger
                    

                    //   }
                })
                .then(result => {
                    console.log(result.data);
                    console.log(result.data.data.price);
                    this.cashprice = result.data.data.price * this.no_of_cashpaid_passenger
                    this.routes = result.data.trips
                    //this.reg_number = result.data.data.reg_number
                    this.fare_total = Number(this.eftfare_total) + Number(this.no_of_cashpaid_passenger)
                    
                    console.log(this.cashprice , this.no_of_cashpaid_passenger);
                    // console.log(this.routes + "hsifgigfakshfoi");
                })

        }
    }

}


export default Driver
