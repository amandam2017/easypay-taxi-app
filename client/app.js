import axios from 'axios'
import Driver from './driver'
import Login from './login'
import Owner from './owner'
import Routes from './routes'
import Drivers from './driver'

const remote_url=import.meta.env.VITE_SERVER_URL
const Taxi = ()=>{
    return{
        ...Login(),
        ...Routes(),
        ...Driver(),
        ...Owner(),
        ...Drivers(),
        
        // landing:true,
        init(){
            // this.drivers_details()
            if(localStorage['access_key_driver'] !== undefined){
                this.driver_screen = true
                this.landing = false
            }
            if(localStorage['access_key_pass'] !== undefined){
                this.passenger_screen = true

                this.landing = false
            }
            if(localStorage['access_key_owner'] !== undefined){
                this.owner_screen = true
                this.drivers_profile = true
                this.landing = false
            }
            else{
                return 'no user'
            }
        },

        hideLogin() {
            this.loggedin = false
            this.register = true
        
          },
          hideRegister() {
            this.loggedin = true
            this.register = false
          },
        role:'Passenger',
        user:{
            name:'',
            surname:'',
            username:'',
            password:'',
            role:'Driver'
        },
        feedback_message:'',

    signup() {
        axios
            .post(`${remote_url}/api/signup`, {
                name: this.user.name,
                surname: this.user.surname,
                username: this.user.username,
                password: this.user.password,
                role: this.user.role,

            })

            .then(result => {
                console.log(result.data);
                this.feedback_message = result.data.message
                setTimeout(() =>{
                    this.feedback_message = ''
                },3000 )
            })

            this.user.name = ''
            this.user.surname = ''
            this.user.username = ''
            this.user.password = ''
            this.user.role = ''
    }
}
}

export default Taxi