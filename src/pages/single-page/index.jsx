import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { media } from "@service";

const SinglePage = () => {
  const location = useLocation();
  const { product } = location.state;
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);

  const backProduct = () => {
    window.history.back();
  };

  const getData = async (productId) => {
    try {
      const response = await media.get(productId);
      if (response.status === 200 && response.data.images) {
        setImages(response.data.images);
        setSelectedImage(response.data.images[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData(product.product_id);
  }, [product.product_id]);

  const handleAddImg = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await media.upload(product.product_id, formData);
      if (response.status === 200 && response?.data?.image_url) {
        toast.success("Image uploaded successfully!");
        getData(product.product_id);
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFile(null);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleFullScreen = () => {
    if (selectedImage) {
      const imgElement = document.getElementById("selected-image");
      if (imgElement.requestFullscreen) {
        imgElement.requestFullscreen();
      } else if (imgElement.mozRequestFullScreen) {
        imgElement.mozRequestFullScreen();
      } else if (imgElement.webkitRequestFullscreen) {
        imgElement.webkitRequestFullscreen();
      } else if (imgElement.msRequestFullscreen) {
        imgElement.msRequestFullscreen();
      }
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} block bg-black/50 rounded-full p-2`}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} block bg-black/50 rounded-full p-2`}
        onClick={onClick}
      />
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="cursor-pointer" onClick={backProduct}>
        <ArrowBackIcon />
      </div>
      <div className="p-6 flex">
        <div className="flex flex-col mr-6">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.image_url}
              alt={`Product Image ${index + 1}`}
              className={`mb-4 w-28 h-16 object-cover cursor-pointer ${
                selectedImage === image ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <div className="flex-1 relative">
          {selectedImage && (
            <div className="relative">
              <img
                id="selected-image"
                src={selectedImage.image_url}
                alt="Selected Product"
                className="w-2/5 h-56 object-cover"
              />
              <FullscreenIcon
                className="cursor-pointer absolute bottom-4 text-white"
                onClick={handleFullScreen}
              />
            </div>
          )}
        </div>
        <div className="absolute right-[25%]">
          <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Made in:</strong> {product.made_in}
          </p>
          <p>
            <strong>Color:</strong> {product.color.join(", ")}
          </p>
          <p>
            <strong>Size:</strong> {product.size.join(", ")}
          </p>
          <p>
            <strong>Count:</strong> {product.count}
          </p>
          <p>
            <strong>Cost:</strong> {product.cost}$
          </p>
          <p>
            <strong>Discount:</strong> {product.discount}%
          </p>
          <p>
            <strong>Age Range:</strong> {product.age_min} - {product.age_max}
          </p>
          <p>
            <strong>For Gender:</strong> {product.for_gender}
          </p>
          <div className="flex items-center mt-4">
            <button
              onClick={openModal}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              <AddPhotoAlternateIcon />
            </button>
          </div>
        </div>
      </div>

      <Modal open={modalIsOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Upload Image</h2>
          <input type="file" onChange={handleFileChange} />
          <div className="flex justify-between mt-4">
            <Button onClick={handleAddImg} variant="contained" color="primary">
              Upload
            </Button>
            <Button onClick={closeModal} variant="outlined" color="secondary">
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SinglePage;
