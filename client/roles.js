import axios from 'axios'

const remote_url=import.meta.env.VITE_SERVER_URL
const Roles = ()=>{
    return{
        role:'',

    roles() {
        axios
            .post(`${remote_url}/api/roles`, {   
                role: this.role
            })
            
            .then(results => {
                console.log(results.data);
            
            })
           
            .catch(error => console.error(error))
           
            
    }

}
}

export default Roles