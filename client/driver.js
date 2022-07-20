import axios from 'axios'

const remote_url = import.meta.env.VITE_SERVER_URL
const Driver = () => {
    return {
        init(){
            
            this.driver()

        },
        departures: [],
        destinations: [],



        driver() {
            axios
                .get(`${remote_url}/api/routes`, {

                })
                .then(results => {
                    console.log(results.data.data);
                  this.destinations=results.data.data
                    console.log(this.destinations);
                })

                .catch(error => console.error(error))
        }

    }
}


export default Driver
