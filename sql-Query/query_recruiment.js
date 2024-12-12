const db = require('../config/database-connect');

class RecruitmentNewsService {
    constructor() {
        this.tableName = "`BTL_2`.`Recruitment_News`";
    }

    getAll(limit = 1000) {
        const sql = `SELECT * FROM ${this.tableName} LIMIT ?;`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [limit], (err, results) => {
            //     if (err) {
            //         return reject(err);
            //     }
            //     resolve(results);
            // });
            try {
                const [rows, fieldData] = await db.query(sql,[limit]);
                resolve(rows);
            } catch (error) {
                return reject(error);
            }
        });
    }

    getAllbyId(Scout_ID) {
        const sql = `SELECT * FROM ${this.tableName} WHERE Scout_ID = ?;`;
        return new Promise(async (resolve, reject) => {
            // db.query(sql, [Scout_ID], (err, results) => {
            //     if (err) return reject(err);
            //     resolve(results);
            // });
            try {
                const [rows, fieldData] = await db.query(sql,[Scout_ID]);
                resolve(rows);
            } catch (error) {
                return reject(error);
            }
        });
    }
}

module.exports = new RecruitmentNewsService();