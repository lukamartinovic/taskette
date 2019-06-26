import endpoints from './endpoints';
import axios from "axios";


const api = {
    passwordStrength: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    getUserId(email){},
    login(email, password, callback, errorCallback){
        axios.post(endpoints.login, {email: email, password: password})
            .then((res) => callback(res))
            .catch((err) => errorCallback(err))
    },
    getTasks(_id, token, callback){
        axios.post(endpoints.getTasks, {user: _id, token: token})
            .then((res) => callback(res))
            .catch((err) => {console.log(err)})
    },
    changeTaskStatus(_id, status, token, callback){
        axios.post(endpoints.changeTaskStatus, {id: _id, token: token, status: status})
            .then((res) => callback(res))
            .catch((err) => {console.log(err)})
    },
    getUsers(token, pageSize, page, callback, errorCallback){
        axios.post(endpoints.getUsers, {token:token, pageSize: pageSize, page:page})
            .then((res) => callback(res))
            .catch((err) => errorCallback(err))
    },
    addUser(email, firstName, lastName, password, role, token, callback, errorCallback){
        axios.post(endpoints.addUser,
            {email: email, firstName: firstName, lastName: lastName, password: password, token: token, role:role})
            .then((res) => callback(res))
            .catch((err) => errorCallback(err.response.data))
    },
    validateToken(token, callback, errorCallback){
        axios.post(endpoints.validateToken, {token:token})
            .then((res)=> callback(res))
            .catch((err) => errorCallback(err))
    },
    searchUsers(token, searchString, n, callback, errorCallback){
        axios.post(endpoints.searchUsers, {token:token, searchString:searchString, n:n})
            .then((res)=>{callback(res)})
            .catch((err)=>{errorCallback(err)})
    },
    getProjects(token, page, pageSize, callback, errorCallback){
        axios.post(endpoints.getProjects, {token:token, page:page, pageSize:pageSize})
            .then((res)=>{callback(res)})
            .catch((err) => {errorCallback(err)})
    },
    getUsersById(token, _ids, callback, errorCallback){
        axios.post(endpoints.getUsersById, {token:token, _ids:_ids})
            .then((res) => {callback(res)})
            .catch((err) =>{errorCallback(err)})
    },
    //TODO: figure out the company stuff
    addProject(token, users, description, name, callback, errorCallback){
        axios.post(endpoints.addProject, {token:token, name:name, users:users, description:description, company: "5d0d283a95283114b0a5df21"})
            .then((res)=>{callback(res)})
            .catch((err)=>{errorCallback(err)})
    },
    editProjectUsers(token, project, users, callback, errorCallback){
        axios.post(endpoints.editProjectUsers, {token:token, project:project, users:users})
            .then((res)=>{callback(res)})
            .catch((err)=>{errorCallback(err)})
    },
    addSprint(token, project, points, startDate, endDate, name, callback, errorCallback){
        axios.post(endpoints.addSprint, {token:token, project:project, startDate:startDate, endDate:endDate, points:points, name:name})
            .then((res)=>{callback(res)})
            .catch((err)=>{errorCallback(err)})
    },
    getSprints(token, callback, errorCallback){
        axios.post(endpoints.getSprints, {token:token})
            .then((res)=>{callback(res)})
            .catch((err)=>{errorCallback(err)})
    },
    addTask(token, user, email, name, description, points, due, sprint, callback, errorCallback){
        axios.post(endpoints.addTask, {token: token, user:user, email:email, name:name, description:description, points:points, sprint:sprint, due:due})
            .then((res) => callback(res))
            .catch((err) => errorCallback(err.response.data))
    },
    getSubEmployees(token, callback, errorCallback){
        axios.post(endpoints.getEmployees, {token:token})
            .then((res)=>{callback(res)})
            .catch((err)=>{errorCallback(err)})
    }

};

export default api;