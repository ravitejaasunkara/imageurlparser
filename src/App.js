import { useState } from 'react';
import './App.css';
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageParsed, setImageParsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disbaleButton,setDisableButton] = useState(true);
  const REACT_APP_CLOUDINARY_CLOUD_NAME = 'dolzys14a';
  const REACT_APP_CLOUDINARY_API_KEY = '735336388527852';
  const REACT_APP_CLOUDINARY_API_SECRET = 'HZEbnHAfHrDB6PnKUjPnzLcuaic';
  const REACT_APP_CLOUDINARY_UPLOAD_PRESET = 'react_images';

  const getCloudinaryUrlForImage = async (event) => {
    setIsLoading(true);
    const file = await event?.target?.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data
      });
      const res = await response.json();
      const secureUrl = res?.secure_url;
      setImageUrl(secureUrl);
      setImageParsed(true);
      setIsLoading(false);
      setDisableButton(false);
    } catch (err) {
      console.log(err);
    }
  }
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(imageUrl)
      .then(() => {
        toast.success("Copied to clipboard.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="App">
        <div className='h-16 w-full shadow-lg flex justify-center items-center p-10'>
          <h1 className='text-3xl text-violet-500 font-bold'>Image Url Parser</h1>
        </div>
        <p className='text-lg text-violet-400 uppercase underline font-bold my-10'>Upload your image below</p>
        <div className="flex justify-center items-center p-2 my-4">
          <input
            type="file"
            className="justify-start w-2/4 h-12 bg-gray-100 outline-none p-2 rounded-md my-2 text-violet-500"
            onChange={(e) => getCloudinaryUrlForImage(e)}
          />
        </div>
        <p className='text-lg text-violet-400 uppercase underline font-bold'>Copy the url below</p>
        <div className="flex justify-center items-center p-2 my-4">
          <input
            type="text"
            className="justify-start w-2/4 h-12 bg-gray-100 outline-none p-2 rounded-md my-2 text-violet-500"
            disabled={true}
            value={imageUrl}
          />
          <button className="bg-violet-600 h-12 p-2 text-white" onClick={copyToClipboard} disabled={disbaleButton}>
            Copy Url
          </button>
        </div>
      </div>
      {isLoading && (
        <FerrisWheelSpinnerOverlay
          overlayColor="rgba(0,153,255,0.2)"
          color="#7C3AED"
        />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
