import axios from 'axios'
const localUrl = 'http://localhost:2000'

const Login = ()=>{
    return{
        user:{
            
            username:'',
            password:''

        },
        // user_role:false,

    login() {
        axios
            .post(`${localUrl}/api/login`, {
                
                username: this.user.username,
                password: this.user.password

            })

            .then(results => {
                console.log(results.data);
            })
    },
}
}

export default Login