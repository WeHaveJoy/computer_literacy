import axios from 'axios'

const remote_url = import.meta.env.VITE_SERVER_URL

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

        schoolName: '',
        learnersForClass: '',

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

        computersIntermidiate: [],

        classLearners: [],
        schoolName: '',
        computers: [],
        computers3: [],
        quizzes: [],
        availableUsers: [],
        all: '',
        schoolLearners: [],
        init() {
            // this.classLearner()
            this.intermidiate()
        },
        getAnswer: [],
        correct: [],
        theScore: [],
        theeScore: [],
        scoreMessage: '',

        totalScore : 0,
        learnerScore : 0,

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
                .post(`${remote_url}/api/signUp`, this.signUp)
                .then(results => {
                    // console.log(results.data);
                    this.message = "User created"
                    setInterval(() => { }, 6000);
                    return true;
                    this.signUp = ''
                }).catch(e => console.log('User doesnt exists'))

        },

        showContent() {
            this.show = !this.show
            // alert(this.show)
        },

        showForm() {
            this.show = !true
        },

        logUser() {
            axios
                .post(`${remote_url}/api/logIn`, this.signIn)

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
                .get(`${remote_url}/api/beginner_level1`)
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
                .get(`${remote_url}/api/intermidiate_level1`)
                .then(results => {
                    this.computersIntermidiate = results.data.interOne;
                    console.log(results.data);

                    return true;
                }).catch(e => console.log(e))
        },

        intermidiateTwo() {
            axios
                .get(`${remote_url}/api/intermidiate_level2`)
                .then(results => {
                    this.computersIntermidiate = results.data.interTwo;


                    return true;
                }).catch(e => console.log(e))
        },

        beginner3() {
            axios
                .get(`${remote_url}/api/beginner_level3`)
                .then(results => {
                    this.computers3 = results.data.course3;
                    // console.log(results.data);
                    setInterval(() => { }, 4000);
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
                .get(`${remote_url}/api/courses_beginner/${this.quest_id}`)
                .then(results => {
                    this.quizzes = results.data.questions;
                    console.log(this.quizzes);
                    setInterval(() => { }, 4000);
                    return true;
                }).catch(e => console.log(e))
            // }

        },

        getLearners(userSchoolName) {

            axios
                .get(`${remote_url}/api/getLearnersBySchoolName/${userSchoolName}`)
                .then(results => {
                    this.schoolLearners = results.data.learners;
                    console.log(results.data);
                    setInterval(() => { }, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        addAnswers(answer_id) {

            axios
                .post(`${remote_url}/api/addUserAnswers/`, {
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
                .get(`${remote_url}/api/getAnswers/`)
                .then(results => {
                    this.getAnswer = results.data.theAnswers;
                    console.log(results.data);
                    setInterval(() => { }, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        getCorrectAns() {

            axios
                .get(`${remote_url}/api/getCorrectAnswers/`)
                .then(results => {
                    this.correct = results.data.getCorrectA;
                    console.log(this.correct)
                }).catch(e => console.log(e))
        },

        caltulateScore(quesion_id) {

            axios
                .post(`${remote_url}/api/countScore/${quesion_id}`)
                .then(results => {
                    this.theeScore = results.data.scoresById.count;
                    this.theScore = results.data.scoresByCorrect.count;
                    console.log(this.theeScore);
                    console.log(this.theScore);
                  

                    this.learnerScore = 'You got: ' + Number(this.theScore) / Number(this.theeScore) * 100 + '%';
                    console.log(this.learnerScore);

                    if (this.theScore >= 10.5) {
                        this.totalScore = 'Here is your  score' + ' ' + (15 / 100) * 75 + '%' + ' ' + 'and you passed';
                        console.log(this.totalScore);

                        return this.totalScore.toFixed(2);
                    }
                    else if (this.theScore < 10.5) {
                        this.totalScore = 'Here is your score' + ' ' + (15 / 100) * 75 + '%' + ' ' + 'and you failed';
                        console.log(this.totalScore);
                        return this.totalScore;
                    }

                    console.log(this.totalScore);

                    return this.learnerScore.toFixed(2);

                }

                )
        },

        logoutFunc() {
            localStorage.clear()
            this.loggeIn = true
            this.registration = false
            this.showHome = false;
            this.user.role = false
        }

    }

}