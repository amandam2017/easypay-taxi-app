
import axios from 'axios'

const remote_url=import.meta.env.VITE_SERVER_URL
const Login = ()=>{
    return{
        init(){
            
            this.logging()

        },
        landing:true, 
        user:{
            
            Username:'',
            Password:'',
            // role:''

        },
        feedback_message:'',
        error_message: '',
        register: false, 
        loggedin: false,
        driver_screen:false,
        main_screen :false,
        passenger_screen: false,
        payment_screen:false,

        hideLogin() {
            this.loggedin = false
            this.register = true
        
          },
          hideRegister() {
            this.loggedin = true
            this.register = false
          },
          

    logging() {
        axios
            .post(`${remote_url}/api/login`, {
                
                username: this.user.Username,
                password: this.user.Password,
                // role:this.user.role

            })
            
            .then(results => {
            console.log(results.data);
            console.log(results.data.role);
            
            if (results.data.message =='User does not exist please sign up below') {
                this.error_message = results.data.message
                    this.loggedin = false
                    this.register = false
                    this.driver_screen = false
                setTimeout(() =>{
                    this.error_message = ''
                },3000 )
            }
            else{
                this.error_message = results.data.message
            }

            if(results.data.role == 'Passenger'){
                this.passenger_screen = true,
                this.driver_screen = false,
                this.loggedin = false,
                this.feedback_message = results.data.message
            }

            if(results.data.role == 'Driver'){
                this.passenger_screen = false,
                this.driver_screen = true,
                this.loggedin = false,
                this.feedback_message = results.data.message
            }

            else{
                this.loggedin = true  
    
            }
            })
           
            .catch(error => console.error(error))
           
            
    },
    logout() {
        localStorage.clear()
        this.login = true
        this.register = false
        this.driver = false
        this.landing = true

  
      },
}
}

export default Login

