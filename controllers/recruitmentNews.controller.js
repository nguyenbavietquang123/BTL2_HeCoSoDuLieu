const db = require("../config/database-connect.js");
async function GetFilteredNewsRecruitment(Job_Title, News_ID, Scout_ID, minSalary, maxSalary, Location, sort) {
    const query = `CALL GetFilteredNewsRecruitment(?, ?, ?, ?, ?, ?, ?)`;
    const params = [Job_Title, News_ID, Scout_ID, minSalary, maxSalary, Location, sort]; // Parameters to pass to the stored procedure

    try {
        const [rows, fieldData] = await db.query(query, params);
        return rows[0]; // Return the result set
    } catch (err) {
        console.log(err.message);
        const link = "/recruitmentNews"
        res.render("error.pug",{message: err.message, link:link})
    }
}
async function callUpdateRecruitmentNews(News_ID, Scout_ID, Job_Position, Job_ID, Location, Salary, Post_Date, Deadline, Job_Description, Benefits) {
    const query = `CALL UpdateRecruitmentNews(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [News_ID, Scout_ID, Job_Position, Job_ID, Location, Salary, Post_Date, Deadline, Job_Description, Benefits]; // Parameters to pass to the stored procedure

    try {
        const [result] = await db.query(query, params);
        return result; // Return the result set
    } catch (err) {
        throw err;
    }
}
async function callAddRecruitmentNews(News_ID, Scout_ID, Job_Position, Job_ID, Location, Salary, Post_Date, Deadline, Job_Description, Benefits) {
    const query = `CALL AddRecruitmentsNews(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [News_ID, Scout_ID, Job_Position, Job_ID, Location, Salary, Post_Date, Deadline, Job_Description, Benefits]; // Parameters to pass to the stored procedure

    try {
        const [result] = await db.query(query, params);
        return result;
    } catch (err) {
        //console.log(err.message);
        throw err;
    }
}
module.exports.index = async (req, res) => {
    let Job_Title = req.query.filter_Job_Title;
    let News_ID = req.query.filter_News_ID;
    let Scout_ID = req.query.filter_Scout_ID;
    let minSalary = req.query.filter_minSalary;
    let maxSalary = req.query.filter_maxSalary;
    let Location = req.query.filter_Location;
    let sort = req.query.sortSalary;
    if (Job_Title === undefined || Job_Title === "") Job_Title = null;
    if (News_ID === undefined || News_ID === "default") News_ID = null;
    if (Scout_ID === undefined || Scout_ID === "default") Scout_ID = null;
    if (minSalary === undefined || minSalary === "") minSalary = null;
    if (maxSalary === undefined || maxSalary === "") maxSalary = null;
    if (Location === undefined || Location === "") Location = null;
    if (sort === undefined || sort === "") sort = null;
    try {
        const news = await GetFilteredNewsRecruitment(Job_Title, News_ID, Scout_ID, minSalary, maxSalary, Location, sort);
        await db.query(`CALL GetAverageSalaryByJob()`)
            .then(([rows, fieldData]) => {
                average = rows[0];
            })
            .catch(err =>{
                console.log(err);
            })
        await db.execute(`SELECT * FROM Job`)
            .then(([rows, fieldData]) => {
                jobs = rows;
            })
            .catch(err => {
                console.log(err);
            })
        await db.execute(`SELECT * FROM Scout`)
            .then(([rows, fieldData]) => {
                userID = rows;
                userID.map(user => {
                    if(user.Company===null) user.Company = user.Scout_ID;
                })
            })
            .catch(err => {
                console.log(err);
            })
        await db.execute(`SELECT News_ID FROM Recruitment_News`)
            .then(([rows, fieldData]) => {
                full_news = rows;
            })
            .catch(err => {
                console.log(err);
            })
        res.render("recruitmentNews.pug", { news: news, jobs: jobs, userID: userID, full_news :full_news, average: average });
    } catch (error) {
        // console.error("Error fetching data:", err); 
        const link = "/recruitmentNews"
        res.render("error.pug",{message: error.message, link:link})
    }
}

module.exports.updateNews = async (req, res) => {
    let News_ID = req.body.ID;
    let Scout_ID = req.body.Scout_ID;
    let Job_Position = req.body.Job_Position;
    let Job_ID = req.body.Job;
    let Location = req.body.Location;
    let Salary = req.body.Salary;
    let Post_Date = req.body.Post_Date;
    let Deadline = req.body.Deadline;
    let Job_Description = req.body.Job_Description;
    let Benefits = req.body.Benefits;
    if (Job_Position === "") Job_Position = null;
    if (Location === "") Location = null;
    if (Salary === "") Salary = null;
    if (Post_Date === "") Post_Date = null;
    if (Deadline === "") Deadline = null;
    if (Job_Description === "") Job_Description = null;
    if (Benefits === "") Benefits = null;
    try {
        const updating = await callUpdateRecruitmentNews(News_ID, Scout_ID, Job_Position, Job_ID, Location, Salary, Post_Date, Deadline, Job_Description, Benefits);
        res.redirect("/recruitmentNews");
    } catch (error) {
        const link = "/recruitmentNews"
        res.render("error.pug",{message: error.message, link:link});
    }
}
module.exports.addNews = async (req, res) => {
    let News_ID = req.body.add_ID;
    let Scout_ID = req.body.add_Scout_ID;
    let Job_Position = req.body.add_Job_Position;
    let Job_ID = req.body.add_Job;
    let Location = req.body.add_Location;
    let Salary = req.body.add_Salary;
    let Post_Date = req.body.add_Post_Date;
    let Deadline = req.body.add_Deadline;
    let Job_Description = req.body.add_Job_Description;
    let Benefits = req.body.add_Benefits;
    if (News_ID === "") News_ID = null;
    if (Scout_ID === "default") Scout_ID = null;
    if (Job_Position === "") Job_Position = null;
    if (Job_ID === "default") Job_ID = null
    if (Location === "") Location = null;
    if (Salary === "") Salary = null;
    if (Post_Date === "") Post_Date = null;
    if (Deadline === "") Deadline = null;
    if (Job_Description === "") Job_Description = null;
    if (Benefits === "") Benefits = null;
    try {
        const newRecruitment = await callAddRecruitmentNews(News_ID, Scout_ID, Job_Position, Job_ID, Location, Salary, Post_Date, Deadline, Job_Description, Benefits);
        res.redirect("/recruitmentNews");
    } catch (error) {
        const link = "/recruitmentNews"
        res.render("error.pug",{message: error.message, link:link})
    }
}
module.exports.delNews = async (req, res) => {
    const { News_ID, Scout_ID } = req.query;
    const query = `CALL DeleteRecruitmentNews(?, ?)`;
    const params = [News_ID, Scout_ID];
    try {
        const [result] = await db.query(query, params);
    } catch (error) {
        const link = "/recruitmentNews"
        res.render("error.pug",{message: error.message, link:link})
    }
    res.redirect("/recruitmentNews");
}