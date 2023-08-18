import { Star } from "@mui/icons-material";
import { Box, Typography, List, ListItem, ListItemText, Rating, Button } from "@mui/material"
import { useRootStore } from "../../context/RootStoreContext";
import ReviewsApi from "../../api/ReviewsApi";

const ProductReviews = ({ reviews, slug, setReviews }) => {
    const { authStore } = useRootStore();

    const handleReviewDelete = async () => {
        try {
            await ReviewsApi.deleteReview(slug);
            setReviews(prev => prev.filter(r => r.username !== authStore.user.username))
        }
        catch(e) {
            console.log(e);
        }        
    }

    return (
        <Box>
        {reviews.length > 0 
            ? 
            <>
                <Typography variant="h5" align='center' mt={2}>
                    Reviews
                </Typography>
                <List>
                    {reviews.map((review) => (
                        <ListItem key={review.id}>
                            <ListItemText
                                primary={review.username}
                                secondary={
                                <>  
                                    <Rating
                                        name={`rating-${review.id}`}
                                        value={review.rate}
                                        precision={0.5}
                                        readOnly
                                        emptyIcon={<Star style={{ opacity: 0.55 }} />}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        {review.text}
                                    </Typography>
                                    {authStore?.user && authStore.user.username === review.username && 
                                        <Button onClick={handleReviewDelete}>Delete review</Button>
                                    }
                                </>
                            }
                            />
                        </ListItem>
                    ))}
                </List>
            </>
            :
            <Typography variant='h5' align='center'>No reviews yet</Typography>}
        </Box>
    )
    
}

export default ProductReviews;
