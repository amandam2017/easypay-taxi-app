import axios from 'axios'
const localUrl = 'http://localhost:2000'
const remote_url = 'https://easy-pay-taxi.herokuapp.com/'

const Login = ()=>{
    return{
        user:{
            
            Username:'',
            Password:''

        },
        // user_role:false,

    login() {
        axios
            .post(`${remote_url}/api/login`, {
                
                username: this.user.Username,
                password: this.user.Password

            })
            .then(r => r.json)
            .catch(error => console.error(error))
           // .then(results => {
               // console.log(results.data);
           // })
            
    },
}
}

export default Login