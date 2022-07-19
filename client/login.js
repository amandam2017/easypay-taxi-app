
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
            if (results.data.message === 'User does not exist') {
                this.error_message = results.data.message
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

