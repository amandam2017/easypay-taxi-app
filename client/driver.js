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
        cardprice:'',
        cashprice:'',
        count: 0,
        trips: 0,
        fare_total: 0,
        eftcount:0,


        fullTaxi() {
            this.count = this.count - 15
            // this.fare_total += this.price * 15
            return this.trips++
        },
       
        totalTrip() {
            return this.fare_total += this.cashprice
        },

        passengerIncrement() {
            return this.count++
        },
        passengerDecrement() {
            return this.count--
        },
        electronic_payment(){
        this.cardprice= this.eftcount * this.price
       return this.count=this.count + this.eftcount
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
                    
                    // this.count = results.data.data

                    // console.log(this.destinations);

                })

                .catch(error => console.error(error))
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
                    console.log(result.data.data.reg_number);
                    this.cashprice = result.data.price.price * this.no_of_cashpaid_passenger
                    this.routes = result.data.trips
                    this.reg_number = result.data.data.reg_number
                    this.count = (this.count + this.no_of_cashpaid_passenger)

                    // console.log(this.reg_number + "reg number");
                    // console.log(this.routes + "hsifgigfakshfoi");
                })

        }
    }

}


export default Driver
