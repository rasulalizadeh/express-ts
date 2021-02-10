import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { BaseController } from "./base.controller";

@controller("")
export class IndexController extends BaseController
{
    @httpGet("/")
    public async index(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.vueOptions = {
            head: {
                title: 'Express TS | Vue',
                metas: [
                    { property:'og:title', content: 'Express TS Vue Template'},
                    { name:'twitter:title', content: 'Express TS'},
                ]
            }
        }
        await res.renderVue('index.vue', {}, req.vueOptions)
    }

    @httpGet("/json")
    public status(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.json({
            status: 'ok'
        })
    }
}