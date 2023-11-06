import {useRef,useState} from 'react'
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File to the _app.js
import plugins from 'suneditor/src/plugins'
import wordCount from 'word-counting'
import axios from 'axios'
import { blobToURL, fromBlob } from 'image-resize-compress';
const Sun = dynamic(() => import('suneditor-react').then((m) => m.default), {
  ssr: false,
});



export default function Editor({setOpenWriteModal,setSignModal,setContent,setWordLength,wordLength,defaultValue,userdata,setOpenCreateProfile}){


console.log(userdata)
function handleChange(html){
  if(!userdata.user){
  	setSignModal(true)
  	return
  }

  if(userdata && userdata.user && !userdata.user.hascreatedprofile){
  	// setOpenWriteModal(true)
  	setOpenCreateProfile(true)
  	return
  }
  	  setContent(html)
	  const count = wordCount(html, { isHtml: true }).wordsCount
	  setWordLength(count)
	  return count
}


function handleImageUploadBefore(files, info, uploadHandler){
console.log(info)
console.log(uploadHandler)
     const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://dogswag.onrender.com" }`

     		const quality = 5;
        const width = 0;
        const height = 0;
        const format = 'webp';
	
		// console.log(e.target.files[0])

     const formData = new FormData();

	
 

      try {

      		 fromBlob(files[0], quality, width, height, format).then((blob) => {
           
           formData.append("image", blob)
   
            axios.post("/uploadphoto", formData,{
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }).then(response=>{
            	console.log(response.data)

            	const fileData = [{
            		url:response.data,
            	}]
            	uploadHandler({result:fileData})
            })
               });
        }
        catch(err){
        	console.log(err)
        }
}


function handlePaste(e, cleanData, maxCharCount, core){
	    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        document.execCommand('insertText', false, bufferText);
}



return <Sun
                  defaultValue={defaultValue}
                  onImageUploadBefore={handleImageUploadBefore}
                  onPaste={handlePaste}
                  onChange={handleChange}
	              setOptions={{
				    height : 'auto',
                    minHeight : '800px',
                    "mode": "balloon-always",
				    plugins:plugins,
				    defaultStyle:"font-size: 18px;",
				    showPathLabel :true,
				    placeholder:"Write here",
				    "previewTemplate": "<div style='width:auto; max-width:1000px; margin:auto;'>    <h1>Preview Template</h1>     {{contents}}     <div>_Footer_</div></div>",
				    imageAlignShow:true,
					buttonList: [ 
						            [
						            	':e-More Line-default.more_horizontal',
										// "font",
										"fontSize",
										"formatBlock",
										"align",
										"list",
										"blockquote",

									],
									[
										"undo",
										"redo",
										"preview",
									],
									[
										'-right',
										':r-More Rich-default.more_plus',
										"bold",
										"underline",
										"italic",
										"strike",
										"fontColor",
										"hiliteColor",
										"removeFormat",
										"lineHeight",
										"table",
										"link",
										"image",
			                            "video",
			                         ],
                                ]
		          }}
	        />
	        
}