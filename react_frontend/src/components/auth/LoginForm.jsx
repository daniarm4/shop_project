import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../../context/RootStoreContext';


const LoginForm = () => {
    const {authStore} = useRootStore();

    const validationSchema = yup.object({
        email: yup.string()
            .email('Enter valid email')
            .required('This field is required'),
        password: yup.string()
            .required('This field is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            try {
                actions.setSubmitting(true);
                await authStore.login(values.email, values.password);
            } catch (e) {
                actions.setFieldError('email', e.message);
                actions.setFieldError('password', e.message);
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    const fields = [
        {label: 'Email', name: 'email', type: 'email'},
        {label: 'Password', name: 'password', type: 'password'},
    ]

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
                />
            )}
            <Button 
                type="submit" 
                color="primary"
                variant="contained" 
                size="large"
                sx={{ display: 'block', margin: '0 auto' }}
                disabled={formik.isSubmitting}
            >
                Login
            </Button>
        </form>
        )
}

export default observer(LoginForm);
