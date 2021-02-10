import _ from 'lodash'
import "reflect-metadata"
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import { Container } from 'inversify'
import providers from './core/config/providers.config'
import { InversifyExpressServer } from 'inversify-express-utils'


console.log("Express TS Server booting ...")

// Read Env config from .env file
dotenv.config()

// Express App
const app = express()
const container = new Container()

// Register providers
registerControllers(app, container)
registerServices(app, container)
registerProviders(app, container)


// Start server
function handle(app: express.Application) 
{
    const port = process.env.PORT || 3001
    app.listen(port, () => {
        console.log(`Express.TS server running at http://localhost:${port}`)
    })
}

// Auto register controllers
function registerControllers(app: express.Application, container: Container)
{
    let controllers = readAllFiles(__dirname + '/controllers', '/**/*.controller.ts')
    controllers.forEach((controller) => {
        require(controller)
    })
    
}

// Auto register injectable services
function registerServices(app: express.Application, container: Container) {
    let services = readAllFiles(__dirname + '/services', '/**/*.service.ts')
    services.forEach((service) => {
        const injectable = require(service)
        const name = _.keys(injectable)[0]
        container.bind(name).to(injectable[name]);
    })
}

// Register providers
async function registerProviders(app: express.Application, container: Container) 
{
    for(const provider in providers) {
        await providers[provider].register(app, container)
    }
    providersRegistered(app)
}

// Providers register callback
function providersRegistered(app: express.Application) 
{
    let router = express.Router({
        caseSensitive: false,
        mergeParams: true,
        strict: false
    });
    const server = new InversifyExpressServer(container, router, null, app);
    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({
          extended: true
        }));
        app.use(bodyParser.json());
      })
    const inversifyApp = server.build()
    handle(inversifyApp)
}

// Read all files in directory matching glob expression
function readAllFiles(dir: string, extension = '/**/*') : Array<string> 
{
    const glob = require("glob");
    return glob.sync(dir + extension)
}