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
        id:'',

        drivers_profile: '',
        driver_profile: '',
        driver_info:'',
        user: {},
        driver:'',
        init() {
            get_drivers()
            this.user = localStorage.getItem('user_name')
             this.owner_id = this.user.id;
             console.log(this.owner_id);
        },
        drivers_details(){
            axios
            .get(`${remote_url}/api/driver/${id}`)
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
        viewDriver(){
            this.owners_drivers = false
            this.driver = true
            // this.drivers_profile = false
        },
        registerTaxi() {
            this.register_taxis = true
            this.drivers_profile = false
        },
        viewTaxis() {
            this.user = JSON.parse(localStorage.getItem('user_name'))
            this.owner_id = this.user.id;
            console.log(this.user);
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