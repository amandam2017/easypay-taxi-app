import axios from 'axios'
import Login from './login'
import Routes from './routes'
const localUrl = 'http://localhost:2000'

const Taxi = ()=>{
    return{
        ...Login(),
        ...Routes(),
        user:{
            name:'',
            surname:'',
            username:'',
            password:'',
            role:''
        },

    signup() {
        axios
            .post(`${localUrl}/api/signup`, {
                name: this.user.name,
                surname: this.user.surname,
                username: this.user.username,
                password: this.user.password,
                role: this.user.role,

            })

            .then(result => {
                console.log(result.data);
            })
    }
}
}

export default Taxi
