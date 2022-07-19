
import axios from 'axios'

const remote_url=import.meta.env.VITE_SERVER_URL
const Login = ()=>{
    return{
        landing:true, 
        user:{
            
            Username:'',
            Password:''

        },
        error_message: '',
        register: false, 
        loggedin: true,
        showroutes:false,

        hideLogin() {
            this.loggedin = false
            this.register = true
        
          },
          hideRegister() {
            this.loggedin = true
            this.register = false
          },
          

    login() {
        axios
            .post(`${remote_url}/api/login`, {
                
                username: this.user.Username,
                password: this.user.Password

            })
            
            .then(results => {
            console.log(results.data.message);
            if (results.data == 'User does not exist' && this.user == '') {
                this.error_message = results.data.message
                this.loggedIn = false
                this.registerForm = true
               this.showroutes = false
            } 
            })
            .then(()=>{
                this.register = false
                this.loggedin = false
               this.showroutes = true
                this.landing = false

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

