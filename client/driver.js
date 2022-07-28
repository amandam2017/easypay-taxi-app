import axios from 'axios'

const remote_url = import.meta.env.VITE_SERVER_URL
const Driver = () => {
    return {
        init(){
           
            // this.driver()

        },
        routes: [],
        departures: [],
        destinations: [],
        destination :'',
        departure :'',
        // count = 0,

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

                    // console.log(this.departures);

                //   this.destinations=results.data.data
                })

                .catch(error => console.error(error))
        }

    }
//     passengerIncrement() {
//          return this.count++
//     },
//     passengerDecrement() {
//         return this.count--
//    }
}


export default Driver
