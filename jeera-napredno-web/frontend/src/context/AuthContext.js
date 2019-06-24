import React from "react";

export default React.createContext({
    loggedIn: false,
    token: "",
    authenticate: (loggedIn, token) => {}
});

