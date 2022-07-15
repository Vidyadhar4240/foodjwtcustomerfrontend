import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const BreadcrumbMenu = () => {

    const breadcrumbStyle = {
        paddingTop: '50px',
    }
    return (
    <div className='breadmenu'>
    <Breadcrumbs aria-label="breadcrumb" style={breadcrumbStyle}>
            <Link underline="hover" color="inherit" href="/listrestaurant">
                List of Restaurants
            </Link>
            <Typography color="text.primary">MenuList</Typography>
    </Breadcrumbs>
    </div>
    );
}

export default BreadcrumbMenu;