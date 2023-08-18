import { useEffect, useState } from "react"
import ProductApi from "../api/ProductApi"
import ProductList from "../components/products/ProductList";
import FilterBar from "../components/products/FilterBar";
import Paginator from "../components/products/Paginator";
import { Box, Grid, Typography } from "@mui/material";
import Loader from "../components/loader/Loader"

const ITEM_PER_PAGE = 10;

const ProductListPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [filters, setFilters] = useState({
        category: '', 
        tags: [],
        inStock: false,
        sortParam: '', 
    })
    const [countPages, setCountPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const [products, categories, tags] = await Promise.all([
                    ProductApi.getProducts(currentPage, filters),
                    ProductApi.getCategories(),
                    ProductApi.getTags(),
                ])
                setCountPages(Math.ceil(products.data.count / ITEM_PER_PAGE));
                setProducts(products.data.results);
                setCategories(categories.data.map(category => category.name));
                setTags(tags.data.map(tag => tag.name));
            }
            catch(e) {
                console.log(e)
            }
            finally {
                setIsLoading(false);
            }

        }
        fetchData();
    }, [filters, currentPage])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <Grid container spacing={2} mt={3}>
            <Grid item xs={12}>
                <FilterBar 
                    categories={categories} 
                    tags={tags}      
                    filters={filters}
                    setFilters={setFilters}
                    setCurrentPage={setCurrentPage}
                />
            </Grid>
            {products.length === 0 
            ?   
            <Grid item xs={12}>
                <Typography 
                    variant="h6"
                    align="center"
                    sx={{mt: 4}}
                >
                    Products not found for your request
                </Typography>
            </Grid>
            :
            <>
                <Grid item xs={12}>
                    <ProductList 
                        products={products}
                        setProducts={setProducts}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Paginator
                        currentPage={currentPage}
                        countPages={countPages}
                        setCurrentPage={setCurrentPage}
                    />
                </Grid>
            </>
            }
        </Grid>
    )
}

export default ProductListPage;
