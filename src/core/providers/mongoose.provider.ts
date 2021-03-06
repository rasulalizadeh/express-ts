import path from 'path'
import { Application } from "express";
import { Container } from "inversify";
import { Provider } from "./provider.interface"
import appTemplate from '../../views/templates/app.template'
import expressVue from '../express-vue/express-vue-async'

export class ExpressVueProvider implements Provider{

    container: Container

    constructor() {
        this.container = new Container();
    }

    async register(app: Application) {
        const expressVueOptions = {
            vueOptions: "3.0.5",
            pagesPath: path.join(__dirname, '../../views'),
            template: appTemplate
        }
        // @ts-ignore
        await expressVue.use(app, expressVueOptions)
    }
}