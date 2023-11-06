import { useState } from 'react';
import { FaPaperclip, FaPhotoVideo, FaRegPaperPlane } from 'react-icons/fa';
// import { ChatIcon, PhotographIcon, PaperClipIcon } from '@heroicons/react/outline';

const ChatInputField = () => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSendMessage = () => { 
    // Implement your logic to send the message
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSendContent = () => {
    if (message) {
      handleSendMessage();
    } else if (selectedImage) {
      // Implement your logic to send the selected image
      console.log('Sending image:', selectedImage);
      setSelectedImage(null);
    } else if (selectedFile) {
      // Implement your logic to send the selected file
      console.log('Sending file:', selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex items-center  p-2 ">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="focus:outline-none w-[680px] p-3 border-2 border-gray-300 rounded-full focus:border-blue-500"
      />
     <div className="absolute right-72 mr-32  flex items-center">
     <label htmlFor="image-upload" className="ml-2">
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
       <FaPhotoVideo className="h-5 w-5 text-gray-500 hover:text-gray-600 cursor-pointer" /> 
      </label>
      <label htmlFor="file-upload" className="ml-2">
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
         <FaPaperclip className="h-5 w-5 text-gray-500 hover:text-gray-600 cursor-pointer" /> 
      </label>
      <button
        onClick={handleSendContent}
        disabled={!message && !selectedImage && !selectedFile}
        className={`ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 focus:outline-none ${
          (!message && !selectedImage && !selectedFile) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <FaRegPaperPlane className="h-5 w-5" /> 
      </button>
     </div>
    </div>
  );
};

export default ChatInputField;

