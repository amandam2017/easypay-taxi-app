import axios from 'axios'
// const localUrl = 'http://localhost:2000'
// const remote_url = 'https://easypay-taxi-app.herokuapp.com/'
const remote_url=import.meta.env.VITE_SERVER_URL
const Routes = ()=>{
    return{
        taxis: [],
        routes:{
            user_departure:'',
            user_destination:''
        },
        
        findTaxiByRoute(){
            axios
            .post(`${remote_url}/api/taxis`, this.routes)
            // alert(`${this.depature}, ${this.destination}`)
            // .then(r => r.json())
            .then(results=>{
                // console.log(data);
                console.log(results.data);
                // this.routes = results.data
                this.taxis = results.data.data
                // this.destination = results.data
            })
            .catch(err => console.log(err))
            
        }
}
}

export default Routes


