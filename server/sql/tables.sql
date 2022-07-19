create table users(
	id serial not null primary key,
    first_name text,
    last_name text,
	username text,
	password varchar,
    role text
);

create table courses_beginners(
    id serial not null primary key,
    description text,
    img text,
    level int
);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

create table courses_intermediate(
    id serial not null primary key,
    description text,
    img text,
    level int
);


create table courses_advanced(
    id serial not null primary key,
    description text,
    img text,
    level int
);

create table assessment(
     id serial not null primary key,
     description text,
     course_id int,
      FOREIGN KEY (course_id) REFERENCES courses_beginners(id),
      FOREIGN KEY (course_id) REFERENCES courses_intermediate(id),
      FOREIGN KEY (course_id) REFERENCES courses_advanced(id)
);

SELECT course_id FROM assessment INNER JOIN courses_beginners ON assessment.course_id = courses_beginners.id;
SELECT course_id FROM assessment INNER JOIN courses_intermediate ON assessment.course_id = courses_intermediate.id;
SELECT course_id FROM assessment INNER JOIN courses_advanced ON assessment.course_id = courses_advanced.id;

SELECT assessment_id FROM questions INNER JOIN assessment ON questions.assessment_id = assessment.id;

SELECT question_id FROM answers INNER JOIN questions ON answers.question_id = questions.id;

SELECT answer_id FROM user_answers INNER JOIN answers ON user_answers.answer_id = answers.id;
SELECT learner_id FROM user_answers INNER JOIN users ON user_answers.learner_id = users.id;

create table questions(
     id serial not null primary key,
     question text,
     assessment_id int,
     FOREIGN KEY (assessment_id) REFERENCES assessment(id)
);

create table answers(
     id serial not null primary key,
     answer text,
     correct boolean,
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

--  SELECT user_id FROM user_playlist INNER JOIN user_info ON user_playlist.user_id = user_info.id;
--  SELECT * FROM user_playlist INNER JOIN user_info ON user_playlist.user_id = user_info.id;  