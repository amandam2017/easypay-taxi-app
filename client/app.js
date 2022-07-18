import axios from 'axios'
import Login from './login'
import Routes from './routes'
const localUrl = 'http://localhost:2000'
const remote_url = 'https://easypay-taxi-app.herokuapp.com'

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
            .post(`${remote_url}/api/signup`, {
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
