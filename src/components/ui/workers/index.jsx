import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import editImg from "../../../assets/edit.svg";
import deleteImg from "../../../assets/delete.svg";
import { worker } from "@service";
import { WorkerModal } from "@modal";

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

export default function WorkerTable({ data, setData }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    const response = await worker.delete(id);
    if (response.status === 200) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    // Simulating data fetching
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Simulated delay
    };
    fetchData();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>T / R</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? [...Array(5)].map((_, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
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
                      <Skeleton variant="rectangular" width={40} height={40} />
                      <Skeleton variant="rectangular" width={40} height={40} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : data.map((item, index) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.first_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.last_name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.gender}
                    </StyledTableCell>
                    <StyledTableCell align="center">{item.age}</StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="flex items-center space-x-4 justify-center">
                        <img
                          onClick={() => handleOpen(item)}
                          src={editImg}
                          alt="edit"
                          className="cursor-pointer hover:scale-125 transition-all duration-200"
                        />
                        <img
                          onClick={() => handleDelete(item.id)}
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
      <WorkerModal
        open={open}
        handleClose={handleClose}
        item={selectedItem}
        setData={setData}
      />
    </>
  );
}
