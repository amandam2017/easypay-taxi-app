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
        reg_number: '',
        no_of_cashpaid_passenger: '',
        cardprice: '',
        cashprice: '',
        count: 0,
        price:0,
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
        taxi_price:0,
        route_cost:0,
        taxi_status:{
            // destination:'',
            status:'',
            status:'queueing'
            
        },
        driversID:'',
        current_taxi_id:'',

        fullTaxi() {
            this.count = this.count - 15
            // this.fare_total += this.price * 15
            // this.taxi_price
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
                this.route_cost = results.data.data.route.price;
                this.reg = results.data.data.reg_number
                // // console.log(results.data.data.route.departure);
                this.route = `${results.data.data.route.destination}`
                console.log(this.route.price);
                this.driverDetails = results.data.data
                localStorage.setItem('taxi', JSON.stringify(this.driverDetails))

                console.log(this.driverDetails);
                // return
            })
        },

        takeTrip(){
            this.drivers_details()
            axios
            .post(`${remote_url}/api/trips`,{
                route_id: this.driverDetails.route_id,
                taxi_id: this.driverDetails.taxi_id,
                passenger_count: this.fullTaxi_trip(),
                total_fare: this.totalTrip(),
                taxi_price: this.route_cost

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
            // this.takeTrip()
            this.cardprice = Number(this.eftcount) * this.route_cost
            // this.count = Number(this.eftcount)
            this.price = Number(this.cardprice)
            console.log(this.count, this.cardprice);
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
                    // this.departures = results.data.data;

                    // this.count = results.data.data

                    // console.log(this.destinations);

                })

                .catch(error => console.error(error))
        },

        displayTotal() {
            const current_driver = JSON.parse(localStorage.getItem('taxi'))
            console.log(current_driver);
            console.log(current_driver.route.price);
            this.current_taxi_id = current_driver.taxi_id
            console.log(this.current_taxi_id);
            const token = localStorage.getItem('access_key_driver')
            axios.post(`${remote_url}/api/driver`,
                {
                    //  headers: {
                    // "Authorization" : `Bearer ${token}`,
                    // departure: this.departure,
                    taxi_id:this.current_taxi_id,
                    destination: this.destination,
                    no_of_cashpaid_passenger: this.no_of_cashpaid_passenger


                    //   }
                })
                .then(result => {
                        this.cashprice = current_driver.route.price * Number(this.no_of_cashpaid_passenger)
                        console.log(this.cashprice);

                        this.routes = result.data
                        console.log(this.routes);
                        this.reg_number = result.data.data.reg_number
                        this.count = Number(this.eftcount) + Number(this.no_of_cashpaid_passenger)
                        console.log(this.count);
                    
                   
                })

        },

        update_taxi_status(){
            this.drivers_details()
            console.log(this.driverDetails);

            console.log(this.driverDetails.user_id);
            axios
            .post(`${remote_url}/api/route_queue/${this.driverDetails.user_id}`,{
                // taxi_id:this.taxi_id,
                status:this.taxi_status.status,
                route:this.destination
            })
            .then(result=>{
                console.log(result.data);
            })
        },

        passenger_count(){
            this.drivers_details()
            console.log(this.driverDetails.taxi_id);
            // this.taxi_info_id = this.taxi_data[0].taxi_id;
            axios
            .post(`${remote_url}/api/passenger_count`,{
                taxi_id: this.driverDetails.taxi_id,    
            })
            .then(result=>{
                this.eftcount = result.data.data.count;

                console.log(result.data.data.count);
            })
        },
    }
}


export default Drivers