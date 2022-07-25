import axios from 'axios'

const remote_url=import.meta.env.VITE_SERVER_URL
const Routes = ()=>{
    return{
        taxis: [],
        // route:{
            departure:'',
            destination:'',
        // },
        init(){
            findTaxiByRoute()
        },
        
        findTaxiByRoute(){
            axios
            .post(`${remote_url}/api/taxis`,{
                departure:this.departure,
                destination:this.destination
            })
    
            .then(result=>{
                console.log(result.data.data);
                this.taxis = result.data.data
            })
            .catch(err => console.log(err))
            
        }
}
}

export default Routes