import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";


const ProductList = ({ products }) => {
    return (
        <Grid container spacing={1} p={1}>
            {products.map(item =>
                <ProductCard item={item} key={item.slug} />
            )}
        </Grid>
    )
}

export default ProductList;
