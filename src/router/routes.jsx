import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const routes = [
  {
    path: "/",
    content: "Category",
    icon: <CategoryIcon />,
  },
  {
    path: "/products",
    content: "Products",
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    path: "/workers",
    content: "Workers",
    icon: <PeopleAltIcon />,
  },
];

export default routes;
