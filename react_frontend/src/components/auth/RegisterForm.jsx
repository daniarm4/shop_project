import {
    Button,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRootStore } from '../../context/RootStoreContext';

const hasNumber = /\d/
const hasLetter = /[a-zA-Z]/

export const RegisterForm = (props) => {
    const {authStore} = useRootStore();

    const validationSchema = yup.object({
        email: yup.string()
            .email('Enter valid email')
            .required('This field is required'),
        username: yup.string()
            .min(4, 'Minimum length 4')
            .required('This field is required'),
        phoneNumber: yup.string()
            .required('This field is required'),
        password: yup.string()
            .min(8, 'Minimum length 8')
            .required('This field is required')
            .matches(hasNumber, 'Password must contain a number')
            .matches(hasLetter, 'Password must contain a letter'),
        rePassword: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('This field is required')
    });

    const fields = [
        {label: 'Email', name: 'email', type: 'text'},
        {label: 'Phone number', name: 'phoneNumber', type: 'text'},
        {label: 'Username', name: 'username', type: 'text'},
        {label: 'Password', name: 'password', type: 'password'},
        {label: 'Confirm password', name: 'rePassword', type: 'password'},
    ]

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            phoneNumber: '',
            password: '',
            rePassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            try {
                actions.setSubmitting(true);
                await authStore.register(
                    values.email, 
                    values.username, 
                    values.phoneNumber, 
                    values.password, 
                    values.rePassword
                );
            } catch (e) {
                actions.setFieldError('username', e.response.data.username);
                actions.setFieldError('email', e.response.data.email);
                actions.setFieldError('phoneNumber', e.response.data.phone_number);
            } finally {
                actions.setSubmitting(false);
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {fields.map(item => 
            <TextField
                key={item.label}
                name={item.name}
                label={item.label}
                type={item.type}
                sx={{ mb: 2 }}
                fullWidth
                value={formik.values[item.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[item.name] && Boolean(formik.errors[item.name])}
                helperText={formik.touched[item.name] && formik.errors[item.name]}
            />)}
            <Button 
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                sx={{ display: 'block', margin: '0 auto' }}
                disabled={formik.isSubmitting}
            >
                Register 
            </Button>
        </form>
    )
}
