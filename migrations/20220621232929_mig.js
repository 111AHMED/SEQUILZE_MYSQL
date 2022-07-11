const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Roles", deps: []
 * createTable() => "Users", deps: [Roles]
 *
 */

const info = {
  revision: 1,
  name: "mig",
  created: "2022-06-21T23:29:29.461Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Roles",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        uuid: {
          type: Sequelize.UUID,
          field: "uuid",
          defaultValue: Sequelize.UUIDV4,
        },
        libelle: { type: Sequelize.STRING, field: "libelle", allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        uuid: {
          type: Sequelize.UUID,
          field: "uuid",
          defaultValue: Sequelize.UUIDV4,
        },
        firstName: {
          type: Sequelize.STRING,
          field: "firstName",
          allowNull: false,
        },
        id_role: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "cascade",
          references: { model: "Roles", key: "id" },
          field: "id_role",
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          field: "lastName",
          allowNull: false,
        },
        email: { type: Sequelize.STRING, field: "email", allowNull: false },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        retapepassword: {
          type: Sequelize.STRING,
          field: "retapepassword",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Roles", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
