import axios from 'axios'

const remote_url = import.meta.env.VITE_SERVER_URL
const Owner = () => {
    return {
        owner_screen: false,
        register_taxis: false,
        assign_taxi: false,
        reg_number: '',
        qty: '',
        owner_id:'',
        feedback_message: '',
        error_message: '',
        owners_taxis:'',
        owners_drivers:'',
        info:'',
        id:'',
        selectedDriver: {},

        drivers_profile: false,
        // driver_profile: '',
        driver_info:'',
        user: {},
        driver:'',
        reg:'',
        driver_id:'',
        taxi:'',
        user_id:'',
        taxi_id:'',
        drivers_profit:{},
        show_driversprofit: false,
        user_id:{},
        alldrivers:'',
        all_drivers:true,
        init() {
            this.driversDailyTrip()
            this.user = localStorage.getItem('user_name')
             this.owner_id = this.user.id;
             console.log(this.owner_id);
             this.viewTaxis()
        },

        get_drivers() {
            axios
                .post(`${remote_url}/api/registeredtaxis`, {
                    reg_number : this.reg_number,
                    qty : this.qty,
                    owner_id : this.owner_id
                })
                .then(results => {
                    console.log(results.data);
                    this.feedback_message = 'taxi has been registered by the owner'
                    this.error = true; 
                })

                setTimeout(() => {
                    this.feedback_message = ''
                    this.error = false;
                }, 3000);
        },
        viewDriver(user){
            console.log(user);
            this.owners_drivers = false
            this.driver = true
            this.selectedDriver = user;
            console.log(this.selectedDriver);
        },

        driversDailyTrip(user){
            console.log(user);
            this.driver_id = user.taxi_id
            console.log(this.driver_id);
            axios
            .get(`${remote_url}/api/drivertrip/${this.driver_id}`)
            .then(results=>{
                console.log(results.data.driversTrips);
                this.drivers_profit = results.data.driversTrips;
                console.log(this.drivers_profit);
            })
            this.show_driversprofit = true
        },
        
        registerTaxi() {
            this.register_taxis = true
            this.drivers_profile = false
            // this.assign_taxi = true
        },
        viewTaxis() {
            this.user = JSON.parse(localStorage.getItem('user_name'))
            this.owner_id = this.user.id;
            console.log(this.user);
            axios
            .get(`${remote_url}/api/owner/${this.owner_id}`,{
                
            })
            .then(results=>{
                console.log(this.owner_id);
                console.log(results.data.drivers);
                this.owners_taxis=results.data.taxis
                this.owners_drivers =results.data.drivers
            })
            this.drivers_profile = true,
            this.register_taxis = false
        },
        removetaxi(info){
            console.log(info);
            axios
                .delete(`/api/removetaxi/${info.id}`)
                 .then(() => this.viewTaxis())
            this.info_message = 'taxi deregistered!'
            this.error = true;

            setTimeout(() =>  { 
                this.info_message = '';
                this.error = false;
            }, 3000);

        },
        linkdrivers() {
            axios
                .post(`${remote_url}/api/linkdrivers`, {
                    user_id : this.user_id,
                    taxi_id : this.taxi_id
                })
                .then(results => {
                    // data:registered
                    console.log(results.data);
        
                })
            }, 
            
            seeAlldrivers(){
                axios
                .get(`${remote_url}/api/alldrivers`)
                .then(results=>{
                    console.log(results.data);
                    this.alldrivers = results.data;
                    console.log(this.alldrivers);
                })
            },
  
    }
}
export default Owner

// app.post(`/api/linkpassenger_payment`, async (req, res)=>{
        
//     try {
//         const { amount } = req.body;
//         console.log(amount);
        
//         await db.none(`UPDATE drivers SET amount = $1 WHERE user_id = user_id AND taxi_id = taxi_id`,[amount])

//         res.json({
//             message: 'Allocated passenger payment to a taxi'
//         })
//     } catch (error) {
//         res.status(500)
//         .json({
//             message: error.message
//         })
//     }
    
// })

// app.post(`/api/linkpassenger_payment/:id`, async (req, res)=>{
        
//     try {
//     const {id} = req.params
//     const drivers = await getDriversByUserId(id)
//     // const pass = await getPassengersByUserId(id)
//     // console.log(pass);

//         const { amount } = req.body;

//         console.log(amount);
        
//         await db.none(`UPDATE drivers SET amount = $1 WHERE taxi_id = $2`,[amount, drivers.taxi_id])
//         const payment_made = await db.oneOrNone(`select amount from drivers where taxi_id = $1`, [drivers.taxi_id])

//         res.json({
//             message: 'Allocated passenger payment to a taxi',
//             data: payment_made
//         })
//     } catch (error) {
//         res.status(500)
//         .json({
//             message: error.message
//         })
//     }
    
// })