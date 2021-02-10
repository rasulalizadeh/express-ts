import {ExpressVueProvider} from '../providers/express-vue.provider'
import {Provider} from '../providers/provider.interface'
import { TypeORMProvider } from '../providers/type-orm.provider'

export default [
    new ExpressVueProvider(),
    new TypeORMProvider()
] as Array<Provider>