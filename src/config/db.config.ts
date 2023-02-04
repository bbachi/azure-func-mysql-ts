import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize';
import { Tasks } from '../model/task.model';

export const connect = () => {

    const hostName = process.env.MYSQL_HOST;
    const userName = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;
    const dialect: any = process.env.MYSQL_DIALECT;

    const operatorsAliases: any = false;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect,
        operatorsAliases,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    sequelize.addModels([Tasks]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    
    return db;

}