import { Application } from 'express'
import { Container } from 'inversify';

export interface Provider {
    register(app: Application, container: Container) : void
}