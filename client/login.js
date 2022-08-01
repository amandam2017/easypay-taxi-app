
import axios from 'axios'

const remote_url=import.meta.env.VITE_SERVER_URL
const Login = ()=>{
    return{

        init(){
             
            // this.logging()
            // if(localStorage['access_key_driver'] !== undefined) {
            //     this.access_token = localStorage.getItem('access_key_driver')
            //     this.driver_screen,
            //     this.logging()
            // }

            // if(localStorage['access_key_driver'||'access_key_pass'] !== undefined) {
            //     this.access_token = localStorage.getItem('access_key_driver'||'access_key_pass')
            //     this.driver_screen || this.passenger_screen
            // }

        },
        landing:true, 
        user:{
            
            Username:'',
            Password:'',
        },
        feedback_message:'',
        error_message: '',
        register: false, 
        loggedin: false,
        driver_screen:false,
        main_screen :false,
        passenger_screen: false,
        payment_screen:false,
        access_token:null,

        hideLogin() {
            this.loggedin = false
            this.register = true
            this.landing = false
        
          },
          hideRegister() {
            this.loggedin = true
            this.register = false
            this.landing = false
          },

          displayRoutes(){
              axios
              .get(`${remote_url}/api/routes`, {

              })
              .then(results => {
                  console.log(results.data);
              })
          },
          

    logging() {
        axios
            .post(`${remote_url}/api/login`, {
                
                username: this.user.Username,
                password: this.user.Password,
                // role:this.user.role

            })
            
            // console.log(results.data);
            // console.log(results.data.token);
            .then(results => {
                this.access_token = results.data.token
                if(results.data.role == 'Driver' && this.access_token){
                    localStorage.setItem('access_key_driver', results.data.token)
                    this.driver_screen = true,
                    this.landing = false
                    
                    // this.access_token = results.data.token
                }
                // console.log(this.access_token);
            
            if (results.data.message =='User does not exist please sign up below') {
                this.error_message = results.data.message
                    this.loggedin = false
                    this.register = false
                    this.driver_screen = false
                setTimeout(() =>{
                    this.error_message = ''
                },3000 )
            }
            // else{
            //     this.error_message = results.data.message
            // }

            // if(results.data.role == 'Passenger' || results.data.role == 'Driver'){
            //     this.get_token = results.data.token 
                
                if(results.data.role == 'Passenger'){
                    this.access_token = results.data.token,
                    console.log('token?? '+this.access_token);
                    localStorage.setItem('access_key_pass', this.access_token)
                    // .then(()=>{
                        this.passenger_screen = true
                        
                        this.driver_screen = false,
                        this.loggedin = false,
                        this.landing = false,
                        this.feedback_message = results.data.message
                    // })
                }
    
                if(results.data.role == 'Driver'){
                    this.passenger_screen = false,
                    this.driver_screen = true,
                    this.loggedin = false,
                    this.landing = false,
                    this.access_token = results.data.token,
                    localStorage.setItem('access_key_driver', this.access_token)
                    this.feedback_message = results.data.message
    
                }
            // }

            

            else{
                this.loggedin = false  
    
            }
            })
           
            .catch(error => console.error(error))
           
            
    },
    logout() {
        localStorage.clear()
        this.loggedin = false
        this.register = false
        this.driver_screen = false,
        this.passenger_screen = false,
        this.landing = true

  
      },
}
}

export default Login