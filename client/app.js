import axios from 'axios'
import Driver from './driver'
import Login from './login'
import Routes from './routes'

const remote_url=import.meta.env.VITE_SERVER_URL
const Taxi = ()=>{
    return{
        ...Login(),
        ...Routes(),
        ...Driver(),
        // landing:true,
        init(){
            this.driver()
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