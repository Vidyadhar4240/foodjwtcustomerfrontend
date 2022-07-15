import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';

const BreadcrumbRestaurant = () => {

    const breadcrumbStyle = {
        paddingTop: '60px',
    }
    return (
    <div className='breadmenu'>
    <Breadcrumbs aria-label="breadcrumb" style={breadcrumbStyle}>
            <Typography color="text.primary">List of Restaurants</Typography>
    </Breadcrumbs>
    </div>
    );
}

export default BreadcrumbRestaurant;