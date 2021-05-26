'use strict';
var faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const roles = ["admin", "author", "guest"]; 
    let numberofUsers = 20;
    let users = [];
    let date = new Date();
    let userId = 1;
    while(numberofUsers--) {
      let dateU = faker.date.between(2000, 2021)
      users.push({
        id: userId,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: roles[parseInt(Math.random()*3)],
        createdAt: dateU,
        updatedAt: dateU,
      })
      userId++;
    }


    let tags = [];
    let numberOfTags = 10;
    let tagId = 1;
    while(numberOfTags--) {
      tags.push({
        id: tagId,
        name: faker.lorem.sentence(3),
        createdAt: date,
        updatedAt: date,
      })
      tagId++;
    }
    


    let articles = [];
    let numberOfArticles = users.length;
    let articleId = 1;
    while(numberOfArticles--) {
      let number = parseInt(Math.random()*8 + 2);
      while(number--) {
        let dateU = users[numberOfArticles].createdAt;
        let dateP = faker.date.between(dateU, 2021);
        articles.push({
          id: articleId,
          title: faker.lorem.sentence(2),
          content: faker.lorem.paragraph(5),
          createdAt: dateP,
          updatedAt: dateP,
          UserId: users[numberOfArticles].id,
        })
        articleId++;
      }
    } 


    let articletags = [];
    let amount = articles.length;
    while(amount--) {
      let number = parseInt(Math.random()*4 + 2);
      while(number--) {
        articletags.push({
          createdAt: date,
          updatedAt: date,
          ArticleId: articles[amount].id,
          TagId: tags[parseInt(Math.random()*10)].id,
        })
      }
    }



    let comments = [];
    let numberOfComments = articles.length;
    let commentId = 1;
    while(numberOfComments--) {
      let number = parseInt(Math.random()*11);
      while(number--) {
        comments.push({
          id: commentId,
          content: faker.lorem.paragraph(3),
          createdAt: date,
          updatedAt: date,
          ArticleId: articles[numberOfComments].id
        })
        commentId++;
      }
    }

    var x1 = await queryInterface.bulkInsert('users', users, {});
    var x2 = await queryInterface.bulkInsert('tags', tags, {});
    var x3 = await queryInterface.bulkInsert('articles', articles, {});
    var x4 = await queryInterface.bulkInsert('comments', comments, {});
    var x5 = await queryInterface.bulkDelete('articletags', articletags, {});

    return Promise.all([x1, x2, x3, x4, x5]);

    
  },

  down: (queryInterface, Sequelize) => {
   
    var x1 = await queryInterface.bulkDelete('users', null, {});
    var x2 = await queryInterface.bulkDelete('articles', null, {});
    var x3 = await queryInterface.bulkDelete('comments', null, {});
    var x4 = await queryInterface.bulkDelete('tags', null, {});
    var x5 = await queryInterface.bulkDelete('articletags', null, {});

    return Promise.all([x1, x2, x3, x4, x5]);
  }
};
