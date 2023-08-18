import { CircularProgress } from "@mui/material"

const Loader = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CircularProgress disableShrink />
        </div>
    )
}

export default Loader;
