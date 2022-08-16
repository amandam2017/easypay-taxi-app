import axios from 'axios'
import Owner from './owner'


const remote_url = import.meta.env.VITE_SERVER_URL
const Drivers = () => {
    return {
        ...Owner(),
        init() {
            this.displayTotal()
            this.drivers_details()
            this.takeTrip()

        },
        routes: [],
        departures: [],
        destinations: [],
        destination: '',
        departure: '',
        reg_number: '',
        no_of_cashpaid_passenger: '',
        cardprice: '',
        cashprice: '',
        count: 0,
        trips: 0,
        fare_total: 0,
        eftcount: 0,
        rewardsRecieved: false,
        trip_details:{
            route_id: 0,
            taxi_id:0,
            passenger_count: '', 
            total_fare: '' 
        },
        driverDetails:'',
        route:{},
        passengers_in_taxi:0,

        fullTaxi() {
            this.count = this.count - 15
            // this.fare_total += this.price * 15
            return this.trips++
        },
        fullTaxi_trip() {
            this.passengers_in_taxi = this.passengers_in_taxi + 15
            return this.passengers_in_taxi

        },
        totalTrip() {
            return this.cardprice + this.cashprice
        },

        drivers_details(){
            this.user = JSON.parse(localStorage.getItem('user_name'))
            this.id = this.user.id;
            // console.log(this.user);
             axios
            .get(`${remote_url}/api/driver/${this.id}`)
            .then(results =>{
                console.log(results.data.data.reg_number);
                this.reg = results.data.data.reg_number
                // // console.log(results.data.data.route.departure);
                this.route = `${results.data.data.route.departure}  to ${results.data.data.route.destination}`
                // console.log(this.route);
                this.driverDetails = results.data.data
                // console.log(driverDetails);
            })
        },

        takeTrip(){
            this.drivers_details()
            // console.log(this.driverDetails);
            // console.log(this.driverDetails.taxi_id);
            // console.log(this.driverDetails.route_id);

            axios
            .post(`${remote_url}/api/trips`,{
                route_id: this.driverDetails.route_id,
                taxi_id: this.driverDetails.taxi_id,
                passenger_count: this.fullTaxi_trip(),
                total_fare: this.totalTrip()

            })
            .then(results=>{
                console.log(results.data.data);
            })

            .catch(err => console.log(err))

        },


        passengerIncrement() {
            return this.count++
        },
        passengerDecrement() {
            return this.count--
        },
        passengerIncre() {
            return this.eftcount++
        },
        electronic_payment() {
            this.cardprice = Number(this.eftcount) * this.price
            console.log(this.count);
            this.count = Number(this.eftcount)
        },
        // cash_payment(){
        //     return this.cashprice= this.no_of_cashpaid_passenger * this.price
        // },
        driver_trip() {
            axios
                .post(`${remote_url}/api/trips`,
                    {
                        route_id: this.route_id,
                        taxi_id: this.taxi_id, passenger_count: this.passenger_count, total_fare: this.total_fare
                    }
                )
                .then(results => {
                    console.log(results.data);
                })
        },

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
                    console.log(result.data.data.price);
                    this.cashprice = result.data.data.price * Number(this.no_of_cashpaid_passenger)
                    this.routes = result.data.trips
                    this.reg_number = result.data.data.reg_number
                    this.count = Number(this.eftcount) + Number(this.no_of_cashpaid_passenger)

                    // console.log(this.cashprice, this.no_of_cashpaid_passenger);
                    // console.log(this.routes + "hsifgigfakshfoi");
                })

        }
    }

}


export default Drivers