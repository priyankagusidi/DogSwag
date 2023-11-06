import Bio from "./bio"
import PreviousPosts from "./previousposts"
import QuickLinks from "./quicklinks"
import TaskMonth from "./taskmonth"
import Dog from './dog'
const Profilee = ({dogdata,videodata}) => {
    return (
        <div className="mx-auto font-Inter bg-white  w-full h-full">
            <Dog dogdata={dogdata}/>
            <TaskMonth></TaskMonth>
            <QuickLinks></QuickLinks>
            <PreviousPosts videodata={videodata}></PreviousPosts>
        </div>
    )
}

export default Profilee