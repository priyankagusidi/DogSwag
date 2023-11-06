import moment from 'moment';
import { blobToURL, fromBlob } from 'image-resize-compress';
import {Modal} from '@mantine/core'
import {useState} from 'react'

export default function Messages({ observerRef,m_loading,chatWindowRef,mediaLoading,setPic,selectedImage,setSelectedImage,session,isActive,senderProfilePic, messages, userdata, newMessage, setNewMessage, sendMessage, handleTextChange }) {
  console.log(userdata);

  const [expandImage,setExpandImage] = useState(false)
  const [expandedImage,setExpandedImage] = useState("")
  const [mediaType,setMediaType] = useState("")
  const [type,setType] = useState("")

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
 console.log(selectedImage)







  return (
    <div className="flex flex-col  rounded-lg p-4 w-full h-[550px]">
      {/* Chat messages */}
      <div ref={chatWindowRef} className="flex-grow w-full overflow-y-auto">
        <div className="flex flex-col w-full gap-4">
          {/* Render chat messages here */} 
          {messages &&
            messages.map((c, i) => {
              const isUserMessage = userdata?.user?._id === c.sender._id;
              const messageClass = isUserMessage ? 'flex justify-end' : 'flex justify-start';

              return (
                <div key={i} className={`flex gap-2 ${messageClass}`}>
                  {!isUserMessage && <img src={senderProfilePic} className="w-5 h-5 object-cover rounded-full" />}
                  {
                    c.type==="text" ?
                    <span className={` px-2 py-1 rounded-lg text-sm ${isUserMessage ? 'ml-2 bg-purple-500 text-white' : 'mr-2 bg-gray-200'}`}>
                      {c.content}
                    </span>:
                    c.type === "image" ?
                    <img onClick={()=>handleImageModal(c.content,c.type)} src={c.content} className={`rounded-lg text-sm w-28 rounded-lg border h-40 object-cover ${isUserMessage ? 'ml-2' : 'mr-2'}`}/>
                    :
                    c.type === "video" ?
                    <div onClick={()=>handleImageModal(c.content,c.type)} className="relative flex items-center justify-center">
                    <video  src={c.content} className={`rounded-lg text-sm w-28 rounded-lg brightness-50 border h-40 object-cover ${isUserMessage ? 'ml-2' : 'mr-2'}`}/>
                    <img src="/play.svg" className="absolute w-5 h-5 cursor-pointer"/>
                    </div>
                    :
                    <></> 
                  }
                                    
                    <div className={`${isUserMessage ? 'mx-0' : 'my-0'} text-[.6em]`}>{moment(c.createdAt).format("HH:mm")}</div>
                </div>
              );
            })}

          {m_loading && <div>Loading...</div>}
        <div ref={observerRef} style={{ height: 10 }}></div>
          {/* End of chat messages */}
        </div>
       
      </div>

      {/* Chat input */}
      <div className="flex gap-2 mt-2 relative">
         <div className="flex justify-center  absolute -top-28 right-24">
          {
            selectedImage ? 
            <div className="relative flex justify-center items-center">
{
               type == "image"?
               <img src={selectedImage} className="w-24 h-24 object-cover bg-gray-300 shadow-xl rounded-lg p-2"/>
              : 
               <video src={selectedImage} className="w-24 h-24 object-cover bg-gray-300 shadow-xl rounded-lg p-2"/>
}
               <img src="/assets/icons/cross.svg" onClick={removeImage} className="w-2 h-2 -right-2 -top-2 cursor-pointer absolute invert"/>
              {
                mediaLoading ?
                <img src="/gif/spinner.svg" className="w-10 h-10 absolute invert"/>
                :
                <></>
              }
            </div>
            : 
            <></>
          }
        </div>

        <div className="relative w-full">
        <input
          value={newMessage}
          onChange={(e) => handleTextChange(e)}
          type="text"
          className="flex-grow p-4 rounded-full border-2 border-gray-300 w-full"
          placeholder="Type your message..."
        />
        <input id="chat_medias"  type="file" onChange={onSelectedFile} className="hidden" />
       <label htmlFor="chat_medias"className="flex justify-center absolute right-16 top-5 gap-4">
        <img src="/attachment.svg" className="w-5 h-5"/>  
       </label>

       <label htmlFor=""className="flex justify-center absolute right-9 top-5 gap-4">
        <img src="/imageupload.svg" className="w-5 h-5"/>  
       </label>

       <label htmlFor=""className="flex justify-center absolute right-2 top-5 gap-4">
        <img onClick={sendMessage} src="/send.svg" className="w-5 h-5"/>                              
       </label>

        </div>
        {/*<button disabled={!session} onClick={sendMessage} className={`px-4 py-2  text-white rounded-lg ${session?"bg-blue-500":"bg-red-300"}`}>
          Send
        </button>*/}
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
