import { Box, Pagination } from '@mui/material'

const Paginator = ({ countPages, currentPage, setCurrentPage}) => {    
    return (
        <Box justifyContent='center' display='flex' alignItems='center' mb={2}>
            <Pagination
                count={countPages}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                color="primary"
            />
        </Box>
    )
}

export default Paginator;
