import axios from 'axios'
const localUrl = 'http://localhost:2000'

const Routes = ()=>{
    return{
        routes:{
            user_departure:'',
            user_destination:''
        },
        
        findTaxiByRoute(){
            axios
            .post(`${localUrl}/api/taxis`, this.routes)
            // alert(`${this.depature}, ${this.destination}`)
            // .then(r => r.json())
            .then(results=>{
                // console.log(data);
                console.log(results.data);
                this.routes = results.data
                // this.destination = results.data
            })
            .catch(err => console.log(err))
            
        }
}
}

export default Routes


