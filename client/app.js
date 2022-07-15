import axios from 'axios'
export default function computer_literacy(){

    return {
        info: [],

        logIn_message: '',
        message: '',
        error: '',
        extra_mural: '',

        signUp: {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            role: ''
        },

        user: {
            role: ''
        },

        signIn: {
            username: '',
            password: '',
        },

        
        computers:[],

        init() {
            setInterval(() => {
                this.message = ''
                this.error = ''
                this.logIn_message = ''
            }, 5000);
        },

        regUser() {
            axios
                .post('http://localhost:4003/api/signUp', this.signUp)

                .then(results => {
                    console.log(results.data);
                    this.message = "User created"
                    this.error = "User already exists"
                    setInterval(() => {
                    }, 5000);
                    return true;
                    this.signUp = ''
                }).catch(e => console.log(e))
        },

        logUser() {
            axios
                .post('http://localhost:4003/api/logIn', this.signIn)

                .then((qApp) => {
                    var { token, user } = qApp.data;
                    console.log(qApp.data);
                    if (!token) {
                        return false
                    }

                    this.user = user;
                    localStorage.setItem('user', JSON.stringify(user));
                    this.token = JSON.stringify(token)
                    localStorage.setItem('token', this.token);
                    this.logIn_message = "You are logged in"
                    this.show_movies = true;
                    this.error = "The user doesn't exist"
                    setTimeout(() => {
                        this.token = ''
                    }, 5000);
                    return true;
                })
                .then(result => {
                    this.first_name = ''
                        this.last_name = ''
                        this.username = ''
                        this.password = ''
                        this.role = ''
                    if (!result) {
                        this.message = 'Incorrect user credentials'
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        beginner(){
            axios
            .get('http://localhost:4003/api/beginner_level1')
            .then(results => {
                this.computers = results.data.results;
                console.log(results.data);
                setInterval(() => {
                }, 4000);
                return true;
            }).catch(e => console.log(e))
        }

    }
}