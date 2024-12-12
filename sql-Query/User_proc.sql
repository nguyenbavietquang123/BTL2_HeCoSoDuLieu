

CREATE PROCEDURE InsertUser(
    IN Username VARCHAR(50),
    IN Password VARCHAR(50),
    IN Avatar VARCHAR(255),
    IN Gender VARCHAR(10),
    IN Phone VARCHAR(15),
    IN Birthdate DATE,
    IN Address VARCHAR(255),
    IN Lastname VARCHAR(50),
    IN Middlename VARCHAR(50),
    IN Firstname VARCHAR(50)
)
BEGIN
    DECLARE NewUserID VARCHAR(10);

    -- Lấy User_ID lớn nhất hiện tại
    SELECT IFNULL(MAX(User_ID), 'USR000000') INTO NewUserID FROM Users;

    -- Tăng giá trị User_ID
    SET NewUserID = CONCAT('USR', LPAD(SUBSTRING(NewUserID, 4) + 1, 6, '0'));

    -- Kiểm tra tính hợp lệ của số điện thoại
    IF Phone IS NOT NULL THEN
        IF LENGTH(Phone) = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Phone number is empty.';
        END IF;

        IF Phone REGEXP '[^0-9]' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Phone number must contain digits only.';
        END IF;

        IF LENGTH(Phone) < 7 OR LENGTH(Phone) > 15 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Phone number length must be between 7 and 15.';
        END IF;
    END IF;

    -- Chèn dữ liệu vào bảng Users
    INSERT INTO Users (
        User_ID, Username, Password, Avatar, Gender, Phone, Birthdate, Address, Lastname, Middlename, Firstname
    )
    VALUES (
        NewUserID, Username, Password, Avatar, Gender, Phone, Birthdate, Address, Lastname, Middlename, Firstname
    );

    -- Trả về User_ID mới
    SELECT NewUserID AS UserID, 'User added successfully.' AS Message;
END$$





CREATE PROCEDURE UpdateUser(
    IN UserID CHAR(9),
    IN Username VARCHAR(50),
    IN Password VARCHAR(50),
    IN Avatar VARCHAR(255),
    IN Gender VARCHAR(10),
    IN Phone VARCHAR(15),
    IN Birthdate DATE,
    IN Address VARCHAR(255),
    IN Lastname VARCHAR(50),
    IN Middlename VARCHAR(50),
    IN Firstname VARCHAR(50)
)
BEGIN
    -- Kiểm tra xem User_ID có tồn tại trong bảng Users không
    IF NOT EXISTS (SELECT 1 FROM Users WHERE User_ID = UserID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User ID does not exist. Please provide a valid User ID.';
    ELSE
        -- Kiểm tra tính hợp lệ của số điện thoại nếu được cung cấp
        IF Phone IS NOT NULL THEN
            IF LENGTH(Phone) = 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Phone number is empty.';
            END IF;

            IF Phone REGEXP '[^0-9]' THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Phone number must contain digits only.';
            END IF;

            IF LENGTH(Phone) < 7 OR LENGTH(Phone) > 15 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Phone number length must be between 7 and 15.';
            END IF;
        END IF;

        -- Thực hiện cập nhật dữ liệu
        UPDATE Users
        SET
            Username = COALESCE(Username, Username),
            Password = COALESCE(Password, Password),
            Avatar = COALESCE(Avatar, Avatar),
            Gender = COALESCE(Gender, Gender),
            Phone = COALESCE(Phone, Phone),
            Birthdate = COALESCE(Birthdate, Birthdate),
            Address = COALESCE(Address, Address),
            Lastname = COALESCE(Lastname, Lastname),
            Middlename = COALESCE(Middlename, Middlename),
            Firstname = COALESCE(Firstname, Firstname)
        WHERE User_ID = UserID;

        -- In thông báo thành công
        SELECT 'User updated successfully.' AS Message;
    END IF;
END$$





CREATE PROCEDURE DeleteUser(
    IN UserID CHAR(9)
)
BEGIN
    -- Kiểm tra xem User_ID có tồn tại trong bảng Users hay không
    IF NOT EXISTS (SELECT 1 FROM Users WHERE User_ID = UserID) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User ID does not exist. Please provide a valid User ID.';
    ELSE
        -- Xóa người dùng khỏi bảng Users
        DELETE FROM Users
        WHERE User_ID = UserID;

        -- In thông báo thành công
        SELECT 'User deleted successfully.' AS Message;
    END IF;
END$$


