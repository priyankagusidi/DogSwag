import FirstSection from './1.js'
import SecSection from './2.js'
import Third from './3.js'
import Four from './4.js'
import Five from './5.js'

export default function Index(){
    return(
          <div className="bg-white">
           <FirstSection/>
           <SecSection/>
           <Four/>           
           <Third/>
           <Five/>
          </div>
        )
}