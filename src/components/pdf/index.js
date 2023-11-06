import { Modal } from '@mantine/core';
import React, { useState,useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button, Overlay, Image, AspectRatio } from '@mantine/core';
const data = [
  {
   name:"Some medicine name",
   noofdrugs:1,
   nooftimes:3,
   noofdays:10,
   mealtime:'After meal'
  },
]
function PdfEditor({prescriptions,openPdf,setOpenPdf,dignostics}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [modifiedPdfBlob, setModifiedPdfBlob] = useState(null);
  const [instructions,setInstructions] = useState(prescriptions)
  const [canvasLoaded,setConvasLoaded] = useState(false)
  const [visible, setVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showOpen,setShowOpen] = useState(false)

  const toggleOverlay = () => {
    setShowOverlay(false);
  };

  const handleDocumentLoadSuccess = (props) => {
    console.log(props)
    setNumPages(props.numPages);
    setShowOpen(true)
  };

  const handleAddText = () => {
    setShowOverlay(false)
    const canvas = document.getElementsByTagName('canvas')[0]

 

    const context = canvas.getContext('2d');

    context.font = `${canvas.height * 0.010}px Arial`;
    context.fillStyle = 'black';
    context.fillText('Bruno',canvas.width *0.150 ,canvas.height * 0.309);
    context.fillText('Male', canvas.width *0.650, canvas.height * 0.309);
    context.fillText('1 year', canvas.width *0.850, canvas.height * 0.309);
    context.fillText('German shepherd', canvas.width * 0.150, canvas.height * 0.347);
    context.fillText('15 kg', canvas.width * 0.650, canvas.height *  0.347);
    context.fillText('20303', canvas.width * 0.850, canvas.height *  0.347);
    context.fillText('21 Oct 2023', canvas.width * 0.780, canvas.height * 0.380);
    context.fillText("Allergy : "+dignostics, canvas.width * 0.400, canvas.height * 0.410);
    context.fillText("This is an online prescription without physical examination of the pet.To be used by owner upon his descretion", canvas.width * 0.100, canvas.height * 0.990);


    context.font =  `${canvas.height * 0.012}px Arial`;

  const startY = 0;

  let y = startY;
  for (const instruction of instructions) {
    
    context.fillText(instruction.name, canvas.width * 0.250, canvas.height * 0.480 +y );
    context.fillText("X "+instruction.noofdrug, canvas.width * 0.450, canvas.height * 0.480 +y  );
    context.fillText(instruction.nooftime+" Times", canvas.width * 0.550,canvas.height * 0.480 +y );
    context.fillText(instruction.noofdays+" Days", canvas.width * 0.650,canvas.height * 0.480 +y );
    context.fillText(instruction.meal, canvas.width * 0.800, canvas.height * 0.480 +y );

    y += 20; // Increment the y-coordinate by 20 for the next line
  }


  const canvasDataUrl = canvas.toDataURL('image/jpeg'); // Convert the canvas to a data URL
  const blob = dataURLtoBlob(canvasDataUrl); // Convert the data URL to a Blob
  setModifiedPdfBlob(blob); // Store the modified PDF Blob in the state

  };

  function dataURLtoBlob(dataURL) {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}


function handleDownload() {
  if (modifiedPdfBlob) {
    const blobUrl = URL.createObjectURL(modifiedPdfBlob);

    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'modified-pdf.jpg'; // Specify the filename for the downloaded PDF

    // Trigger a click event on the anchor element
    a.click();

    // Clean up by revoking the Blob URL
    URL.revokeObjectURL(blobUrl);
  }
}

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  return (
    <Modal
      opened={openPdf}
      onClose={()=>{setOpenPdf(false),setShowOverlay(true),setShowOpen(true)}}
      size={"sm"}  
      centered  
    >

<div className="relative">
      {/* <div className={`w-full h-full ${showOverlay ? 'block' : 'hidden'} `}> */}
        {/* Image behind the overlay */}
        <Document
          file="/bph.pdf" // Replace with the path to your PDF file
          onLoadSuccess={handleDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>

        <div className='flex justify-center my-2'>
          <button onClick={handleDownload} className='p-2 bg-amber-300 rounded-lg'>Download</button>
        </div>


      {showOpen && showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-80 bg-gray-900 flex items-center justify-center z-10">
          {/* Blur Overlay */}
          <div className="w-full h-full backdrop-blur-md absolute top-0 left-0 flex items-center justify-center">
            <button
              onClick={handleAddText}
              className="bg-white text-black px-4 py-2 rounded-lg " // Increase z-index
            >
              Open prescription
            </button>
          </div>
        </div>
      )}
    </div>
      {/* <div className='flex flex-col items-center z-10' >
   
        <Document
            file="/bph.pdf" // Replace with the path to your PDF file
            onLoadSuccess={handleDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
      {!visible && (
        <Overlay onClick={handleAddText} blur={15} center >
          <button className="p-2 text-sm bg-amber-800  mr-5 rounded-xl  " >
             Click to show medicines
          </button>
        </Overlay>
      )}
         
      
    

     
      </div> */}
    </Modal>
  );
}

export default PdfEditor;
