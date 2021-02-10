import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { Connection } from "typeorm";
import { User } from "../../database/entity/user.entity";
import { BaseController } from "../base.controller";

@controller('/typeorm')
export class TypeORMController extends BaseController
{
    constructor(@inject('db') private db: Connection) {
        super();
    }

    @httpGet('/')
    private async index(req: Request, res: Response)
    {
        let users = await this.db.manager.find(User)
        res.json({
            status: 'success',
            message: 'list all users',
            data: {
                users
            }
        })
    }

    @httpPost('/')
    private async store(req: Request, res: Response)
    {
        let user = new User()
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.age = req.body.age
        let result = await this.db.manager.save(user)
        res.json({
            status: 'success',
            message: 'created new user',
            params: req.body,
            data: {
                user: result
            }
        })
    }
}