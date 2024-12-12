const recruitmentNewsService = require('../../sql-Query/query_recruiment');
//for web
module.exports.getRecruitmentNews = (req, res) => {
    const id = req.params.id;
    recruitmentNewsService.getAllbyId(id).then((data) => {
        res.render("recruiment_new/recruiment_new_id.pug", {
            news: data
        });
    }).catch((err) => {
        console.error(err);
    });
}

module.exports.getRecruitmentNewsIndex = (req, res) => {
    const username = req.query.Username;
    recruitmentNewsService.getAll().then((data) => {
        res.render("recruiment_new/recruiment_new.pug", {
            news: data
        });
    }).catch((err) => {
        console.error(err);
    });
}

//for api
