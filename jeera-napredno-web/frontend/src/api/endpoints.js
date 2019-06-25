//TODO: make this an environment variable
const host = "http://localhost:3000";

const endpoints = {
    getTasks: `${host}/user/tasks`,
    login: `${host}/user/login`,
    changeTaskStatus: `${host}/task/changeStatus`,
    getUsers: `${host}/users`,
    addUser: `${host}/user/add`,
    validateToken: `${host}/user/validateToken`,
    searchUsers: `${host}/user/search`,
    getProjects: `${host}/projects`,
    getUsersById: `${host}/user/getUsers`,
    addProject: `${host}/project/add`,
    editProjectUsers: `${host}/project/editUsers`,
    addSprint: `${host}/sprint/add`
};

export default endpoints;