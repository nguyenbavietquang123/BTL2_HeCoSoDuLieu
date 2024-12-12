const db = require('../config/database-connect');

class UserService {
    constructor() {
        this.tableName = "`BTL_2`.`Users`";
        this.email_ID = 1;
    }
    insertUser(user) {
        try {
            const sql = `CALL BTL_2.InsertUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            const params = [user.Username, user.Password, user.Avatar,
            user.Gender, user.Phone, user.Birthdate, user.Address,
            user.Lastname, user.Middlename, user.Firstname];

            return new Promise(async (resolve, reject) => {
                // db.query(sql, params, (err, results) => {
                //     if (err) return reject(err);
                //     resolve(results);
                // })
                try {
                    const [rows, fieldData] = await db.query(sql, params);
                    resolve(rows);
                } catch (error) {
                    reject(error);
                }
            });
        } catch (error) {
            console.error('Lỗi khi lưu dữ liệu:', error);
        }
    }

    getUserByUsername(Username, Password) {
        const sql = `SELECT * FROM BTL_2.Users WHERE Username = ? AND Password = ?;`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [Username, Password], (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [rows, fieldData] = await db.query(sql, [Username, Password]);
                resolve(rows);
            } catch (error) {
                reject(error);
            }
        });
    }
    checkUsername(Username) {
        const sql = `SELECT * FROM BTL_2.Users WHERE Username = ?;`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [Username], (err, results) => {
            //     if (err) return reject(err);
            //     console.log(results);
            //     resolve(results);
            // });
            try {
                const [rows, fieldData] = await db.query(sql, [Username]);
                console.log(rows);
                resolve(rows);
            } catch (error) {
                reject(error);
            }
        });
    }
    getUserID(Username) {
        const sql = `SELECT User_ID FROM BTL_2.Users WHERE Username = ?;`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [Username], (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [rows, fieldData] = await db.query(sql, Username);
                resolve(rows);
            } catch (error) {
                reject(error);
            }
        });
    }
    async updateUser(user) {
        const userId = await this.getUserID(user.Username);
        try {
            const sql = `CALL BTL_2.UpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            const params = [userId[0].User_ID, user.Username, user.Password, user.Avatar, user.Gender, user.Phone, user.Birthdate,
            user.Address, user.Lastname, user.Middlename, user.Firstname];
            return new Promise(async (resolve, reject) => {
                // db.query(sql, params, (err, results) => {
                //     if (err) {
                //         console.error('Lỗi khi cập nhật thông tin:', err);
                //         return reject(err);
                //     }
                //     resolve(results);
                // });
                try {
                    const [result] = await db.query(sql, params);
                    return resolve(result);
                } catch (error) {
                    console.error('Lỗi khi cập nhật thông tin:', error);
                    return reject(error);
                }
            });

        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
        }
    }
    async insertCandidate(Username) {
        const userID = await this.getUserID(Username);
        const sql = `INSERT INTO BTL_2.Candidate (Candidate_ID) VALUES (?);`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [userID[0].User_ID], (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [result] = await db.query(sql, [userID[0].User_ID]);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
    async insertScout(Username) {
        const userID = await this.getUserID(Username);
        const sql = `INSERT INTO BTL_2.Scout (Scout_ID) VALUES (?);`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [userID[0].User_ID], (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [result] = await db.query(sql, [userID[0].User_ID]);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
    async updateUserEmail(email, Username) {
        const userID = await this.getUserID(Username);
        const sql = `UPDATE BTL_2.Candidate SET Email = ? WHERE Candidate_ID = ?;`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [email, userID[0].User_ID], (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [result] = await db.query(sql, [email, userID[0].User_ID]);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
    async deleteUser(Username, Password) {
        const userID = await this.getUserID(Username);
        const sql = `CALL BTL_2.DeleteUser(?);`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [userID[0].User_ID], (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [result] = await db.query(sql, [userID[0].User_ID]);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
    async updateScoutCompany(company, Username, CompanyLogo) {
        const userID = await this.getUserID(Username);
        const sql = `UPDATE BTL_2.Scout SET Company = ?, Company_Logo = ? WHERE Scout_ID = ?;`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [company, CompanyLogo, userID[0].User_ID], (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [result] = await db.query(sql, [company, CompanyLogo, userID[0].User_ID]);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
    getAllUser() {
        const sql = `SELECT * FROM BTL_2.Users;`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [rows, fieldData] = await db.query(sql);
                resolve(rows);
            } catch (error) {
                return reject(error);
            }
        });
    }
    AdminDeleteUser(User_ID) {
        try {
            const sql = `CALL BTL_2.DeleteUser(?);`;
            return new Promise(async (resolve, reject) => {
                // db.query(sql, [User_ID], (err, results) => {
                //     if (err) return reject(err);
                //     resolve(results);
                // });
                try {
                    const [result] = await db.query(sql, [User_ID]);
                    return resolve(result);
                } catch (error) {
                    return reject(error);
                }
            });
        } catch (error) {
            console.error('Lỗi khi xóa tài khoản:', error);
        }
    }
    async updateScoutEmail(email, Username) {
        const userID = await this.getUserID(Username);
        const findEmail = await this.findScoutEmail(email);
        if (findEmail.length > 0) {
            return {
                message: "Email đã tồn tại",
                status: 400
            };
        }

        const sql = `INSERT INTO BTL_2.Email (Scout_ID, Email_ID, Email) VALUES (?, ?, ?);`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [userID[0].User_ID, this.email_ID + 1, email], (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [result] = await db.query(sql, [userID[0].User_ID, this.email_ID + 1, email]);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
    findScoutEmail(email) {
        try {
            const sql = `SELECT * FROM BTL_2.Email WHERE Email = ?;`;
            return new Promise(async (resolve, reject) => {
                // db.query(sql, [email], (err, results) => {
                //     if (err) return reject(err);
                //     resolve(results);
                // });
                try {
                    const [rows, fieldData] = await db.query(sql,[email]);
                    resolve(rows);
                } catch (error) {
                    return reject(error);
                }
            });
        } catch (error) {
            console.error('Lỗi khi tìm email:', error);
        }
    }
}

module.exports = new UserService();