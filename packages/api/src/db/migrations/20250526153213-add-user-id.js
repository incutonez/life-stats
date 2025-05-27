import { env } from "node:process";
import { config } from "dotenv";

config({
	path: ".env.local",
});
/** @type {import('sequelize-cli').Migration} */
export default {
	/**
	 * @param {import('sequelize').QueryInterface} queryInterface
	 * @param {import('sequelize')} Sequelize
	 * @returns {Promise<any>}
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("applications", "user_id", {
			type: Sequelize.STRING,
			defaultValue: env.DEFAULT_USER,
		});
		await queryInterface.addColumn("comments", "user_id", {
			type: Sequelize.STRING,
			defaultValue: env.DEFAULT_USER,
		});
		await queryInterface.addColumn("companies", "user_id", {
			type: Sequelize.STRING,
			defaultValue: env.DEFAULT_USER,
		});
	},

	/**
	 * @param {import('sequelize').QueryInterface} queryInterface
	 * @returns {Promise<any>}
	 */
	async down(queryInterface) {
		await queryInterface.removeColumn("applications", "user_id");
		await queryInterface.removeColumn("comments", "user_id");
		await queryInterface.removeColumn("companies", "user_id");
	},
};
