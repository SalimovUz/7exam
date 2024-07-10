// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useState } from "react";
// import editImg from "../../../assets/edit.svg";
// import deleteImg from "../../../assets/delete.svg";
// import { product } from "@service";
// import { ProductModal } from "@modal";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#10898D",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// export default function Index({ data, setData }) {
//   const [edit, setEdit] = useState({});
//   const [open, setOpen] = useState(false);

//   const deleteItem = async (id) => {
//     try {
//       const response = await product.delete(id);
//       if (response.status === 200) {
//         setData((prevData) =>
//           prevData.filter((item) => item.product_id !== id)
//         );
//         toast.success("Product deleted successfully!");
//       }
//     } catch (error) {
//       toast.error("Nimadir xato ketdi");
//     }
//   };

//   const editItem = (item) => {
//     setEdit(item);
//     setOpen(true);
//   };

//   return (
//     <>
//       <ProductModal
//         item={edit}
//         open={open}
//         handleClose={() => setOpen(false)}
//         setData={setData}
//       />
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell align="center">T / R</StyledTableCell>
//               <StyledTableCell align="center">Product Name</StyledTableCell>
//               <StyledTableCell align="center">Color</StyledTableCell>
//               <StyledTableCell align="center">Size</StyledTableCell>
//               <StyledTableCell align="center">Count</StyledTableCell>
//               <StyledTableCell align="center">Cost</StyledTableCell>
//               <StyledTableCell align="center">Actions</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((item, index) => (
//               <StyledTableRow key={index}>
//                 <StyledTableCell align="center">{index + 1}</StyledTableCell>
//                 <StyledTableCell align="center">
//                   {item.product_name}
//                 </StyledTableCell>
//                 <StyledTableCell align="center">{item.color}</StyledTableCell>
//                 <StyledTableCell align="center">{item.size}</StyledTableCell>
//                 <StyledTableCell align="center">{item.count}</StyledTableCell>
//                 <StyledTableCell align="center">{item.cost}</StyledTableCell>
//                 <StyledTableCell align="center">
//                   <div className="flex items-center space-x-4 justify-center">
//                     <img
//                       onClick={() => editItem(item)}
//                       src={editImg}
//                       alt="edit"
//                       className="cursor-pointer hover:scale-125 transition-all duration-200"
//                     />
//                     <img
//                       onClick={() => deleteItem(item.product_id)}
//                       src={deleteImg}
//                       alt="delete"
//                       className="cursor-pointer hover:scale-125 transition-all duration-200"
//                     />
//                     <VisibilityIcon className="cursor-pointer" />
//                   </div>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }


import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import editImg from "../../../assets/edit.svg";
import deleteImg from "../../../assets/delete.svg";
import { product } from "@service";
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

export default function Products({ data, setData }) {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
      toast.error("Nimadir xato ketdi");
    }
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
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
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.product_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.color}</StyledTableCell>
                <StyledTableCell align="center">{item.size}</StyledTableCell>
                <StyledTableCell align="center">{item.count}</StyledTableCell>
                <StyledTableCell align="center">{item.cost}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className="flex items-center space-x-4 justify-center">
                    <img
                      onClick={() => editItem(item)}
                      src={editImg}
                      alt="edit"
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    />
                    <img
                      onClick={() => deleteItem(item.product_id)}
                      src={deleteImg}
                      alt="delete"
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    />
                    <VisibilityIcon
                      className="cursor-pointer"
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
    </>
  );
}
