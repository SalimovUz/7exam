// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { category } from "@service";
// import { Category } from "@modal";
// import { useState } from "react";
// import editImg from "../../../assets/edit.svg";
// import deleteImg from "../../../assets/delete.svg";

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

// export default function CustomizedTables({ data }) {
//   const [edit, setEdit] = useState({});
//   const [open, setOpen] = useState(false);

//   const deleteItem = async (id) => {
//     try {
//       const response = await category.delete(id);
//       response.status === 200 && window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const editItem = (item) => {
//     setEdit(item);
//     setOpen(true);
//   };
//   return (
//     <>
//       <Category item={edit} open={open} handleClose={() => setOpen(false)} />
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell align="center">T / R</StyledTableCell>
//               <StyledTableCell align="center">Category Name</StyledTableCell>
//               <StyledTableCell align="center">Actions</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((item, index) => (
//               <StyledTableRow key={index}>
//                 <StyledTableCell align="center">{index + 1}</StyledTableCell>
//                 <StyledTableCell align="center">
//                   {item.category_name}
//                 </StyledTableCell>
//                 <StyledTableCell align="center" className="flex space-x-4">
//                   <div className="flex items-center space-x-4 justify-center">
//                     <img
//                       onClick={() => editItem(item)}
//                       src={editImg}
//                       alt="bir"
//                       className="cursor-pointer hover:scale-125 transition-all duration-200"
//                     />
//                     <img
//                       onClick={() => deleteItem(item.id)}
//                       src={deleteImg}
//                       alt=""
//                       className="cursor-pointer hover:scale-125 transition-all duration-200"
//                     />
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
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import editImg from "../../../assets/edit.svg";
import deleteImg from "../../../assets/delete.svg";
import { category } from "@service";
import { CategoryModal } from "@modal";

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

export default function Index({ data, setData }) {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);

  const deleteItem = async (id) => {
    try {
      const response = await category.delete(id);
      console.log("Delete response:", response);
      if (response.status === 200) {
        setData((prevData) =>
          prevData.filter((item) => item.category_id !== id)
        );
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };

  return (
    <>
      <CategoryModal
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
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.category_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="flex items-center space-x-4 justify-center">
                    <img
                      onClick={() => editItem(item)}
                      src={editImg}
                      alt="edit"
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    />
                    <img
                      onClick={() => deleteItem(item.category_id)}
                      src={deleteImg}
                      alt="delete"
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
