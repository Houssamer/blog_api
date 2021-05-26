// 'use strict';

// var faker = require('faker');

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//       const roles = ["admin", "author", "guest"]; 
//       let amount = 20;
//       let data = [];
//       let date = new Date();
//       while(amount--) {
//         data.push({
//           username: faker.internet.userName(),
//           email: faker.internet.email(),
//           password: faker.internet.password(),
//           role: roles[parseInt(Math.random()*3)],
//           createdAt: date,
//           updatedAt: date
//         })
//       }

//       return queryInterface.bulkInsert('users', data, {});

    
//   },

//   down: (queryInterface, Sequelize) => {

//     return queryInterface.bulkDelete('users', null, {});

//   }
// };
