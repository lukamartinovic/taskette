const host = "http://localhost:3000";
const endpoints = {
    getTasks: `${host}/user/tasks`,
    login: `${host}/user/login`,
    changeTaskStatus: `${host}/task/changeStatus`,
    getUsers: `${host}/users`,
    addUser: `${host}/user/add`,
    validateToken: `${host}/user/validateToken`
};

export default endpoints;