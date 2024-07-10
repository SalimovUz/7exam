import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ProductModal } from "@modal";
import { ProductTable } from "@ui";
import { product } from "@service";
import Pagination from "@mui/material/Pagination";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [close, setClose] = useState(true)
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 15,
    page: 1,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await product.get(params);
      if (response.status === 200 && response?.data?.products) {
        setData(response?.data?.products);
        let total = Math.ceil(response.data.total_count / params.limit);
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params, close]);

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };
  return (
    <>
      <ProductModal open={open} setClose={setClose} close={close} handleClose={handleClose} setData={setData} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button
            className="hover:scale-110 transition-all duration-400"
            onClick={handleOpen}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
        <ProductTable data={data}  setData={setData} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;
