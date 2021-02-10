import { controller } from "inversify-express-utils";
import { BaseController } from "../base.controller";

@controller('/mongo')
export class MongoController extends BaseController
{
    
}