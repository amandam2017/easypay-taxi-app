
import axios from 'axios'
// const localUrl = 'http://localhost:2000'
// const remote_url = 'https://easypay-taxi-app.herokuapp.com/'
const remote_url=import.meta.env.VITE_SERVER_URL
const Login = ()=>{
    return{
        user:{
            
            Username:'',
            Password:''

        },
        register: false, loggedin: true,
        showroutes:false,
        // user_role:false,
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
            //.then(r => r.json)
            .then(results => {
            console.log(results.data);
            })
            .then(()=>{
                this.register = false
                this.loggedin = false
               this.showroutes = true
              })
            .catch(error => console.error(error))
           
            
    },
    logout() {
        localStorage.clear()
        this.login = true
        this.register = false
        this.showroutes = false
  
      },
}
}

export default Login

