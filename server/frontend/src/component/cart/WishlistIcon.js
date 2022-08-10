import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/product.css";

import {
    addToWishlistAsync,
    deleteFromWishlistAsync,
    getWishlistStatusAsync,
    setWishlistFlag
} from "../../controller/productSlice";

export default function WishlistIcon(props) {
  // false if not in wishlist, true if in wishlist
  const toggleStatus = useSelector((state) => state.products.wishlistFlag);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlistStatusAsync(props.productId));
  }, []);

  const handleToggle = () => {
    dispatch(setWishlistFlag(!toggleStatus));
    if (!toggleStatus === true) {
      dispatch(addToWishlistAsync(props.productId));
    } else {
      dispatch(deleteFromWishlistAsync(props.productId));
    }
  };

  const conditionalComponent = () => {
    if (toggleStatus === false) {
      return <FavoriteBorderIcon></FavoriteBorderIcon>;
    } else {
      return <FavoriteIcon color="#5F0F40"></FavoriteIcon>;
    }
  };

  return (
    <IconButton
      size="small"
      disableRipple="false"
      id="wishlist"
      onClick={handleToggle}
    >
      {conditionalComponent()}
    </IconButton>
  );
}
