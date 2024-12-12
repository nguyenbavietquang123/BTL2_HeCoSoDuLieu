const UserService = require('../../sql-Query/query_user');

module.exports.getindex = (req, res) => {
    res.render("index/index1.pug");
}

module.exports.getRegister = async (req, res) => {
    try {
        const { Username, Password } = req.query;
        const result = await UserService.checkUsername(Username);
        if (result.length > 0) {
            res.render("index/index2.pug", { userData: { Username, Password }, message: "Tên đăng nhập đã tồn tại" });
        } else {
            res.render("index/register.pug", { userData: { Username, Password } });
        }
    } catch (error) {
        console.error('Lỗi khi render trang register:', error);
        res.status(500).json({
            message: "Lỗi server: " + error.message,
            status: 500
        });
    }
}

module.exports.registerSubmit = async (req, res) => {
    try {
        const userData = {
            Username: req.body.username,
            Password: req.body.password,
            Avatar: req.file ? req.file.filename : null,
            Gender: req.body.gender,
            Phone: req.body.phone,
            Birthdate: req.body.birthdate,
            Address: req.body.address,
            Lastname: req.body.lastname,
            Middlename: req.body.middlename,
            Firstname: req.body.firstname,
            Role: req.body.role
        };

        // Kiểm tra dữ liệu
        if (!userData.Username || !userData.Password || !userData.Phone || !userData.Firstname || !userData.Lastname || !userData.Role) {
            return res.status(400).json({
                message: "Thiếu thông tin bắt buộc",
                status: 400
            });
        }
        const result = await UserService.insertUser(userData);


        if (result.length > 0 && userData.Role == "Candidate") {

            console.log("Candidate");
            const insert_candidate = await UserService.insertCandidate(userData.Username);
            if (insert_candidate.affectedRows > 0) {
                console.log("Đăng ký thành công");
                res.status(200).redirect('/user_info?Username=' + userData.Username + '&Password=' + userData.Password);
            } else {
                console.log("Đăng ký thất bại");
                res.status(400).send("Đăng ký thất bại");
            }

        } else if (result.length > 0 && userData.Role == "Scout") {

            console.log("Scout");
            const insert_scout = await UserService.insertScout(userData.Username);
            if (insert_scout.affectedRows > 0) {
                console.log("Đăng ký thành công");
                res.status(200).redirect('/scout_info?Username=' + userData.Username + '&Password=' + userData.Password);
            } else {
                console.log("Đăng ký thất bại");
                res.status(400).send("Đăng ký thất bại");
            }
        } else {
            res.status(400).send("Đăng ký thất bại");
        }
    } catch (error) {
        console.error('Lỗi khi lưu dữ liệu:', error);
        res.status(500).json({
            message: "Lỗi server: " + error.message,
            status: 500
        });
    }
}

module.exports.getUserInfo = async (req, res) => {
    try {
        const { Username, Password } = req.query;
        const userData = await UserService.getUserByUsername(Username, Password);

        if (userData.length > 0) {
            res.render("index/user_info.pug", { userData: userData[0] });
        } else {
            res.status(404).send("Không tìm thấy thông tin người dùng");
        }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        res.status(500).json({
            message: "Lỗi server: " + error.message,
            status: 500
        });
    }
}

module.exports.updateInfo = async (req, res) => {
    try {
        const userData = {
            Username: req.body.username,
            Password: req.body.password,
            Avatar: req.file ? req.file.filename : null,
            Gender: req.body.gender,
            Phone: req.body.phone,
            Birthdate: req.body.birthdate,
            Address: req.body.address,
            Lastname: req.body.lastname,
            Middlename: req.body.middlename,
            Firstname: req.body.firstname,
        };
        if (req.body.email != "") {
            const email = await UserService.updateUserEmail(req.body.email, userData.Username);
            if (email.affectedRows <= 0) {
                return res.status(400).json({
                    message: "Cập nhật email thất bại",
                    status: 400
                });
            }
        }
        const result = await UserService.updateUser(userData);
        if (result.length > 0) {
            res.status(200).json({
                message: "Cập nhật thông tin thành công",
                status: 200
            });
        } else {
            res.status(400).json({
                message: "Cập nhật thông tin thất bại",
                status: 400
            });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin:', error);
        res.status(500).json({
            message: "Lỗi server: " + error.message,
            status: 500
        });
    }
}

module.exports.deleteAccount = async (req, res) => {
    try {
        const { Username, Password } = req.query;
        const result = await UserService.deleteUser(Username, Password);
        res.status(200).json({
            message: "Xóa tài khoản thành công",
            status: 200
        });
    } catch (error) {
        console.error('Lỗi khi xóa tài khoản:', error);
        res.status(500).json({
            message: "Lỗi server: " + error.message,
            status: 500
        });
    }
}

module.exports.getScoutInfo = async (req, res) => {
    try {
        const { Username, Password } = req.query;
        const userData = await UserService.getUserByUsername(Username, Password);
        res.render("index/scout_info.pug", { userData: userData[0] });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin scout:', error);
        res.status(500).json({
            message: "Lỗi server: " + error.message,
            status: 500
        });
    }
}

module.exports.updateScoutInfo = async (req, res) => {
    try {
        const userData = {
            Company: req.body.company,
            CompanyLogo: req.files[1] ? req.files[1].filename : null,
            Email: req.body.email,
            Username: req.body.username,
            Password: req.body.password,
            Avatar: req.files[0] ? req.files[0].filename : null,
            Gender: req.body.gender,
            Phone: req.body.phone,
            Birthdate: req.body.birthdate,
            Address: req.body.address,
            Lastname: req.body.lastname,
            Middlename: req.body.middlename,
            Firstname: req.body.firstname,
        };
        // if (req.body.email != "") {
        //     const email = await UserService.updateScoutEmail(req.body.email, userData.Username);
        //     if (email.affectedRows <= 0) {
        //         return res.status(400).json({
        //             message: "Cập nhật email thất bại",
        //             status: 400
        //         });
        //     }
        // }
        if (req.body.Email != "") {
            const email = await UserService.updateScoutEmail(req.body.email, userData.Username);
        }
        if (req.body.Company != "" || req.body.CompanyLogo != "") {
            const company = await UserService.updateScoutCompany(req.body.company, userData.Username, userData.CompanyLogo);
            if (company.affectedRows <= 0) {
                return res.status(400).json({
                    message: "Cập nhật công ty thất bại",
                    status: 400
                });
            }
        }
        const result = await UserService.updateUser(userData);
        if (result.length > 0) {
            res.status(200).json({
                message: "Cập nhật thông tin thành công",
                status: 200
            });
        } else {
            res.status(400).json({
                message: "Cập nhật thông tin thất bại",
                status: 400
            });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin:', error);
        res.status(500).json({
            message: "Lỗi server: " + error.message,
            status: 500
        });
    }
}

module.exports.getLogin = async (req, res) => {
    try {
        const { Username, Password } = req.query;
        const userData = await UserService.getUserByUsername(Username, Password);
        if (userData.length > 0) {
            res.redirect("/recruitment-news-index?Username=" + Username + "&Password=" + Password);
        } else {
            res.render("index/index2.pug", { message: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        res.status(500).json({
            message: "Lỗi server: " + error.message,
            status: 500
        });
    }
}

