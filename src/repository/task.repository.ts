import { connect } from "../config/db.config";
import { APILogger } from '../logger/api.logger';
import { Tasks } from "../model/task.model";

export class TaskRepository {

    private logger: APILogger;
    private db: any = {};
    private taskRespository: any;

    constructor() {
        this.db = connect();
        this.taskRespository = this.db.sequelize.getRepository(Tasks);
        this.logger = new APILogger();
    }

    async getTasks() {
        
        try {
            const tasks = await this.taskRespository.findAll();
            console.log('tasks:::', tasks);
            return tasks;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createTask(task) {
        let data = {};
        console.log('task ', task)
        try {
            task.createdAt = new Date().toDateString();
            data = await this.taskRespository.create(task);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateTask(task) {
        let data = {};
        try {
            task.updatedAt = new Date().toISOString();
            data = await this.taskRespository.update({...task}, {
                where: {
                    id: task.id
                }
            });
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async deleteTask(taskId) {
        let data = {};
        try {
            data = await this.taskRespository.destroy({
                where: {
                    id: taskId
                }
            });
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return {status: data > 0};
    }

}