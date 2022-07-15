import axios from 'axios'
const localUrl = 'http://localhost:2000'

const Routes = ()=>{
    return{
        destination:'',
        depature:'',
        
        findTaxiByRoute(){
            axios
            .post(`${localUrl}/api/taxis`,{
                depature: this.depature,
                destination:this.destination,
            })
            // alert(`${this.depature}, ${this.destination}`)
            .then(r => r.json())
            .then(results=>{
                console.log(data);
                console.log(results.data);
                this.depature = results.data
                this.destination = results.data
            })
            .catch(err => console.log(err))
            
        }
}
}

export default Routes


