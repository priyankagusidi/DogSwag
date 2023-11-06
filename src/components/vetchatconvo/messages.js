import moment from 'moment';
import { blobToURL, fromBlob } from 'image-resize-compress';
import {Modal} from '@mantine/core'
import {useState,useEffect} from 'react'
import TimeBar from './TimeBar2';
export default function Messages({inputHeight, setInputHeight,inputsRef,formatTime,time, isTyping,sendM,chatWindowRef,mediaLoading,setPic,selectedImage,setSelectedImage,session,isActive,senderProfilePic, messages, userdata, newMessage, setNewMessage, sendMessage, handleTextChange }) {

  const [expandImage,setExpandImage] = useState(false)
  const [expandedImage,setExpandedImage] = useState("")
  const [mediaType,setMediaType] = useState("")
  const [type,setType] = useState("")
  const [width,setWidth] = useState(400)


function onSelectedFile(e) {
  const file = e.target.files[0];
  const maxSize = 1024 * 1024;

  if (!file) {
    return;
  }



  const fileURL = URL.createObjectURL(file);

  // Call appropriate function based on file type
  if (file.type.includes("image")) {
    processImage(file, fileURL);
  } else if (file.type.includes("video")) {
    processVideo(file, fileURL);
  }
}

function processImage(file, fileURL) {
  const quality = 5;
  const width = 0;
  const height = 0;
  const format = 'webp';

  setType("image")
  setPic(file)
  setSelectedImage(fileURL);

}

function processVideo(file, fileURL) {
  // Process video here or perform any necessary operations
  setType("video")
  setPic(file)
  setSelectedImage(fileURL);

}


  function handleImageModal(image,type){
    setMediaType(type)
    setExpandedImage(image)
    setExpandImage(true)
  }

  function removeImage(argument) {
    setSelectedImage(null)
    setPic(null)
  }


useEffect(() => {
    // When the component mounts or when the 'time' prop changes, update the progress bar width
    const Width = chatWindowRef.current.offsetWidth;
    setWidth(Width)
}, []);
 // const handleObserver = (entries) => {
 //    const target = entries[0];
 //    if (target.isIntersecting && !loading && hasMore) {
 //      // Load more messages
 //      observerRef.current.disconnect();
 //      fetchMessages();
 //    }
 //  };

 //  useEffect(() => {
 //    const observer = new IntersectionObserver(handleObserver, {
 //      root: null,
 //      rootMargin: "0px",
 //      threshold: 1.0,
 //    });

 //    if (observerRef.current) {
 //      observer.observe(observerRef.current);
 //    }

 //    return () => observer.disconnect();
 //  }, [loading, hasMore]);

  return (
    <div className="flex flex-col rounded-lg p-4 h-[80vh] w-full">
      {/* Chat messages */}
     <div className="lg:hidden absolute top-10"> 
    <TimeBar width={width} time={time}/><div className="text-center w-full -mt-5">{formatTime(time)}</div>
    </div>
      <div ref={chatWindowRef} className="flex-grow w-full overflow-y-auto">
        <div className="flex flex-col w-full gap-4">
          {/* Render chat messages here */} 
          {messages &&
            messages.map((c, i) => {
              const isUserMessage = userdata?.user?._id === c.sender._id;
              const messageClass = isUserMessage ? 'flex justify-end' : 'flex justify-start';

              return (
                <div key={c?._id} className={`flex gap-2 ${messageClass}`}>
                  {
                    c?.type==="text" ?
                    <span className={` px-2 py-1 rounded-lg  whitespace-pre-wrap text-sm ${isUserMessage ? 'ml-2 bg-purple-500 text-white' : 'mr-2 bg-gray-200'}`}>
                      {c.content}
                    </span>:
                    c?.type === "image" ?
                    <img onClick={()=>handleImageModal(c?.content,c?.type)} src={c?.content} className={`rounded-lg text-sm w-28 rounded-lg border h-40 object-cover ${isUserMessage ? 'ml-2' : 'mr-2'}`}/>
                    :
                    c?.type === "video" ?
                    <div onClick={()=>handleImageModal(c?.content,c.type)} className="relative flex items-center justify-center">
                    <video  src={c?.content} className={`rounded-lg text-sm w-28 rounded-lg brightness-50 border h-40 object-cover ${isUserMessage ? 'ml-2' : 'mr-2'}`}/>
                    <img src="/play.svg" className="absolute w-5 h-5 cursor-pointer"/>
                    </div>
                    :
                    <></> 
                  }              
                    <div className={`${isUserMessage ? 'mx-0' : 'my-0'} text-[.6em]`}>{moment(c.createdAt).format("HH:mm")}</div>

                </div>
              );
            })
          }

         
          {/* End of chat messages */}
        </div>
       
      </div>
      <span className="p-2 text-gray-500 absolute bottom-28 bg-white">{
        isTyping?
        <div className="flex gap-2 items-center">
        typing...
        {/*<img src="/gif/spinner.svg" className="w-10 h-10"/> */}
        </div >
        :
        <></>
      }</span>
      {/* Chat input */}
      <div className="flex gap-2 mt-2 relative">
         <div className="flex justify-center  absolute bottom-10 left-24">
          {
            selectedImage ? 
            <div className="relative flex justify-center items-center">
{
               type == "image"?
               <img src={selectedImage} className="w-24 h-24 object-cover bg-gray-300 shadow-xl rounded-lg p-2 "/>
              : 
              <video src={selectedImage} className="w-24 h-24 object-cover bg-gray-300 shadow-xl rounded-lg p-2"/>

}
               <img src="/assets/icons/cross.svg" onClick={removeImage} className="w-2 h-2 -right-2 -top-2 cursor-pointer absolute invert"/>
              {
                mediaLoading ?
                <img src="/gif/spinner.svg" className="w-10 h-10 absolute mix-blend-darken"/>
                :
                <button onClick={sendM} className="absolute cursor-pointer">
                  <img src="/send.svg" className="w-5 h-5 hover::opacity-80 " />
                </button>
              }
            </div>
            : 
            <></>
          }
        </div>

 <form onSubmit={sendM} className="w-full relative">
            <textarea
                ref={inputsRef}
                value={newMessage}
                onChange={(e) => handleTextChange(e)}
                style={{ height: inputHeight }}
                className="flex-grow p-4 rounded-lg border-2  border-gray-300 w-full overflow-auto resize-none"
                placeholder="Type your message..."
            />
            <input
                id="chat_medias"
                type="file"
                onChange={onSelectedFile}
                className="hidden"
            />
            <label
                htmlFor="chat_medias"
                className="flex justify-center absolute right-12 bottom-5 cursor-pointer"
            >
                <img src="/attachment.svg" className="w-5 h-5" alt="Attachment" />
            </label>
            <button
                type="submit"
                className="absolute right-5 bottom-5 cursor-pointer"
            >
                <img src="/send.svg" className="w-5 h-5" alt="Send" />
            </button>
        </form>
        
      </div>


       

      <Modal
                  opened={expandImage}
                  onClose={() => setExpandImage(false)}
                  style={{backgroundColor:'transparent', backdropFilter: 'blur(10px)',b:'0'}}

        >
        <div className="flex justify-center">
{
          mediaType === "image"?
         <img src={expandedImage} className="w-96 h-96 object-contain"/>
         :
         <video src={expandedImage} className="w-96 h-96 object-contain" controls/>

}
        </div>
      </Modal>
    </div>
  );
}
