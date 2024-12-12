const express = require('express');
const submittedApplicationController = require('../controllers/submittedApplication.controller')
const recruitmentController = require('../controllers/recruitmentNews.controller')
const candidateScoreController = require('../controllers/candidateScore.controller');
const recruimentController = require('../controllers/recruiment(tin_tuyen_dung)/recruiment.controller')
const userController = require('../controllers/user_index/user.controller')
const adminController = require('../controllers/admin_controler/admin.controller')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get("/submittedApplication", submittedApplicationController.index);
router.post("/submittedApplication",submittedApplicationController.editSubmitApp);
router.get("/recruitmentNews",recruitmentController.index);
router.post("/recruitmentNews/update",recruitmentController.updateNews);
router.post("/recruitmentNews/add",recruitmentController.addNews);
router.get("/recruitmentNews/delete",recruitmentController.delNews);
router.get("/userScore",candidateScoreController.index)
// for tin tuyen dung
router.get("/recruitment-news/:id", recruimentController.getRecruitmentNews);
router.get("/recruitment-news-index", recruimentController.getRecruitmentNewsIndex);

// for user
router.get("/index", userController.getindex);
router.get("/login", userController.getLogin);
router.get("/register", userController.getRegister);
router.post("/register_submit", upload.single('avatar'), userController.registerSubmit);
router.get("/user_info", userController.getUserInfo);
router.post("/update_info", upload.single('avatar'), userController.updateInfo);
router.delete("/delete_account", userController.deleteAccount);
router.get("/scout_info", userController.getScoutInfo);
router.post("/update_scout_info", upload.array('picture'), userController.updateScoutInfo);


// for admin
router.get("/admin", adminController.getAdminIndex);
router.get("/admin/login", adminController.getAdminLogin);
router.get("/admin/all_user", adminController.getAllUser);
router.delete("/admin/delete_user", adminController.deleteUser);
module.exports = router;
