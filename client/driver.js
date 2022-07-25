import axios from 'axios'

const remote_url = import.meta.env.VITE_SERVER_URL
const Driver = () => {
    return {
        init(){
            
            // this.driver()

        },
        departures: [],
        destinations: [],
        destination :'',
        departure :'',

        driver() {
            axios
                .get(`${remote_url}/api/routes`, {

                })
                .then(results => {
                    // console.log(this.departures = results.data.data2);
                    // console.log(this.destinations = results.data.data);

                    this.destinations = results.data.data;
                    this.departures = results.data.data;

                    console.log(this.destinations);

                    // console.log(this.departures);

                //   this.destinations=results.data.data
                })

                .catch(error => console.error(error))
        }

    }
}


export default Driver
