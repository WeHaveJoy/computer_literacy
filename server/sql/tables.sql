    create table users(
        id serial not null primary key,
        first_name text NOT NULL,
        last_name text NOT NULL,
        username text NOT NULL,
        password varchar NOT NULL,
        role text NOT NULL
    );

    create table courses_beginners(
        id serial not null primary key,
        description text NOT NULL,
        img text NOT NULL,
        level int NOT NULL
    );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

    create table courses_intermediate(
        id serial not null primary key,
        description text NOT NULL,
        img text NOT NULL,
        level int NOT NULL
    );


    create table courses_advanced(
        id serial not null primary key,
        description text NOT NULL,
        img text NOT NULL,
        level int NOT NULL
    );

    create table assessment(
        id serial not null primary key,
        description text NOT NULL,
        course_id int ,
        FOREIGN KEY (course_id) REFERENCES courses_beginners(id),
        FOREIGN KEY (course_id) REFERENCES courses_intermediate(id),
        FOREIGN KEY (course_id) REFERENCES courses_advanced(id)
    );

    create table questions(
        id serial not null primary key,
        question text NOT NULL,
        assessment_id int ,
        FOREIGN KEY (assessment_id) REFERENCES assessment(id)
    );

    create table answers(
        id serial not null primary key,
        answer text NOT NULL,
        correct boolean NOT NULL,
        question_id int,
        FOREIGN KEY (question_id) REFERENCES questions(id)
    );

    create table user_answers(
        id serial not null primary key,
        answer_id int,
        FOREIGN KEY (answer_id) REFERENCES answers(id),
        learner_id int,
        FOREIGN KEY (learner_id) REFERENCES users(id)
    );

--Inner join



SELECT course_id FROM assessment INNER JOIN courses_beginners ON assessment.course_id = courses_beginners.id;
SELECT course_id FROM assessment INNER JOIN courses_intermediate ON assessment.course_id = courses_intermediate.id;
SELECT course_id FROM assessment INNER JOIN courses_advanced ON assessment.course_id = courses_advanced.id;

SELECT assessment_id FROM questions INNER JOIN assessment ON questions.assessment_id = assessment.id;

SELECT question_id FROM answers INNER JOIN questions ON answers.question_id = questions.id;

SELECT answer_id FROM user_answers INNER JOIN answers ON user_answers.answer_id = answers.id;
SELECT learner_id FROM user_answers INNER JOIN users ON user_answers.learner_id = users.id;



CREATE TABLE questions (
    id int(10) auto_increment primary key,
    question varchar(800) NOT NULL,
    right_option int(10) NOT NULL references options(id)

);

CREATE TABLE options (
    id int(10) auto_increment primary key,
    question_id int(10) NOT NULL references questions(id),
    assessment_id int NOT NULL references assessment(id),
    `option` varchar(150) NOT NULL
);

CREATE TABLE exam_details (
    id int(10) auto_increment primary key,
    user_id int(10) NOT NULL references users(id),
    assessment_id int NOT NULL references assessment(id),
    date_of_exam date not null
);     

CREATE TABLE user_answers (
    id int(10) auto_increment primary key,
    user_id int(10) NOT NULL references users(id),
    question_id int(10) NOT NULL references questions(id),
    answer int(10) NOT NULL references options(id)
);