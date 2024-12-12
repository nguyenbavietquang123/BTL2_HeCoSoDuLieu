const db = require("../config/database-connect.js");

/**
 * Call the stored procedure with dynamic input parameters.
 * @param {string|null} jobPosition - The job position to search for (or null).
 * @param {string|null} school - The school to search for (or null).
 * @param {string|null} newsID - The news ID to search for (or null).
 * @returns {Promise<Array>} - A promise that resolves to the query result.
 */
async function callGetFilteredApplicationData(jobPosition, school, newsID) {
    const query = `CALL GetFilteredApplicationData(?, ?, ?)`;
    const params = [jobPosition, school, newsID]; // Parameters to pass to the stored procedure

    try {
        const [rows, fieldData] = await db.query(query, params);
        return rows[0]; // Return the result set
    } catch (err) {
        
        throw err; // Rethrow the error so it can be caught in the calling function
    }
}

module.exports.index = async (req, res) => {
    let jobPosition = req.query.Job_Title;
    let school = req.query.Education;
    let newsID = req.query.News_ID;

    // Handle cases where parameters might be empty or undefined
    if (jobPosition === undefined || jobPosition === "") jobPosition = null;
    if (newsID === undefined || newsID === "") newsID = null;
    if (school === undefined || school === "") school = null;

    try {
        // Call the function and get the filtered data
        const submit = await callGetFilteredApplicationData(jobPosition, school, newsID);

        // Pass the result to the view
        res.render("submittedApplication.pug", { submit: submit });
    } catch (err) {
        const link = "/submittedApplication";
        res.render("error.pug",{message: err.message, link:link})
    }
};
module.exports.editSubmitApp = async (req, res) => {
    let News_ID = req.body.ID;
    let Candidate_ID = req.body.Candidate_ID;
    let Scout_ID = req.body.Scout_ID;
    let Interview_Date = req.body.Interview_Date;
    let Application_Status = req.body.Application_Status;
    if (Interview_Date === undefined || Interview_Date === "") Interview_Date = null;
    if (Application_Status === undefined || Application_Status === "") Application_Status = null;
    if (Interview_Date === ""){await db.execute('INSERT INTO Pending_Status_Update (News_ID,Scout_ID,Candidate_ID, Application_Status, Interview_Date) VALUES (?,?,?,?,?);', [ News_ID,Scout_ID ,Candidate_ID, Application_Status, null])
        .then(([rows, fieldData]) => {
            res.redirect("/submittedApplication");
        })
        .catch(err => {
            const link = "/submittedApplication";
            res.render("error.pug",{message: err.message, link:link})
        })
        await db.execute('DELETE FROM Pending_Status_Update  WHERE News_ID = ? AND Scout_ID = ? AND Candidate_ID = ? ;',[ News_ID,Scout_ID ,Candidate_ID]);
    }

    else{ await db.execute('INSERT INTO Pending_Status_Update (News_ID,Scout_ID,Candidate_ID, Application_Status, Interview_Date) VALUES (?,?,?,?,?);', [ News_ID,Scout_ID,Candidate_ID, Application_Status, Interview_Date])
        .then(([rows, fieldData]) => {
            res.redirect("/submittedApplication");
        })
        .catch(err => {
            const link = "/submittedApplication";
            res.render("error.pug",{message: err.message, link:link})
        })
       await db.execute('DELETE FROM Pending_Status_Update  WHERE News_ID = ? AND Scout_ID = ? AND Candidate_ID = ? ;',[ News_ID,Scout_ID ,Candidate_ID]);
    }
}
