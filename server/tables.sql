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
    level int,
    challenge_score int
);

create table courses_intermediate(
    id serial not null primary key,
    level int,
    challenge_score int
);


create table courses_advanced(
    id serial not null primary key,
     level int,
    challenge_score int
);

create table assessment(
     id serial not null primary key,
     description text,
     course_id int,
      FOREIGN KEY (course_id) REFERENCES courses_beginners(id),
      FOREIGN KEY (course_id) REFERENCES courses_intermediate(id),
      FOREIGN KEY (course_id) REFERENCES courses_advanced(id)
);

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
