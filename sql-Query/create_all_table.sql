-- Bảng ADMIN
CREATE TABLE Admin (
    ID CHAR(9) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    Password NVARCHAR(50) NOT NULL,
    Email NVARCHAR(50),
    Role NVARCHAR(20),
    Hotline NVARCHAR(15),
    Name NVARCHAR(50)
);

-- Bảng NGƯỜI DÙNG
CREATE TABLE Users (
    User_ID CHAR(9) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    Password NVARCHAR(50) NOT NULL,
    Avatar NVARCHAR(255),
    Gender NVARCHAR(10),
    Phone NVARCHAR(15),
    Birthdate DATE,
    Address NVARCHAR(255),
    Lastname NVARCHAR(50),
    Middlename NVARCHAR(50),
    Firstname NVARCHAR(50)
);

-- Bảng NHÀ TUYỂN DỤNG
CREATE TABLE Scout (
    Scout_ID CHAR(9) PRIMARY KEY,
    Company NVARCHAR(50),
    Company_Logo NVARCHAR(255),
    FOREIGN KEY (Scout_ID) REFERENCES Users (User_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng ỨNG VIÊN
CREATE TABLE Candidate (
    Candidate_ID CHAR(9) PRIMARY KEY,
    Email NVARCHAR(50),
    FOREIGN KEY (Candidate_ID) REFERENCES Users (User_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng CẨM NANG NGHỀ NGHIỆP
CREATE TABLE Career_Guide (
    Guide_ID CHAR(9) PRIMARY KEY,
    Guide_Content TEXT,
    Topic NVARCHAR(50),
    Guide_Title NVARCHAR(50),
    Admin_ID CHAR(9),
    FOREIGN KEY (Admin_ID) REFERENCES Admin (ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Bảng CÔNG VIỆC
CREATE TABLE Job (
    Job_ID CHAR(3) PRIMARY KEY,
    Job_Title NVARCHAR(50) NOT NULL
);

-- Bảng NGÀNH NGHỀ
CREATE TABLE Job_Field (
    Job_Field_ID CHAR(3) PRIMARY KEY,
    Job_Field_Name NVARCHAR(50) NOT NULL
);

-- Bảng THUỘC (Quan hệ CÔNG VIỆC thuộc NGÀNH NGHỀ)
CREATE TABLE Belong_To (
    Job_ID CHAR(3) NOT NULL,
    Job_Field_ID CHAR(3) NOT NULL,
    PRIMARY KEY (Job_ID, Job_Field_ID),
    FOREIGN KEY (Job_ID) REFERENCES Job (Job_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Job_Field_ID) REFERENCES Job_Field (Job_Field_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng TIN TUYỂN DỤNG
CREATE TABLE Recruitment_News (
    News_ID CHAR(9) NOT NULL,
    Scout_ID CHAR(9) NOT NULL,
    Salary DECIMAL(15,2),
    Location NVARCHAR(50),
    Deadline DATE,
    Post_Date DATE,
    Benefits TEXT,
    Job_Position NVARCHAR(50),
    Job_Description TEXT,
    Required_Number INT,
    Job_ID CHAR(3),
    PRIMARY KEY (News_ID, Scout_ID),
    FOREIGN KEY (Scout_ID) REFERENCES Scout (Scout_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Job_ID) REFERENCES Job (Job_ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Bảng YÊU CẦU CÔNG VIỆC
CREATE TABLE Job_Requirement (
    News_ID CHAR(9) NOT NULL,
    Scout_ID CHAR(9) NOT NULL,
    Requirement_ID CHAR(3) NOT NULL,
    Minimum_Education NVARCHAR(50),
    Minimum_Experience INT,
    Minimum_Age INT,
    PRIMARY KEY (News_ID, Scout_ID, Requirement_ID),
    FOREIGN KEY (News_ID, Scout_ID) REFERENCES Recruitment_News (News_ID, Scout_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng CHỨNG CHỈ CẦN THIẾT
CREATE TABLE Certificate_Require (
    News_ID CHAR(9) NOT NULL,
    Scout_ID CHAR(9) NOT NULL,
    Requirement_ID CHAR(3) NOT NULL,
    CerF_ID CHAR(3) NOT NULL,
    PRIMARY KEY (News_ID, Scout_ID, Requirement_ID, CerF_ID),
    FOREIGN KEY (News_ID, Scout_ID, Requirement_ID) REFERENCES Job_Requirement (News_ID, Scout_ID, Requirement_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng CV
CREATE TABLE CV (
    Candidate_ID CHAR(9) NOT NULL,
    CV_ID CHAR(3) NOT NULL,
    Creation_Date DATE,
    CV_File NVARCHAR(255),
    PRIMARY KEY (Candidate_ID, CV_ID),
    FOREIGN KEY (Candidate_ID) REFERENCES Candidate (Candidate_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng HỒ SƠ CÁ NHÂN
CREATE TABLE Candidate_Profile (
    Candidate_ID CHAR(9) NOT NULL,
    Profile_ID CHAR(3) NOT NULL,
    Self_Description TEXT,
    PRIMARY KEY (Candidate_ID, Profile_ID),
    FOREIGN KEY (Candidate_ID) REFERENCES Candidate (Candidate_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng THEO DÕI
CREATE TABLE Follow (
    Candidate_ID CHAR(9) NOT NULL,
    Scout_ID CHAR(9) NOT NULL,
    PRIMARY KEY (Scout_ID, Candidate_ID),
    FOREIGN KEY (Candidate_ID) REFERENCES Candidate (Candidate_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Scout_ID) REFERENCES Scout (Scout_ID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Bảng TRÌNH ĐỘ HỌC VẤN
CREATE TABLE Academic_Level (
    Candidate_ID CHAR(9) NOT NULL,
    Profile_ID CHAR(3) NOT NULL,
    Academic_ID CHAR(3) NOT NULL,
    School NVARCHAR(42) NOT NULL,
    Major NVARCHAR(42) NOT NULL,
    GPA DECIMAL(4,2) DEFAULT 0,
    GPA_Type NVARCHAR(10) DEFAULT '4-point' CHECK (GPA_Type IN (N'4-point', N'10-point')),
    Start_Date DATE NOT NULL,
    End_Date DATE,
    PRIMARY KEY (Candidate_ID, Profile_ID, Academic_ID),
    FOREIGN KEY (Candidate_ID, Profile_ID) REFERENCES Candidate_Profile (Candidate_ID, Profile_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng KINH NGHIỆM
CREATE TABLE Experience (
    Candidate_ID CHAR(9) NOT NULL,
    Profile_ID CHAR(3) NOT NULL,
    Experience_ID CHAR(3) NOT NULL,
    Company NVARCHAR(42) NOT NULL,
    Position NVARCHAR(42) NOT NULL,
    Start_Date DATE NOT NULL,
    End_Date DATE NOT NULL,
    PRIMARY KEY (Candidate_ID, Profile_ID, Experience_ID),
    FOREIGN KEY (Candidate_ID, Profile_ID) REFERENCES Candidate_Profile (Candidate_ID, Profile_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng CHỨNG CHỈ
CREATE TABLE Certificate (
    Candidate_ID CHAR(9) NOT NULL,
    Profile_ID CHAR(3) NOT NULL,
    Certificate_ID CHAR(3) NOT NULL,
    PRIMARY KEY (Candidate_ID, Profile_ID, Certificate_ID),
    FOREIGN KEY (Candidate_ID, Profile_ID) REFERENCES Candidate_Profile (Candidate_ID, Profile_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng DỰ ÁN
CREATE TABLE Project (
    Candidate_ID CHAR(9) NOT NULL,
    Profile_ID CHAR(3) NOT NULL,
    Project_ID CHAR(3) NOT NULL,
    PRIMARY KEY (Candidate_ID, Profile_ID, Project_ID),
    FOREIGN KEY (Candidate_ID, Profile_ID) REFERENCES Candidate_Profile (Candidate_ID, Profile_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng BÀI KIỂM TRA
CREATE TABLE Test (
    Test_ID CHAR(3) PRIMARY KEY,
    Test_Name NVARCHAR(50) NOT NULL,
    Duration INT NOT NULL,
    Admin_ID CHAR(9),
    Job_ID CHAR(3),
    FOREIGN KEY (Admin_ID) REFERENCES Admin (ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (Job_ID) REFERENCES Job (Job_ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Bảng CÂU HỎI
CREATE TABLE Question (
    Test_ID CHAR(3) NOT NULL,
    Question_ID CHAR(3) NOT NULL,
    Question_Content TEXT NOT NULL,
    Answer NVARCHAR(255),
    PRIMARY KEY (Test_ID, Question_ID),
    FOREIGN KEY (Test_ID) REFERENCES Test (Test_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng LÀM BÀI KIỂM TRA
CREATE TABLE Take_Test (
    Candidate_ID CHAR(9) NOT NULL,
    Test_ID CHAR(3) NOT NULL,
    Nums_Of_Correct_Answers INT DEFAULT 0,
    Test_Date DATE,  -- Ngày làm
    PRIMARY KEY (Candidate_ID, Test_ID),
    FOREIGN KEY (Candidate_ID) REFERENCES Candidate (Candidate_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Test_ID) REFERENCES Test (Test_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng QUẢN LÝ
CREATE TABLE Manage (
    Admin_ID CHAR(9) NOT NULL,
    User_ID CHAR(9) NOT NULL,
    Management_Date DATE, -- Ngày, thời gian chỉnh sửa ..., ngày quản lý
    PRIMARY KEY (Admin_ID, User_ID),
    FOREIGN KEY (Admin_ID) REFERENCES Admin (ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (User_ID) REFERENCES Users (User_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng EMAIL nhà tuyển dụng
CREATE TABLE Email (
    Scout_ID CHAR(9) NOT NULL,
    Email_ID CHAR(3) NOT NULL,
    PRIMARY KEY (Scout_ID, Email_ID),
    FOREIGN KEY (Scout_ID) REFERENCES Scout (Scout_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng NỘP ĐƠN
CREATE TABLE Submit_Application (
    Scout_ID CHAR(9) NOT NULL,
    News_ID CHAR(9) NOT NULL,
    Candidate_ID CHAR(9) NOT NULL,
    CV_ID CHAR(3) NOT NULL,
    Interview_Date DATE,
    Application_Status NVARCHAR(20),
    Submission_Date DATE,
    PRIMARY KEY (News_ID, Scout_ID, Candidate_ID, CV_ID),
    FOREIGN KEY (News_ID, Scout_ID) REFERENCES Recruitment_News (News_ID, Scout_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Candidate_ID, CV_ID) REFERENCES CV (Candidate_ID, CV_ID) ON DELETE NO ACTION ON UPDATE NO ACTION
);