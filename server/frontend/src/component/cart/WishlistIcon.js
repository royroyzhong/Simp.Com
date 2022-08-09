import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function WishlistIcon(props) {
    const conditionalComponent = (props) => {
        console.log("props",props)
        if (props === true) {
            return <FavoriteBorderIcon></FavoriteBorderIcon>
        } else {
            return <FavoriteIcon color='#5F0F40' ></FavoriteIcon>
        }
    }
    
    return (
        <div>
            {conditionalComponent(props)}
        </div>
    )


}