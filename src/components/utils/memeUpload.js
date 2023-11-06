import { useState, useEffect } from 'react';
import { fromBlob } from 'image-resize-compress';
import {useRouter} from 'next/router'


function ProfilePicture({setSelectedVideo ,setSelectedImage,userdata, setIsMemeModalOpen, setPic, setContainer, container, pic, selectedImage }) {
  const [left, setLeft] = useState(4);
  const router = useRouter()

  useEffect(() => {
    const maxLength = 4;
    setLeft(maxLength - container.length);

    const selectedArray = Array.from(container);
    const imageArray = selectedArray.map((file) => {
      if (file.size > maxSize) {
        return null;
      }
      return URL.createObjectURL(file);
    });

    const blob = container.map((m, i) => {
      return fromBlob(m, quality, width, height, format);
    });

    Promise.all(blob).then((blobs) => {
      setPic(blobs);
    });

    setSelectedImage(imageArray);
    setSelectedVideo(null)
  }, [container, setSelectedImage, setPic]);

  function onSelectedFile(e) {

    if (e.target.files.length < 1) {
      console.log('error less than 1 image');
      return;
    }
    if (e.target.files.length > left) {
      console.log('error more than 4 image');
      return;
    }
    setContainer([...container, ...e.target.files]);
  }

  const maxSize = 1024 * 1024;
  const quality = 5;
  const width = 0;
  const height = 0;
  const format = 'webp';


  console.log(pic)

  return (
    <div className="flex justify-center h-20 items-center">
      <div className="">
        <input id="coverPictures" accept="image/*" type="file" multiple onChange={onSelectedFile} className="hidden" />
        <label htmlFor="coverPictures" className="cursor-pointer">
          <img src="/assets/icons/square-plus.svg" className="w-10 h-10 bg-[white] rounded-lg invert" />
        </label>
      </div>
    </div>
  );
}

export default ProfilePicture;
