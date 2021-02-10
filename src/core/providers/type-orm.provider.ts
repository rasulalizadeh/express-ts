import { Application } from "express";
import { Container } from "inversify";
import { Provider } from "./provider.interface"
import { Connection, createConnection } from 'typeorm'

export class TypeORMProvider implements Provider
{    
    async register(app: Application, container: Container) 
    {
        const connection = await createConnection()
        container.bind<Connection>('db').toConstantValue(connection)
    }
}