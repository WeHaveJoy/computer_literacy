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

        aswers: {
            answers_id: '',
            learner_id: ''
        },

        loggeIn: true,
        registration: false,

        signUp: {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            role: '',
            school: ''
        },

        currentLevel: '',
        currentAssement: '',

        user: {
            role: ''
        },

        quest_id: '',

        show: false,
        showHome: false,
        signIn: {
            username: '',
            password: '',
        },

        classLearners: [],
        schoolName: '',
        computers: [],
        computers3: [],
        quizzes: [],
        availableUsers: [],
        all: '',
        schoolLearners: [],

        getAnswer: [],
        correct: [],

        init() {

            // if (localStorage !== undefined) {
            //     this.user.role = "teacher"
            //     this.loggeIn = false
            //     this.registration = false
            //     this.showHome = true;
            // }
            // else
            //     if(localStorage !== undefined) {
            //     this.user.role = "parent"
            //     this.loggeIn = false
            //     this.registration = false
            //     this.showHome = false;
            // }
            // else
            // //    (localStorage !== undefined) 
            //   { this.user.role = "learner"
            //     this.loggeIn = false
            //     this.registration = false
            //     this.showHome = false;
            // }
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

        logoutFunc() {
            localStorage.clear()
            this.loggeIn = true
            this.registration = false
            this.showHome = false;
            this.user.role = false
        },

        regUser() {
            axios
                .post('http://localhost:4003/api/signUp', this.signUp)
                .then(results => {
                    // console.log(results.data);
                    this.message = "User created"
                    setInterval(() => {}, 6000);
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

        logUser() {
            axios
                .post('http://localhost:4003/api/logIn', this.signIn)

                .then((qApp) => {
                    var {
                        token,
                        user
                    } = qApp.data;

                    if (!token) {
                        return false
                    }

                    localStorage.setItem('user', JSON.stringify(user));
                    this.token = JSON.stringify(token)
                    localStorage.setItem('token', this.token);
                    this.user = user
                    this.loggeIn = false
                    this.registration = false
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
                    // console.log(results.data);
                    setInterval(() => {}, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        beginner3() {
            axios
                .get('http://localhost:4003/api/beginner_level3')
                .then(results => {
                    this.computers3 = results.data.course3;
                    // console.log(results.data);
                    setInterval(() => {}, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        assessment() {
            const self = this;
            console.log(this.quest_id);
            this.quizzes = []
            // for (let index = 1; index <= 15; index++) {
            if (this.quest_id != null) {
                this.quest_id++;
            } else {
                this.error = 'End of questionaire'
            }
            axios
                .get(`http://localhost:4003/api/courses_beginner/${this.quest_id}`)
                .then(results => {
                    this.quizes = results.data.questions;
                    console.log(this.quizes);
                    setInterval(() => {}, 4000);
                    return true;
                }).catch(e => console.log(e))
            // }

        },

        getLearners(userSchoolName) {

            axios
                .get(`http://localhost:4003/api/getLearnersBySchoolName/${userSchoolName}`)
                .then(results => {
                    this.schoolLearners = results.data.learners;
                    console.log(results.data);
                    setInterval(() => {}, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        addAnswers(answer_id) {

            axios
                .post(`http://localhost:4003/api/addUserAnswers/`, {
                    learner_id: this.user.id,
                    answer_id
                })
                .then(results => {
                    this.message = 'Answer selected';
                    return true;
                }).catch(e => console.log(e))

        },

        getAnswers() {

            axios
                .get(`http://localhost:4003/api/getAnswers/`)
                .then(results => {
                    this.getAnswer = results.data.theAnswers;
                    console.log(results.data);
                    setInterval(() => {}, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        getCorrectAns() {

            axios
                .get(`http://localhost:4003/api/getCorrectAnswers/`)
                .then(results => {
                    this.correct = results.data.getCorrectA;
                    console.log(this.correct);
                }).catch(e => console.log(e))
        }

    }
}