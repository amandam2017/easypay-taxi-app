import axios from 'axios'

const remote_url = import.meta.env.VITE_SERVER_URL
const Driver = () => {
    return {
        init(){
            this.displayTotal()
            // this.driver()

        },
        routes: [],
        departures: [],
        destinations: [],
        destination :'',
        departure :'',
        count: 0,
        no_of_cashpaid_passenger:'',
        price:'',

        driver() {
            axios
                .get(`${remote_url}/api/routes`, {

                })
                .then(results => {
                    // console.log(this.departures = results.data.data2);
                    // console.log(this.destinations = results.data.data);

                    this.destinations = results.data.data;
                    this.departures = results.data.data;
                    this.routes = results.data.data
                    console.log(this.destinations);

                })

                .catch(error => console.error(error))
        },
        passengerIncrement() {
            return this.count++
        },
        passengerDecrement() {
            return this.count--
        },
        displayTotal(){
            axios
            .post(`${remote_url}/api/driver`,{
                departure:this.departure,
                destination:this.destination,
                no_of_cashpaid_passenger:this.no_of_cashpaid_passenger
            })
            .then(result =>{
                console.log(result.data);
                this.price = result.data.price.price * this.no_of_cashpaid_passenger          

            })

        }
    }
    
}


export default Driver
