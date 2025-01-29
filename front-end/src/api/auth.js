import axiosConfig from "../axios.config";

export async function Register(email, password) {
    axiosConfig.post('/register', {email, password})
    .then(reponse => {
        console.log(reponse.data)
    })
    .catch(error => {
        console.log(error)
    })
}

 export async function Login(email, password) {
    axiosConfig.get('/login', {email, password})
    .then(reponse => {
        console.log(reponse.data)
    })
    .catch(error => {
        console.log(error)
    })
}