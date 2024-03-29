import axios from 'axios'

const remote_url =
    import.meta.env.VITE_SERVER_URL

const Levels = {
    One: 'ONE',
    Two: 'TWO',
    Three: 'THREE',
    OneIntermidiate: 'ONEintermidiate',
    TwoIntermidiate: 'TWOintermidiate',
    Assessment: beginnerAssessment,
    oneAdvanced:'ONEadvanced',
    threeAdvanced:'THREEadvanced'
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
        error_message: '',
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
        currentAssessment: '',

        user: {
            role: ''
        },

        quest_id: '',
        assessment_id: Number(''),
        hideContent: false,
        show: false,
        showHome: true,
        signIn: {
            username: '',
            password: '',
        },
        advancedData: [],
        computersIntermidiate: [],
        showLand: false,
        classLearners: [],
        schoolName: '',
        computers: [],
        computers3: [],
        quizzes: [],
        availableUsers: [],
        all: '',
        schoolLearners: [],
        showLoginForm: false,



        getAnswer: [],
        correct: [],
        theScore: [],
        theeScore: [],
        myScore: [],
        scoreMessage: '',
        learnerScores: [],

        assess: [],
        userAssess: [],

        totalScore: 0,
        learnerScore: 0,

        init() {

            if (localStorage['user'] !== undefined) {
                this.loggeIn = false
                this.registration = false
                this.showHome = true;
                this.user = JSON.parse(localStorage.getItem('user'))

            } else {

                this.loggeIn = true
                this.registration = false
                this.showHome = false;
            }


            setInterval(() => {
                this.message = ''
                this.error_message = ''
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
                    this.message = "User created"
                    setInterval(() => { }, 6000);
                    return true;
                    this.signUp = ''
                }).catch(e => console.log('User doesnt exists'))

        },

        showContent() {
            this.showLoginForm = !this.showLoginForm
            this.show = false

            this.showLoginForm = true


        },

        showNav() {
            this.showLand = !this.showLand

        },

        showHomeFunc() {

            // this.showLoginForm = true

            this.showHome = !this.showHome

        },

        showForm() {
            this.show = !true
        },
        hideLogin(){
            this.showLoginForm = false
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
                    if (user !== user) {
                        this.error_message = "The user doesn't exist"
                    }

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

                    console.log(results.data.course);
                    setInterval(() => { }, 4000);
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

                    setInterval(() => { }, 4000);

                    return true;
                }).catch(e => console.log(e))
        },

        advancedLevelOne() {
            axios
                .get(`${remote_url}/api/advanced_level1`)
                .then(results => {
                    this.advancedData = results.data.advancedOne;
                   
                    setInterval(() => { }, 4000);

                    return true;
                }).catch(e => console.log(e))
        },


        advancedLevelThree() {
            axios
                .get(`${remote_url}/api/advanced_level3`)
                .then(results => {
                    this.advancedData = results.data.advancedThree;
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

        // async userAssessment() {

        //    try {
        //         const results = await axios
        //             .post(`${remote_url}/api/userAssessment/`, {
        //                 learner_id: this.user.id,
        //                 assessment_id: this.quest_id
        //             })
        //         this.assess = results.data.userAssessmentId
        //         console.log(results.data)
        //         axios
        //             .get(`${remote_url}/api/courses_beginner/${this.quest_id}`)
        //             .then(results_1 => {
        //                 this.quizzes = results_1.data.questions
        //                 console.log(this.quizzes)
        //                 setInterval(() => { }, 4000)
        //                 return true
        //             }).catch(e => console.log(e))
        //         return true
        //     } catch (e_1) {
        //         return console.log(e_1)
        //     }

        // },

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

        calculateScore(quesion_id) {


            axios
                .post(`${remote_url}/api/countScore/${quesion_id}`)
                .then(results => {
                    var {
                        scoresById,
                        scoresByCorrect
                    } = results.data;


                    if (!scoresById) {
                        return false
                    }

                    localStorage.setItem('scoresByCorrect', JSON.stringify(scoresByCorrect));
                    this.scoresById = JSON.stringify(scoresById)
                    localStorage.setItem('scoresById', this.scoresById);
                    this.scoresByCorrect = scoresByCorrect

                    console.log(scoresByCorrect);
                    //    this.correctAnswers= localStorage.getItem(scoresByCorrect)
                    //    console.log(this.correctAnswers);

                    this.theeScore = results.data.scoresById.count;
                    this.theScore = results.data.scoresByCorrect.count;
                    console.log(this.theeScore);
                    console.log(this.theScore);

                    this.learnerScore = (Number(this.theScore) / Number(this.theeScore) * 100).toFixed(2);
                    console.log(this.learnerScore);

                    if (this.learnerScore >= 50) {
                        this.totalScore = 'Your is score' + ' ' + this.learnerScore + '%' + ' ' + 'and you passed';
                        console.log(this.totalScore);

                        return Number(this.totalScore);
                    }
                    else if (this.learnerScore < 50) {
                        this.totalScore = 'Your is score' + ' ' + this.learnerScore + '%' + ' ' + 'and please try again';
                        console.log(this.totalScore);
                        return Number(this.totalScore);
                    }

                    console.log(this.totalScore);
                    return this.learnerScore;

                })

        },

        addAnswers(answer_id) {

            console.log(this.quest_id, "00000")
            axios
                .post(`${remote_url}/api/addUserAnswers/`, {
                    learner_id: this.user.id,
                    answer_id
                    // user_assessment_id: this.quest_id

                })
                .then(results => {
                    this.message = 'Answer selected';
                    setInterval(() => { }, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        viewLearners (id){

            axios
            .get(`${remote_url}/api/viewLearnerDetails/${id}`)
            .then(results => {
                this.learnerScores = results.data.viewDetails;

                console.log(results.data.viewDetails);
            })
        },

        // calculateScore() {

        //     axios
        //         .post(`${remote_url}/api/scoreCount`,{
        //             assessment_id: this.quest_id,
        //             learner_id: this.user.id,
        //             question_id: this.quest_id
        //         })
        //         .then(results => {
        //             this.theeScore = results.data.questCounter;
        //             this.theScore = results.data.userAssessCount;
        //             this.myScore = results.data.theAssessSCore;

        //             console.log(results.data.theAssessSCore);

        //             // if (this.myScore.score < 50) {
        //             //      this.totalScore = "You got " + this.myScore.score + "OOPS! Please try again";
        //             //      return this.totalScore;
        //             // }
        //             // else if(this.myScore.score >= 50){
        //             //      this.totalScore = "You got " + this.myScore.score + "CONGRATULATIONS! you passed the beginner course";
        //             //      return this.totalScore;
        //             // }

        //             setInterval(() => { }, 4000);
        //             return true;
        //         }).catch(e => console.log(e))
        // },

        logoutFunc() {
            localStorage.clear()
            this.loggeIn = true
            this.registration = false
            this.showHome = false;
            this.user.role = false
        },

    }

}