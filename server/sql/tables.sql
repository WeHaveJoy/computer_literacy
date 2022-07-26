create table users(
    id serial not null primary key,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text NOT NULL,
    password varchar NOT NULL,
    role text NOT NULL,
    school text NOT NULL
);

create table school(
    id serial not null primary key,
    school_name text not null,
    role_id int,
    FOREIGN KEY (role_id) REFERENCES users(id),
    school text
);

create table courses_beginners(
    id serial not null primary key,
    name text,
    description text NOT NULL,
    img text NOT NULL,
    level int NOT NULL
);

create table courses_intermediate(
    id serial not null primary key,
    name text,
    description text NOT NULL,
    img text NOT NULL,
    level int NOT NULL
);

create table courses_advanced(
    id serial not null primary key,
    name text,
    description text NOT NULL,
    img text NOT NULL,
    level int NOT NULL
);

create table feedback(
    id serial not null primary key,
    comment text NOT NULL
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
    course_name text,
    FOREIGN KEY (course_name) REFERENCES courses_beginners(name),
    FOREIGN KEY (course_name) REFERENCES courses_intermediate(name),
    FOREIGN KEY (course_name) REFERENCES courses_advanced(name)
);

create table questions(
    id serial not null primary key,
    question text NOT NULL,
    assessment_id int,
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
SELECT
    course_id
FROM
    assessment
    INNER JOIN courses_beginners ON assessment.course_id = courses_beginners.id;

SELECT
    course_id
FROM
    assessment
    INNER JOIN courses_intermediate ON assessment.course_id = courses_intermediate.id;

SELECT
    course_id
FROM
    assessment
    INNER JOIN courses_advanced ON assessment.course_id = courses_advanced.id;

SELECT
    assessment_id
FROM
    questions
    INNER JOIN assessment ON questions.assessment_id = assessment.id;

SELECT
    question_id
FROM
    answers
    INNER JOIN questions ON answers.question_id = questions.id;

SELECT
    answer_id
FROM
    user_answers
    INNER JOIN answers ON user_answers.answer_id = answers.id;

SELECT
    learner_id
FROM
    user_answers
    INNER JOIN users ON user_answers.learner_id = users.id;

update
    answers
set
    question_id = 1
where
    id < 220;

update
    answers
set
    question_id = 2
where
    id > 219
    AND id < 224;

update
    answers
set
    question_id = 3
where
    id > 223
    AND id < 227;

update
    answers
set
    question_id = 4
where
    id > 226
    AND id < 230;

update
    answers
set
    question_id = 5
where
    id > 229
    AND id < 235;

update
    answers
set
    question_id = 6
where
    id > 234
    AND id < 239;

update
    answers
set
    question_id = 7
where
    id > 238
    AND id < 241;

update
    answers
set
    question_id = 8
where
    id > 240
    AND id < 245;

update
    answers
set
    question_id = 9
where
    id > 244
    AND id < 249;

update
    answers
set
    question_id = 10
where
    id > 248
    AND id < 252;

update
    answers
set
    question_id = 11
where
    id > 251
    AND id < 2256;

update
    answers
set
    question_id = 12
where
    id > 255
    AND id < 260;

update
    answers
set
    question_id = 13
where
    id > 259AND id < 262;

update
    answers
set
    question_id = 14
where
    id > 261
    AND id < 266;

update
    answers
set
    question_id = 15
where
    id > 265;