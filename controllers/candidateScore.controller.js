const db = require("../config/database-connect.js");

module.exports.index = async (req,res) => {
    const candidateID = 'USR200022';
    await db.execute(`SELECT Lastname, MiddleName, FirstName, Test_Name, Num_Of_Question, Duration, Nums_Of_Correct_Answers, DATE_FORMAT(Test_Date, '%d-%m-%Y') AS Test_Date_Formatted FROM Users U, Test T, Take_Test S Where T.Test_ID = S.Test_ID AND S.Candidate_ID = ? AND U.User_ID = ?`,[candidateID,candidateID])
    .then(async ([rows, fieldData]) =>  {
        let candidateResult = rows;
        candidateResult.map((result)=>{
            result.scores = (((10*1.00)/result.Num_Of_Question)*result.Nums_Of_Correct_Answers).toFixed(2);
            return result;
        })
        const candidateName = candidateResult[0].Lastname + " "+candidateResult[0].MiddleName+" "+candidateResult[0].FirstName;
        const [result] = await db.query('SELECT check_knowledge_level(?) AS level', [candidateID]);
        const level = result[0].level;;
        res.render("candidateScore.pug", {candidateName:candidateName, candidateResult: candidateResult, level: level})
    })
    .catch(err => {
        console.log(err);
    })
} 