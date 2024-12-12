const AdminService = require('../../sql-Query/query_admin')
const userService = require('../../sql-Query/query_user')

module.exports.getAdminIndex = async (req, res) => {
    res.render('admin/index1.pug');
}

module.exports.getAdminLogin = async (req, res) => {
    try {
        const { Username, Password } = req.query;
        const result = await AdminService.loginAdmin(Username, Password);
        if (result.length > 0) {
            res.redirect('/admin/all_user');
        } else {
            res.status(401).render('admin/index2.pug');
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports.getAllUser = async (req, res) => {
    try {
        const result = await userService.getAllUser();
        res.status(200).render('admin/all_user.pug', { users: result });
    } catch (error) {
        console.error(error);
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const User_ID = req.body.User_ID;
        console.log(User_ID);
        await userService.AdminDeleteUser(User_ID);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
    }
}

