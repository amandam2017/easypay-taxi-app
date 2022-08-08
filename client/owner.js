import axios from 'axios'
const remote_url = import.meta.env.VITE_SERVER_URL
const Owner = () => {
    return {
        owner_screen: false,
        register_taxis: false,
        reg_number: '',
        qty: '',
        owner_id:'',
        feedback_message: '',
        error_message: '',
        owners_taxis:'',
        owners_drivers:'',
        info:'',

        drivers_profile: '',
        init() {
            get_drivers()
        },
        get_drivers() {
            axios
                .post(`${remote_url}/api/registeredtaxis`, {
                    reg_number : this.reg_number,
                    qty : this.qty,
                    owner_id : this.owner_id
                })
                .then(results => {
                    // data:registered
                    console.log(results.data);
                    
                })
                .then(() => {
                    this.feedback_message = 'taxi has been registered to the owner'
                })
        },
        registerTaxi() {
            this.register_taxis = true
            this.drivers_profile = false
        },
        viewTaxis() {
            axios
            .get(`${remote_url}/api/owner/${this.owner_id}`,{
                
            })
            .then(results=>{
                //console.log(results.data);
                console.log(this.owner_id);
                console.log(results.data.drivers);
        this.owners_taxis=results.data.taxis
       this.owners_drivers =results.data.drivers
       //const mytaxis=results.data.taxis
                //this.owners_taxis=Object.keys(mytaxis).map((taxi))
            })
            this.drivers_profile = true,
                this.register_taxis = false
        },
        // displayDriverForOwner(){
        //     axios
        // }
    }
}
export default Owner