import axios from 'axios'
const localUrl = 'http://localhost:2000'

const Login = ()=>{
    return{
        user:{
            
            Username:'',
            Password:''

        },
        // user_role:false,

    login() {
        axios
            .post(`${localUrl}/api/login`, {
                
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