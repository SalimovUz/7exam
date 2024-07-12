import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import editImg from "../../assets/edit.svg";
import { media } from "@service";
import { ProductModal } from "@modal";

const SinglePage = ({ item, setData }) => {
  const location = useLocation();
  const { product } = location.state;
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const backProduct = () => {
    window.history.back();
  };

  const initialValues = {
    age_max: item?.age_max || "",
    age_min: item?.age_min || "",
    category_id: item?.category_id || "",
    color: item?.color || [],
    cost: item?.cost || "",
    count: item?.count || "",
    description: item?.description || "",
    discount: item?.discount || "",
    for_gender: item?.for_gender || "",
    made_in: item?.made_in || "",
    product_name: item?.product_name || "",
    size: item?.size || [],
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
    } finally {
      setLoading(false);
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

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
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
      <ProductModal
        item={edit}
        open={open}
        handleClose={() => setOpen(false)}
        setData={setData}
      />
      <ToastContainer />
      <div className="cursor-pointer" onClick={backProduct}>
        <ArrowBackIcon />
      </div>
      <div className="p-6 flex flex-col lg:flex-row">
        <div className="flex flex-col mb-6 lg:mr-6">
          {loading ? (
            <>
              <Skeleton
                variant="rectangular"
                width={112}
                height={64}
                sx={{ bgcolor: "#10898d", borderRadius: "8px", mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width={112}
                height={64}
                sx={{ bgcolor: "#10898d", borderRadius: "8px", mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width={112}
                height={64}
                sx={{ bgcolor: "#10898d", borderRadius: "8px", mb: 2 }}
              />
            </>
          ) : (
            images.map((image, index) => (
              <img
                key={index}
                src={image.image_url}
                alt={`Product Image ${index + 1}`}
                className={`mb-4 w-28 h-16 object-cover cursor-pointer rounded-lg transition-all duration-300 ${
                  selectedImage === image
                    ? "border-2 border-blue-500 shadow-lg transform scale-105"
                    : ""
                }`}
                onClick={() => handleImageClick(image)}
              />
            ))
          )}
        </div>
        <div className="flex-1 relative mb-6 lg:mb-0">
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={224}
              sx={{ bgcolor: "#10898d", borderRadius: "8px" }}
            />
          ) : (
            selectedImage && (
              <div className="relative">
                <img
                  id="selected-image"
                  src={selectedImage.image_url}
                  alt="Selected Product"
                  className="w-full lg:w-2/5 h-56 object-cover rounded-lg"
                />
                <FullscreenIcon
                  className="cursor-pointer absolute bottom-4 right-4 text-white"
                  onClick={handleFullScreen}
                />
              </div>
            )
          )}
        </div>
        <div className="lg:ml-6 lg:w-1/3">
          {loading ? (
            <>
              <Skeleton
                variant="text"
                width="80%"
                height={40}
                sx={{ bgcolor: "#10898d", mb: 2 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "#10898d", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "#10898d", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "#10898d", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "#10898d", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "#10898d", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "#10898d", mb: 1 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "#10898d", mb: 1 }}
              />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">
                {product.product_name}
              </h1>
              <p className="mb-2">
                <strong>Description:</strong> {product.description}
              </p>
              <p className="mb-2">
                <strong>Made in:</strong> {product.made_in}
              </p>
              <p className="mb-2">
                <strong>Color:</strong> {product.color.join(", ")}
              </p>
              <p className="mb-2">
                <strong>Size:</strong> {product.size.join(", ")}
              </p>
              <p className="mb-2">
                <strong>Count:</strong> {product.count}
              </p>
              <p className="mb-2">
                <strong>Cost:</strong> {product.cost}$
              </p>
              <p className="mb-2">
                <strong>Discount:</strong> {product.discount}%
              </p>
              <p className="mb-4">
                <strong>Age Range:</strong> {product.age_min} -{" "}
                {product.age_max}
              </p>
              <p className="mb-4">
                <strong>For Gender:</strong> {product.for_gender}
              </p>
              <div className="flex items-center mt-4">
                <button
                  onClick={openModal}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  <AddPhotoAlternateIcon />
                </button>
                <img
                  onClick={() => editItem(item)}
                  src={editImg}
                  alt="edit"
                  className="cursor-pointer hover:scale-125 transition-all duration-200 ml-4"
                />
              </div>
            </>
          )}
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
