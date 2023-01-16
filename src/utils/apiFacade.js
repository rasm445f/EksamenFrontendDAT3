const URL = "http://localhost:8080/EksamenDAT3_war_exploded";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: res.json()})
    }
    return res.json();
}

function apiFacade() {

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    const loggedIn = () => {
        return getToken() != null;
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
    }

    const login = (user, password) => {
        const options = makeOptions("POST", true, {username: user, password: password});
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(res => {
                const token = res.token
                setToken(token)
            })
    }

    const fetchData = () => {
        const options = makeOptions("GET", true);
        return fetch(URL + "/api/user", options).then(handleHttpErrors);
    }

    const getUserRoles = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }
    
    const getUsername = () => {

        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = token.split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            console.log(decodedClaims);
            const username = decodedClaims.username
            return username
        }
        else return ""
    }
    const getUserId = () => {

        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = token.split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const id = decodedClaims.id
            return id
        }
        else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) =>
    {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }

    function makeOptions(method, addToken, body) {
        method = method ? method : 'GET';
        const opts = {
            method: method,
            headers: {
                ...(['PUT', 'POST'].includes(method) && {
                    "Content-type": "application/json"
                }),
                "Accept": "application/json"
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    const createUser = (username,password, []) => {
        const user =  {userName:username,
                      userPass:password,
                      roles:[]}
                      return user
    }

    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        getUserRoles,
        hasUserAccess,
        getUsername,
        getUserId,
        createUser
        
    }
}

const facade = apiFacade();
export default facade;
