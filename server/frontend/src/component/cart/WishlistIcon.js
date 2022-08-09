import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import "../../css/product.css";
import { useDispatch, useSelector} from "react-redux";
import { useState, useEffect} from "react";

import {
    addToWishlistAsync,
    deleteFromWishlistAsync,
    getWishlistStatusAsync,
    setWishlistFlag
} from "../../controller/productSlice";

export default function WishlistIcon(props) {
    // false if not in wishlist, true if in wishlist 
    const toggleStatus = useSelector((state) => state.products.wishlistFlag)
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWishlistStatusAsync(props.props))
    },[])

    const handleToggle = () => {
        dispatch(setWishlistFlag(!toggleStatus));
        if ((!toggleStatus) === true) {
            console.log("wistlist",props.props)
            dispatch(addToWishlistAsync(props.props));
        } else {
            dispatch(deleteFromWishlistAsync(props.props));
        }
    }

    const conditionalComponent = () => {
        if (toggleStatus === false) {
            return <FavoriteBorderIcon></FavoriteBorderIcon>
        } else {
            return <FavoriteIcon color='#5F0F40' ></FavoriteIcon>
        }
    }

    return (
        <IconButton size='small' disableRipple='false' id='wishlist' onClick={handleToggle}>
            {conditionalComponent()}
        </IconButton>
    )

}