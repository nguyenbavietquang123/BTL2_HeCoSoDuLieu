const db = require('../config/database-connect')


class AdminService {
    constructor() {
        this.db = 'BTL_2';
    }
    loginAdmin = (Username, Password) => {
        try {
            const query = `SELECT * FROM BTL_2.Admin WHERE Username = ? AND Password = ?`;
            return new Promise(async (resolve, reject) => {
                // db.query(query, [Username, Password], (err, results) => {
                //     if (err) return reject(err);
                //     resolve(results);
                // });
                try {
                    const [rows, fieldData] = await db.query(query  ,[Username, Password]);
                    resolve(rows);
                } catch (error) {
                    return reject(error);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new AdminService();
