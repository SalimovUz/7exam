import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { CategoryModal } from "@modal";
import { CategoryTable } from "@ui";
import { category } from "@service";
import Pagination from "@mui/material/Pagination";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await category.get(params);
      if (response.status === 200 && response?.data?.categories) {
        setData(response?.data?.categories);
        let total = Math.ceil(response.data.total_count / params.limit);
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };

  return (
    <>
      <CategoryModal open={open} handleClose={handleClose} setData={setData} />
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
        <CategoryTable data={data} setData={setData} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;
