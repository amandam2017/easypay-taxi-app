
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
            role:''

        },
        feedback_message:'',
        error_message: '',
        register: false, 
        loggedin: false,
        showroutes:false,
        main_screen :false,

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
                role:this.user.role

            })
            
            .then(results => {
            console.log(results.data);
            
            if (results.data.message == 'User does not exist please sign up below') {
                this.error_message = results.data.message
                    this.loggedin = false,
                    this.register = true
                    this.showroutes = false
                setTimeout(() =>{
                    this.error_message = ''
                },3000 )
            }

            else{
                this.showroutes = true,
                this.loggedin = false,
                this.feedback_message = results.data.message
    
            }
            })
           
            .catch(error => console.error(error))
           
            
    },
    logout() {
        localStorage.clear()
        this.login = true
        this.register = false
        this.showroutes = false
        this.landing = true

  
      },
}
}

export default Login

