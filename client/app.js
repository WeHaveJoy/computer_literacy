import axios from 'axios'
export default function computer_literacy() {

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

        level:{
            level1: '',
            level2: '',
            level3: ''
        },

        user: {
            role: ''
        },

        show: false,
        showHome: false,
        signIn: {
            username: '',
            password: '',
        },

        computers: [],
        computers3: [],
        quizes: [],
        availableUsers: [],
        all: '',

        init() {
            setInterval(() => {
                this.message = ''
                this.error = ''
                this.logIn_message = ''
            }, 5000);
        },

        goToLogin() {
            setInterval(() => {
                this.showForm()
            }, 3000);
        },

        // goTolevel3() {
        //     setInterval(() => {
        //         this.showL3()
        //     }, 3000);
        // },

        regUser() {
            axios
                .post('http://localhost:4003/api/signUp', this.signUp)

                .then(results => {
                    console.log(results.data);

                    this.message = "User created"
                    setInterval(() => {
                    }, 6000);
                    return true;
                    this.signUp = ''
                }).catch(e => console.log('User doesnt exists'))

        },
        showContent() {
            this.show = !this.show
        },
        showForm() {
            this.show = !true
        },

        // showL3(){
        //     this.show = !true
        // },


        logUser() {
            axios
                .post('http://localhost:4003/api/logIn', this.signIn)

                .then((qApp) => {
                    var { token, user } = qApp.data;
                    console.log(qApp.data);
                    if (!token) {
                        return false
                    }

                    localStorage.setItem('user', JSON.stringify(user));
                    this.token = JSON.stringify(token)
                    localStorage.setItem('token', this.token);
                    this.user = user
                    this.showHome = true;
                    this.logIn_message = "You are logged in"
                    this.error = "The user doesn't exist"
                    setTimeout(() => {
                        this.token = ''
                    }, 6000);
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

        beginner() {
            axios
                .get('http://localhost:4003/api/beginner_level1')
                .then(results => {
                    this.computers = results.data.course;
                    console.log(results.data);
                    setInterval(() => {
                    }, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        beginner3() {
            axios
                .get('http://localhost:4003/api/beginner_level3')
                .then(results => {
                    this.computers3 = results.data.course3;
                    console.log(results.data);
                    setInterval(() => {
                    }, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        assessment() {
            axios
                .get(`http://localhost:4003/api/courses_beginner/1`)
                .then(results => {
                    this.quizes = results.data.questions;
                    console.log(this.quizes);
                    setInterval(() => {
                    }, 4000);
                    return true;
                }).catch(e => console.log(e))
        }
        
    }
}