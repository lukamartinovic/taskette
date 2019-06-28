import endpoints from './endpoints';
import axios from "axios";

function apiCallPOST(endpoint, data, callback, errorCallback){
    axios.post(endpoint, data)
        .then(res => callback(res))
        .catch(err => errorCallback(err))
}

const api = {
    passwordStrength: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    getUserId(email){},
    login(email, password, callback, errorCallback){
        apiCallPOST(endpoints.login, {email:email, password:password}, callback, errorCallback)
    },
    getTasks(user_id, token, callback, errorCallback){
        apiCallPOST(endpoints.getTasks, {_id:user_id, token:token}, callback, errorCallback)
    },
    changeTaskStatus(task_id, status, token, callback, errorCallback){
        apiCallPOST(endpoints.changeTaskStatus, {_id:task_id, status:status, token:token}, callback, errorCallback)
    },
    getUsers(token, pageSize, page, callback, errorCallback){
        apiCallPOST(endpoints.getUsers, {token: token, pageSize:pageSize, page:page}, callback, errorCallback)
    },
    addUser(email, firstName, lastName, password, role, token, callback, errorCallback){
        apiCallPOST(endpoints.addUser, {email:email, firstName:firstName, lastName:lastName, password:password, role:role, token:token}, callback, errorCallback)
    },
    validateToken(token, callback, errorCallback){
        apiCallPOST(endpoints.validateToken, {token:token}, callback, errorCallback)
    },
    searchUsers(token, searchString, n, callback, errorCallback){
        apiCallPOST(endpoints.searchUsers, {token:token, searchString:searchString, n:n}, callback, errorCallback)
    },
    getProjects(token, page, pageSize, callback, errorCallback){
        apiCallPOST(endpoints.getProjects, {token:token, page:page, pageSize:pageSize}, callback, errorCallback)
    },
    getUsersById(token, _ids, callback, errorCallback){
        apiCallPOST(endpoints.getUsersById, {token:token, _ids:_ids}, callback, errorCallback);
    },
    addProject(token, users, description, name, callback, errorCallback){
        apiCallPOST(endpoints.addProject, {token:token, users:users, description: description, name: name}, callback, errorCallback)
    },
    editProjectUsers(token, project, users, callback, errorCallback){
        apiCallPOST(endpoints.editProjectUsers, {token:token, project:project, users:users}, callback, errorCallback)
    },
    addSprint(token, project, points, startDate, endDate, name, callback, errorCallback){
        apiCallPOST(endpoints.addSprint, {token:token, project:project, startDate:startDate, endDate:endDate, points:points, name:name}, callback, errorCallback)
    },
    getSprints(token, callback, errorCallback){
        apiCallPOST(endpoints.getSprints, {token:token}, callback, errorCallback)
    },
    addTask(token, user, email, name, description, points, due, sprint, callback, errorCallback){
        apiCallPOST(endpoints.addTask, {token: token, user:user, email:email, name:name, description:description, points:points, sprint:sprint, due:due}, callback, errorCallback)
    },
    getSubEmployees(token, callback, errorCallback){
        apiCallPOST(endpoints.getEmployees, {token:token}, callback, errorCallback)
    }
};

export default api;