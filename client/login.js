import axios from 'axios'
import Owner from './owner'

const remote_url=import.meta.env.VITE_SERVER_URL
const Login = ()=>{
    
    return{
        ...Owner(),
        driver:{},
        drivers_id:'',

        init(){
            this.driver = localStorage.getItem('user_name')
             this.drivers_id = this.driver.id;
             console.log(this.drivers_id);
        },

        signing_btns:true,
        signout: false,

        landing:true, 
        user:{
            Username:'',
            Password:'',
            id:''
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
        success_pay: false,
        owner_screen :false,
        

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

          hidelanding(){
            this.driver_screen = true
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
      
            .then(results => {
                this.access_token = results.data.token
                this.user =  results.data.data;
                console.log('user :'+this.user);
                localStorage.setItem('user_name', JSON.stringify(results.data.data))

            
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
                    // localStorage.setItem('user_name', results.data.message)
                        this.passenger_screen = true
                        
                        this.driver_screen = false,
                        this.loggedin = false,
                        this.landing = false,
                        this.feedback_message = `${results.data.message} is logged in`
                        this.signing_btns = false
                }
    
                if(results.data.role == 'Driver'){
                    // localStorage.setItem('user_name', results.data.message)
                    this.passenger_screen = false,
                    this.driver_screen = true,
                    this.loggedin = false,
                    this.landing = false,
                    this.access_token = results.data.token,
                    localStorage.setItem('access_key_driver', this.access_token)
                    this.feedback_message = `${results.data.message} is logged in`
                    this.signing_btns = false
                    this.signout = true
                    // this.takeTrip()
                    this.reg = this.drivers_details()
                    // this.signing_btns = false

                    
                }
                // } 
                if(results.data.role == 'Owner'){
                // localStorage.setItem('user_name', results.data.data)
                this.passenger_screen = false,
                this.driver_screen = false,
                this.loggedin = false,
                this.landing = false,
                this.owner_screen = true,
                this.access_token = results.data.token,
                localStorage.setItem('access_key_owner', this.access_token)
                // this.owner_id = 56
                this.viewTaxis()
                // this.drivers_details()
                this.feedback_message = `${results.data.message} is logged in`
                this.signing_btns = false


            }

            

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
        this.driver_screen = false
        this.passenger_screen = false
        this.success_pay=false
        this.landing = true
        this.owner_screen = false
        this.signing_btns = true
        this.Reviews = false
  
      },
}
}

export default Login