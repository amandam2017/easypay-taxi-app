import axios from 'axios'
const localUrl = 'http://localhost:2000'

let destination = 'All';
let departure = 'All';

const Routes = ()=>{
    return{
        destination:'',
        departure:'',

        
        
        findTaxiByRoute(){
            axios
            .get(`${localUrl}/api/taxis?destination=${this.destination}&departure=${this.departure}`)
        
            .then(function (result) {
                console.log(result.taxis)
            })
        }
}
}

export default Routes