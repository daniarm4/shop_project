import * as yup from 'yup'
import { useFormik } from 'formik'
import { Box, Button, Rating, TextField, Typography } from '@mui/material'
import ReviewsApi from '../../api/ReviewsApi'

const ReviewProductForm = ({ slug, isReviewed, setIsReviewed, setIsLoading }) => {

    const validationSchema = yup.object({
        text: yup.string()
            .required('This field is required')
            .min(4, 'Minimum length: 4')
            .max(255, 'Maximum length: 255'),
        rating: yup.number()
            .required('This field is required')
            .min(1, 'Minimum rate: 4')
            .max(5, 'Maximum rate: 5')
    })

    const formik = useFormik({
        initialValues: {
            text: '',
            rating: 1,
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            try {
                setIsLoading(true);
                await ReviewsApi.createReview(slug, values.text, values.rating);
                setIsReviewed(true);
            }
            catch(e) {
                console.log(e);
            }        
            finally {
                setIsLoading(false);
            }
        }
    })

    const form = (
        <form onSubmit={formik.handleSubmit}>
            <Typography variant='h5'>
                Add review
            </Typography>
            <Typography>
                Stars:
            </Typography>
            <Rating 
                name="rating"
                value={formik.values.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rating && formik.errors.rating} 
            />
            <Typography>
                Review:
            </Typography>
            <TextField 
                name="text"
                placeholder='Review'
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.text && formik.errors.text}
                multiline
                rows={4}
                fullWidth 
            />

            <Box display='flex' justifyContent='center' m={1}>
                <Button type="submit" variant="contained" >
                    Отправить
                </Button>
            </Box>
        </form>
    )

    if (isReviewed) {
        return (
            <Box sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: 2,
                        backgroundColor: '#7B68EE',
                    }}
                    >
                        <Typography
                            color='white'
                            variant='h5'
                        >
                            Review already added
                        </Typography>
                    </Box>
                <Box 
                    sx={{
                        opacity: 0.4,
                        pointerEvents: 'none'
                    }}
                >
                    {form}
                </Box>
            </Box>
        )
    }

    return (
        form
    )
}

export default ReviewProductForm;
