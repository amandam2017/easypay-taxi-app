import axios from 'axios'

const remote_url=import.meta.env.VITE_SERVER_URL
const Routes = ()=>{
    return{
        taxis: [],
        routes:{
            user_departure:'',
            user_destination:''
        },

        register: false, 
        loggedin: false,
        showroutes:false,
        
        findTaxiByRoute(){
            axios
            .post(`${remote_url}/api/taxis`, this.routes)
    
            .then(results=>{

                console.log(results.data);
                this.taxis = results.data.data
            })
            .catch(err => console.log(err))
            
        }
}
}

export default Routes


