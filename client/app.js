import axios from 'axios'
const localUrl = 'http://localhost:2000'

const Taxi = ()=>{
    return{
        user:{
            name:'',
            surname:'',
            username:'',
            password:'',
            role:''
        },
        // user_role:false,

    signup() {
        axios
            .post(`${localUrl}/api/signup`, {
                name: this.user.name,
                surname: this.user.surname,
                username: this.user.username,
                password: this.user.password,
                role: this.user.role,

            })

            .then(results => {
                console.log(results.data);
            })
    },
}
}

export default Taxi
