import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';

class jwtService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        if ( !access_token )
        {
            return;
        }
        else{
            this.setSession(access_token);
             this.emit('onAutoLogin', true);
        }

        // if ( this.isAuthTokenValid(access_token) )
        // {
        //     this.setSession(access_token);
        //     this.emit('onAutoLogin', true);
        // }
        // else
        // {
        //     this.setSession(null);
        //     this.emit('onAutoLogout', 'access_token expired');
        // }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data)
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/auth', {
                data: {
                    email,
                    password
                }
            }).then(response => {
                if ( response.data.user )
                {
                    this.setSession(response.data.access_token);
                    resolve(response.data.user);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

    signIngIntoEDMWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            axios.get('http://192.168.5.119:8080/loginAuthenticate/authenticateCredentials1', {
                params: {
                    userName: email,
                  password:password
                }
            }).then(response => {
                const error = {
                    email   : 'Check your username/email',
                    password:   'Check your password'
                };
                
                if ( response.data)
                { 
                
               // const user = JSON.parse('{"uuid":"XgbuVEXBU5gtSKdbQRP1Zbbby1i1","from":"custom-db","password":"admin","role":"admin","data":{"displayName":"Abbott Keitch","photoURL":"assets/images/avatars/Abbott.jpg","email":"admin","settings":{"layout":{"style":"layout1","config":{"scroll":"content","navbar":{"display":true,"folded":true,"position":"left"},"toolbar":{"display":true,"style":"fixed","position":"below"},"footer":{"display":true,"style":"fixed","position":"below"},"mode":"fullwidth"}},"customScrollbars":true,"theme":{"main":"defaultDark","navbar":"defaultDark","toolbar":"defaultDark","footer":"defaultDark"}},"shortcuts":["calendar","mail","contacts"]}}');
               const user = JSON.parse('{"uuid":"XgbuVEXBU5gtSKdbQRP1Zbbby1i1","from":"custom-db","password":"admin","role":"admin","data":{"displayName":"Abbott Keitch","photoURL":"assets/images/avatars/Abbott.jpg","email":"admin","settings":{"layout":{"style":"layout1","config":{"scroll":"content","navbar":{"display":true,"folded":true,"position":"left"},"toolbar":{"display":true,"style":"fixed","position":"below"},"footer":{"display":true,"style":"fixed","position":"below"},"mode":"fullwidth"}},"customScrollbars":true},"shortcuts":["calendar","mail","contacts"]}}');
                user.data.displayName='Sumit Sehgal';
                console.log("user.data.displayName" + user.data.displayName);
                    this.setSession('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlhnYnVWRVhCVTVndFNLZGJRUlAxWmJiYnkxaTEiLCJpYXQiOjE2MjA3OTYxMTYsImV4cCI6MTYyMDk2ODkxNn0.jFdYngC8hX9F_pJlWb67IfgO0Pzj6_weBn-XsHnZETg');
                    resolve(user);
                }
                else
                {
                    
                    reject(error);
                }
            });
        });
    };

    parseDataAndGenerateAccessToken = (data) =>{
        
        const user = JSON.parse('{"uuid":"XgbuVEXBU5gtSKdbQRP1Zbbby1i1","from":"custom-db","password":"admin","role":"admin","data":{"displayName":"Abbott Keitch","photoURL":"assets/images/avatars/Abbott.jpg","email":"admin","settings":{"layout":{"style":"layout1","config":{"scroll":"content","navbar":{"display":true,"folded":true,"position":"left"},"toolbar":{"display":true,"style":"fixed","position":"below"},"footer":{"display":true,"style":"fixed","position":"below"},"mode":"fullwidth"}},"customScrollbars":true,"theme":{"main":"defaultDark","navbar":"defaultDark","toolbar":"defaultDark","footer":"defaultDark"}},"shortcuts":["calendar","mail","contacts"]}}');
        const error = {
            email   : user ? null : 'Check your username/email',
            password: user ? null :  'Check your password'
        };
    
        if ( !error.email && !error.password && !error.displayName )
        {
            
    
            const access_token = "828282828";
    
            const response = {
                "user"        : user,
                "access_token": access_token
            };
    
            return [200, response];
        }
        else
        {
            return [200, {error}];
        }
    }

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/auth/access-token', {
                data: {
                    access_token: this.getAccessToken()
                }
            })
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = access_token => {
        if ( access_token )
        {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else
        {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if ( !access_token )
        {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime )
        {
            console.warn('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
