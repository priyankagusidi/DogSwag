import moment from 'moment';
import { blobToURL, fromBlob } from 'image-resize-compress';
import {Modal} from '@mantine/core'
import {useState} from 'react'

export default function Messages({ setPic,selectedImage,setSelectedImage,session,isActive,senderProfilePic, messages, userdata, newMessage, setNewMessage, sendMessage, handleTextChange }) {
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

  // // Check file size
  // if (file.size > maxSize) {
  //   return alert("File size can't exceed 1MB");
  // }

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
    <div className="flex flex-col bg-gray-100 rounded-lg p-4 w-full h-[600px]">
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col gap-4">
          {/* Render chat messages here */} 
          {messages &&
            messages.map((c, i) => {
              const isUserMessage = userdata?.user?._id === c.sender._id;
              const messageClass = isUserMessage ? 'flex justify-end' : 'flex justify-start';

              return (
                <div key={i} className={`flex items-center gap-2 ${messageClass}`}>
                  {!isUserMessage && <img src={senderProfilePic} className="w-5 h-5 object-cover rounded-full" />}
                  {
                    c.type==="text" ?
                    <span className={`bg-gray-200 px-2 py-1 rounded-lg text-sm ${isUserMessage ? 'ml-2' : 'mr-2'}`}>
                      {c.content}
                    </span>:
                    c.type === "image" ?
                    <img onClick={()=>handleImageModal(c.content,c.type)} src={c.content} className={`px-2 py-1 rounded-lg text-sm w-24 h-24 object-cover ${isUserMessage ? 'ml-2' : 'mr-2'}`}/>
                    :
                    c.type === "video" ?
                    <video onClick={()=>handleImageModal(c.content,c.type)} src={c.content} className={`px-2 py-1 rounded-lg text-sm w-24 h-24 object-cover ${isUserMessage ? 'ml-2' : 'mr-2'}`}/>
                    :
                    <></> 
                  }
                  
                  {isUserMessage && (
                    <img src={userdata?.user?.profilePic} className="w-5 h-5 object-cover rounded-full" />
                  )}
                                   
                    <div className={`${isUserMessage ? 'mx-0' : 'my-0'} text-[.6em]`}>{moment(c.createdAt).format("HH:mm")}</div>
                </div>
              );
            })}

          {userdata?.user?.isDoctor && !session ? (
            <div className="p-2 flex gap-4 justify-center">
              <button className="px-2 py-1 rounded-lg bg-gray-300">free</button>
              <button className="px-2 py-1 rounded-lg bg-green-500">Paid</button>
            </div>
          ) : 
          <></>
          }
          {/* End of chat messages */}
        </div>
       
      </div>

      {/* Chat input */}
      <div className="flex gap-2 mt-2 relative">
         <div className="flex justify-center  absolute -top-28 right-24">
          {
            selectedImage ? 
            <div className="relative">
{
               type == "image"?
               <img src={selectedImage} className="w-24 h-24 object-cover bg-gray-300 shadow-xl rounded-lg p-2"/>
              : 
               <video src={selectedImage} className="w-24 h-24 object-cover bg-gray-300 shadow-xl rounded-lg p-2"/>
}
               <img src="/assets/icons/cross.svg" onClick={removeImage} className="w-2 h-2 right-2 top-2 cursor-pointer absolute"/>
            </div>
            : 
            <></>
          }
        </div>

        <div className="relative">
        <input
          value={newMessage}
          onChange={(e) => handleTextChange(e)}
          type="text"
          className="flex-grow p-2 rounded-lg border border-gray-300"
          placeholder="Type your message..."
        />
        <input id="chat_medias"  type="file" onChange={onSelectedFile} className="hidden" />
       <label htmlFor="chat_medias"className="flex justify-center absolute right-2 top-2">
        <img src="/assets/icons/attachment.svg" className="w-7 h-7"/>         
       </label>
        </div>
        <button disabled={!session} onClick={sendMessage} className={`px-4 py-2  text-white rounded-lg ${session?"bg-blue-500":"bg-red-300"}`}>
          Send
        </button>
      </div>
      <Modal
                  opened={expandImage}
                  onClose={() => setExpandImage(false)}
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
