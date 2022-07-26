import axios from 'axios'
const Levels = {
    One: 'ONE',
    Two: 'TWO',
    Three: 'THREE',
    beginnerAssessment: 'beginnerAss'
}

const Assessments = {

    intermidiateAssessment: 'intermidiateAss',
    advancedAssessment: 'advancedAss'

}

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
            role: '',
            school: ''
        },
        schoolName: '',
        learnersForClass: '',
        currentLevel: '',
        currentAssement: '',

        user: {
            role: ''
        },

        show: false,
        showHome: false,
        signIn: {
            username: '',
            password: '',
        },
        computersIntermidiate: [],
        classLearners: [],
        schoolName: '',
        computers: [],
        computers3: [],
        quizes: [],
        availableUsers: [],
        all: '',

        init() {
            // this.classLearner()
            this.intermidiate()

            this.currentLevel = Levels.One
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
        regUser() {
            axios
                .post('http://localhost:4003/api/signUp', this.signUp)
                .then(results => {
                    // console.log(results.data);
                    this.message = "User created"
                    setInterval(() => {
                    }, 6000);
                    return true;
                    this.signUp = ''
                }).catch(e => console.log('User doesnt exists'))

        },
        showContent() {
            this.show = !this.show
            alert(this.show)
        },
        showForm() {
            this.show = !true
        },
        logUser() {
            axios
                .post('http://localhost:4003/api/logIn', this.signIn)

                .then((qApp) => {
                    var { token, user } = qApp.data;
                    // console.log(qApp.data);
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
                    this.school = ''
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
                    // console.log(results.data.course);
                    setInterval(() => {
                    }, 4000);
                    return true;
                }).catch(e => console.log(e))
        },
        intermidiate() {
            axios
                .get('http://localhost:4003/api/intermidiate_level1')
                .then(results => {
                    this.computersIntermidiate = results.data.interOne;
                    console.log(results.data);

            return true;
        }).catch(e => console.log(e))
    },
    intermidiateTwo() {
        axios
            .get('http://localhost:4003/api/intermidiate_level2')
            .then(results => {
                this.computersIntermidiate = results.data.interTwo;
                

        return true;
    }).catch(e => console.log(e))
},



        beginner3() {
        axios
            .get('http://localhost:4003/api/beginner_level3')
            .then(results => {
                this.computers3 = results.data.course3;
                // console.log(results.data);
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
    },

}


}