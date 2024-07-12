import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import editImg from "../../../assets/edit.svg";
import deleteImg from "../../../assets/delete.svg";
import { product } from "@service";
import { media } from "@service";
import { ProductModal } from "@modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#10898D",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Products = ({ data, setData }) => {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [productId, setProductId] = useState(null);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const deleteItem = async (id) => {
    try {
      const response = await product.delete(id);
      if (response.status === 200) {
        setData((prevData) =>
          prevData.filter((item) => item.product_id !== id)
        );
        toast.success("Product deleted successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
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
    if (productId) {
      getData(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (data.length) {
      setLoading(false);
    }
  }, [data]);

  const handleAddImg = async () => {
    if (!file || !productId) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await media.upload(productId, formData);
      if (response.status === 200 && response?.data?.image_url) {
        toast.success("Image uploaded successfully!");
        getData(productId);
        setImages((prevImages) => [...prevImages, response.data.image_url]);
        setFile(null);
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Image upload failed.");
    }
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const openModal = (id) => {
    setProductId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFile(null);
  };

  const viewItem = (item) => {
    navigate(`/products/${item.product_id}`, { state: { product: item } });
  };

  return (
    <>
      <ProductModal
        item={edit}
        open={open}
        handleClose={() => setOpen(false)}
        setData={setData}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T / R</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Color</StyledTableCell>
              <StyledTableCell align="center">Size</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
              <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(5)).map((_, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      <Skeleton variant="text" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="text" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="text" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="text" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="text" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="text" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Skeleton variant="rectangular" height={24} width={100} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : data.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.product_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.color}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.size}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.count}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.cost}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="flex items-center space-x-4 justify-center">
                        <button
                          onClick={() => openModal(item.product_id)}
                          className="cursor-pointer hover:scale-125 transition-all duration-200"
                        >
                          <AddPhotoAlternateIcon />
                        </button>
                        <img
                          onClick={() => deleteItem(item.product_id)}
                          src={deleteImg}
                          alt="delete"
                          className="cursor-pointer hover:scale-125 transition-all duration-200"
                        />
                        <VisibilityIcon
                          className="cursor-pointer hover:scale-125 transition-all duration-300"
                          onClick={() => viewItem(item)}
                        />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
      <Modal open={modalIsOpen} onClose={closeModal}>
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Upload Image</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <div className="flex justify-between">
              <Button
                onClick={handleAddImg}
                variant="contained"
                color="primary"
              >
                Upload
              </Button>
              <Button onClick={closeModal} variant="outlined" color="secondary">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Products;
