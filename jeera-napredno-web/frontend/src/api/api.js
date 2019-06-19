import endpoints from './endpoints';
import axios from "axios";


const api = {
    getUserId(email){},
    login(email, password, callback){
        axios.post(endpoints.login, {email: email, password: password})
            .then((res) => callback(res))
            .catch((err) => {console.log(err)})
    },
    getTasks(_id, token, callback){
        axios.post(endpoints.getTasks, {user: _id, token: token})
            .then((res) => callback(res))
            .catch((err) => {console.log(err)})
    }
};

export default api;