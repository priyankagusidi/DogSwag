import ChatBox from './chatbox'

 const Chatpage = ({userdata}) => {
  // const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div>
    <ChatBox userdata={userdata}/>
    </div>
  );
};

export default Chatpage;

