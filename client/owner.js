import axios from 'axios'
const remote_url=import.meta.env.VITE_SERVER_URL
const Owner = ()=>{
    return{
        owner_screen: true,
        register_taxis: false,
        taxi_data:{
            taxi_reg:'',
            qty:'',
            owners_id:''
        },
        drivers_profile:'',
        init(){
        },
        get_drivers(){
            axios
            .get(`${remote_url}/api/owner`,{
            })
            .then(results=>{
                console.log(results.data);
                console.log(results.data.data.username);
            })
        },
        registerTaxi(){
            this.register_taxis = true
            this.drivers_profile = false
        },
        viewTaxis(){
            this.drivers_profile = true,
            this.register_taxis = false
        },
    }
}
export default Owner