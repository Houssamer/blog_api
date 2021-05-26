const { Article } = require('../models');

module.exports = {
    getAllArticles() {
        return Article?.findAll();
    },
    getArticles(offset=0, limit=10) {
        return Article?.findAll({ offset: offset, limit: limit});
    },
    getArticlesByTitle(title) {
        return Article?.findAll({where: {title: title}});
    },
    getArticle(id) {
        return Article?.findAll({where:{id: id}});
    },
    getUserByUserId(UserId) {
        return Article?.findAll({where: {UsreId: UserId}});
    },
    addUser(article) {
        Article?.create(article);
    },
    updateUser(id, article) {
        Article?.update(article, {where: {id: id}});
    },
    deleteUser(id) {
        Article?.destroy({where: {id: id}})
    },
}