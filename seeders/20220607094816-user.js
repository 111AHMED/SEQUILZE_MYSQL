'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
module.exports = { 
  async up : (queryInterface, Sequelize) => { 
    return queryInterface.bulkInsert('Users', [{ 
        firstName : 'John', 
        lastName : 'Doe', 
        email : 'demo@demo.com', 
        password : '$321!pass!123$', 
        createdAt : nouvelle Date(), 
        updatedAt : nouvelle Date() 
      }], {}); 
  },
  async down : (queryInterface, Sequelize) => { 
    return queryInterface.bulkDelete('Users', null, {}); 
  } 
} ;