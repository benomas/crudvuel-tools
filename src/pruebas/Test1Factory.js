import FactoryMaker from '../FactoryMaker'
import Test1        from './Test1'
import Test2        from './Test2'
import Test3        from './Test3'

export default class Test1Factory extends FactoryMaker{
  build(options=[]){
    return new Test1(new Test2(),new Test3(options))
  }
}
