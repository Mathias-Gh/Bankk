import AxiosConfiguration from "../AxiosConfiguration";

export async function Register(email, password) {
    AxiosConfiguration.post('/register', {email, password})
    .then(reponse => {
        console.log(reponse.data)
    })
    .catch(error => {
        console.log(error)
    })
}

 export async function Login(email, password) {
    AxiosConfiguration.get('/login', {email, password})
    .then(reponse => {
        console.log(reponse.data)
    })
    .catch(error => {
        console.log(error)
    })
}