CREATE DATABASE to_do_list;
USE to_do_list;

CREATE TABLE Tasks(id INT AUTO_INCREMENT PRIMARY KEY, Task VARCHAR(500), Status VARCHAR(500), Completion_Date DATE);

CREATE TABLE Login_Info(Username varchar(500), Password varchar(500));

INSERT INTO Tasks (Task, Status, Completion_Date, Username) VALUES ('Homework', 'Not Started', '2025-07-23', 'User1');
INSERT INTO Tasks (Task, Status, Completion_Date, Username) VALUES ('Clean room', 'In Progress', '2025-07-22', 'User2');
INSERT INTO Tasks (Task, Status, Completion_Date, Username) VALUES ('Make Bed', 'Completed', '2025-07-22', 'User3');

INSERT INTO Login_Info VALUES ('User1', 'Pass1');
INSERT INTO Login_Info VALUES ('User2', 'Pass2');
INSERT INTO Login_Info VALUES ('User3', 'Pass3');

SELECT * FROM Tasks;
SELECT * FROM Login_Info;

DESC Tasks;    
DESC Login_Info;

DELETE FROM Tasks; 
DELETE FROM Login_Info;

