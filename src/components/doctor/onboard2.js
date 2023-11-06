import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { blobToURL, fromBlob } from 'image-resize-compress';
import AvatarEditor from 'react-avatar-editor';
import { Modal , Stepper} from '@mantine/core';
// import { Stepper, Step, h3 } from '@m';

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [educationText, setEducationText] = useState('');
  const [educationList, setEducationList] = useState([
    "Doctor of Veterinary Medicine (DVM): University of Veterinary Sciences 2010",
    "Certification in Advanced Small Animal Surgery, 2012",
  ]);
  const [profilePic, setProfilePic] = useState(null);
  const router = useRouter();
  const [resizer, setResizer] = useState(false);
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [info, setInfo] = useState({
    fullName: 'Dr. DogSwag',
    city: 'bangalore',
    country: 'india',
    experience: '8',
    location: 'Bangalore Hospital',
    availTimeStart: '08:00',
    availTimeEnd: '11:00',
    profSummary: 'I am a highly skilled and compassionate veterinarian with 10 years of experience in providing exceptional care to animals. My expertise lies in diagnosing and treating a diverse range of medical conditions, performing surgeries, and delivering preventive care to ensure the well-being of both companion animals and livestock. I am passionate about animal welfare and committed to delivering the highest standard of veterinary medicine.',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [pic, setPic] = useState('');

  async function handleAgree() {
    if (!info.profSummary || !educationList.length) {
      alert('Fill required input!');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', info.fullName);
    formData.append('city', info.city);
    formData.append('country', info.country);
    formData.append('experience', info.experience);
    formData.append('location', info.location);
    formData.append('availTimeStart', info.availTimeStart);
    formData.append('availTimeEnd', info.availTimeEnd);
    formData.append('profSummary', info.profSummary);
    formData.append('education', JSON.stringify(educationList));
    formData.append('profilePic', pic);

    try {
      await axios.post('/api/doctor/create', formData).then((res) => {
        console.log(res.data);
        router.push('/doctor/profile');
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(URL.createObjectURL(selectedFile));
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const handleCrop = () => {
    setResizer(false);
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const quality = 5;
        const width = 0;
        const height = 0;
        const format = 'webp';

        fromBlob(blob, quality, width, height, format).then((processedBlob) => {
          console.log(processedBlob);
          setSelectedImage(URL.createObjectURL(processedBlob));
          setPic(blob);
        });
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(info);
    handleAgree();
  };

  const handleNext = () => {
    if (activeStep === 1) {
      if (!pic) {
        alert('Profile pic Required');
        return;
      }
      if (!info.fullName || !info.city || !info.country) {
        alert('Fill required input!');
        return;
      }
    }

    if (activeStep === 2) {
      if (!info.experience || !info.location) {
        alert('Fill required input!');
        return;
      }
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleEducationChange = (e) => {
    setEducationText(e.target.value);
  };

  const AddEducation = () => {
    setEducationList([...educationList, educationText]);
  };

  const handleProfilePic = (e) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files);
    setProfilePic(e.target.files[0]);
  };

  function onSelectedFile(e) {
    const maxSize = 1024 * 1024;

    const selectedArray = Array.from(e.target.files);

    const imageArray = selectedArray.map((file) => {
      return URL.createObjectURL(file);
    });

    const quality = 5;
    const width = 0;
    const height = 0;
    const format = 'webp';

    fromBlob(e.target.files[0], quality, width, height, format).then((blob) => {
      console.log(blob);
      setPic(blob);
    });

    setSelectedImage(imageArray[0]);
  };

  function deleteExp(index) {
    const del = educationList.filter((e, i) => i !== index);
    setEducationList(del);
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-lg h-fit mt-16 font-Inter text-gray-600">
      <form onSubmit={handleSubmit} className="w-full">
        <Stepper activeStep={activeStep}>
          <Stepper.Step>
            <h3>Profile</h3>
            <div className="w-full">
              <label htmlFor="profilePic" className="block mb-2">
                Profile Picture:
              </label>
              <div onClick={() => setResizer(true)} className="flex justify-center">
                <span className="relative">
                  <label htmlFor="profilePicture" className="flex h-24 absolute w-full justify-center items-center hover:opacity-50 cursor-pointer">
                    <img src="/assets/icons/mode-portrait.svg" className="w-4 h-4" />
                  </label>
                  <img className="h-24 w-24 rounded-full object-cover  border border-gray-200 bg-gray-100" src={selectedImage || "/img/defaultprofile.jpg"} />
                </span>
              </div>
              <label htmlFor="name" className="block mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="fullName"
                value={info.fullName}
                               onChange={handleChange}
                required
                className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
              />

              <label htmlFor="location" className="block mb-2">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={info.city}
                onChange={handleChange}
                required
                className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
              />
              <label htmlFor="location" className="block mb-2">
                Country:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={info.country}
                onChange={handleChange}
                required
                className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
              />
            </div>
          </Stepper.Step>

          <Stepper.Step>
            <h3>Details</h3>
            <div className="w-full">
              <label htmlFor="experience" className="block mb-2">
                Experience:
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={info.experience}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
              />

              <label htmlFor="location" className="block mb-2">
                Clinic Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={info.location}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
              />

              <label htmlFor="availTimeStart" className="block mb-2">
                Available Time:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  id="availTimeStart"
                  name="availTimeStart"
                  value={info.availTimeStart}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
                />
                <input
                  type="time"
                  id="availTimeEnd"
                  name="availTimeEnd"
                  value={info.availTimeEnd}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
                />
              </div>
            </div>
          </Stepper.Step>

          <Stepper.Step>
            <h3>Profession Experience & Education</h3>
            <div>
              <label htmlFor="profSummary" className="block mb-2">
                Profession Experience:
              </label>
              <textarea
                type="text"
                id="profSummary"
                name="profSummary"
                value={info.profSummary}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4 h-40"
              />

              <label htmlFor="profSummary" className="block mb-2">
                Education:
              </label>
              <div className="flex gap-1">
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={info.education}
                  onChange={handleEducationChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-10/12"
                />
                <button className="p-2 bg-[#FFCB07] w-2/12 rounded-md" onClick={AddEducation}>
                  Add
                </button>
              </div>
              <ul className="p-2 flex flex-col gap-2">
                {educationList.map((e, i) => {
                  return (
                    <li key={i} className="rounded-xl text-start items-center relative p-1 flex gap-2  bg-white">
                      <div className="w-11/12 p-1">{e}</div>
                      <div
                        onClick={() => deleteExp(i)}
                        className="w-1/12 flex justify-center absolute bg-red-500 right-0 p-2 cursor-pointer"
                      >
                        <img src={"/assets/icons/cross.svg"} className="w-4" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Stepper.Step>
        </Stepper>

        <div className="mt-6 flex justify-between">
          {activeStep > 0 && (
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
              onClick={handlePrev}
            >
              Previous
            </button>
          )}

          {activeStep < 2 && (
            <button
              type="button"
              className="bg-[#FFCB07] hover:opacity-80 text-white py-2 px-4 rounded ml-4"
              onClick={handleNext}
            >
              Next
            </button>
          )}

          {activeStep === 2 && (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ml-4"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      <Modal opened={resizer} onClose={() => setResizer(false)}>
        <div className="flex flex-col gap-5">
          <input type="file" onChange={handleFileChange} />
          {image && (
            <div className="flex flex-col gap-2">
              <AvatarEditor
                ref={(editorRef) => setEditor(editorRef)}
                image={image}
                width={250}
                height={250}
                border={50}
                scale={scale}
              />
              <div className="flex gap-2 items-center text-sm">
                <label>Zoom</label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.01"
                  value={scale}
                  onChange={handleScaleChange}
                />
              </div>
              <button className="p-2 bg-yellow-500 rounded-xl" onClick={handleCrop}>
                Crop & Upload
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MultiStepForm;