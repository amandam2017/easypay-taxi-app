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
        selectedDriver: {},

        drivers_profile: '',
        driver_profile: '',
        driver_info:'',
        user: {},
        driver:'',
        reg:'',
        init() {
            this.user = localStorage.getItem('user_name')
             this.owner_id = this.user.id;
             console.log(this.owner_id);
        },
        drivers_details(){
            this.user = JSON.parse(localStorage.getItem('user_name'))
            this.id = this.user.id;
            console.log(this.user);
            axios
            .get(`${remote_url}/api/driver/${this.id}`)
            .then(results =>{
                console.log(results.data.data.reg_number);
                this.reg = results.data.data.reg_number
            })
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
                    this.feedback_message = 'taxi has been registered by the owner'
                })
        },
        viewDriver(user){
            this.owners_drivers = false
            this.driver = true
            this.selectedDriver = user;
            console.log(this.selectedDriver);
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
                console.log(this.owner_id);
                console.log(results.data.drivers);
                this.owners_taxis=results.data.taxis
                this.owners_drivers =results.data.drivers
            })
            this.drivers_profile = true,
                this.register_taxis = false
        },
  
    }
}
export default Owner