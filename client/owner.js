import axios from 'axios'

const remote_url=import.meta.env.VITE_SERVER_URL
const Owner = ()=>{
    return{
        owner_screen: true,
        register_taxis:'',
        taxi_data:{
            drivers_name:'',
            taxi_reg:'',
            owners_name:''
        },
        init(){

        },

        registerTaxi(){
            this.register_taxis = true
        }
    }
}

export default Owner