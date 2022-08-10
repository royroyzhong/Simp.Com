# Doge-Commerce
https://dogecom.herokuapp.com

# Menu
- [Introduction](#introduction)
- [Project Description](#project-description)
- [Project Requirements](#project-requirements)
- [Tech Stack](#tech-stack)
- [Above and Beyond Features](#above-and-beyond-features)
- [Next Steps](#next-steps)
- [Contributions](#contributions)
- [Sketch](#sketch)

## Introduction: 
We designed an e-commerce platform supporting roles from guests to buyer to seller. We included a variety of features from upload products, drag & drop files and cart operations to more advanced integration such as live chat and data visualization.

## Project Description
We designed a business startup framework which supports various role-based activity through our interactive dashboard UI for small business and their corresponding targeted customers. Seller activity spans from designing presentation page to tracking order status where logged-in user can browse page, add/delete item to/from carts/wishlist, receive email notification for restocking of wanted item, adn guests are limited to only browsing.

User login information including address and encrypted password will be saved as JSON into our database along with product and cart information where as uploaded product picture will be stores as schemas with Mongoose/ GridFS. Most data will support editing, retrieving features while email are used for authentication and registration. Additional functionalities may include monthly data visualization of sales, live chat or recommendation. 

## Project Requirements
**Minimal Requirements**:
- ✅ Login
- ✅ Basic CRUD operation on user profile includes remove/update/add to cart/wishlist 
- ✅ Editable and expandable product presentation page 
- ✅ Track order status for shipped items
- ✅ View product page 

**Standard Requirements**:
- ✅ Encrypted password 
- ✅ Data visualization
- ✅ Email notification for restocking of wanted item
- ✅ Login with Google
- ✅ Drag and drop pictures (jpeg,gif and most image and video format)

**Stretch Requirements**:
- ❌ Payment (support paypal, mastercard, visa credit cards etc) 
- ✅ Livechat for customer support 
- ❌ Recommondation system 
## Tech Stack
  ### Unit 1 - HTML, CSS, JS
  ...
  ### Unit 2 - React & Redux
  ...
  ### Unit 3 - Node & Express
  ...
  ### Unit 4 - NoSQL with MongoDB
  ...
  ### Unit 5 - Release Engineering
  ...
  
## Above and Beyond Features
  ### Drag & Drop
  ...
  ### Live Chat
  ...
  ### Data Visualization 
  ...
## Next Steps
...
## Contributions
- Ruming(Roy) Zhong 
> - Designed and implemented the login/sign-up and profile page.
> - Used Middleware in application to authorize user with JWT, check users permission in backend and perform password encryption.
> - Used Google Identity in the application to quickly and easily manage user authentication and sign-in to the website.
> - Used Socket.IO in application to enable real-time, bi-directional communication between buyer and seller supporting customer support feature.
> - Improved UI to be more responsive and user-friendly.
- Guanghua(Gavin) Yang
> ...
- Lichuan(Isabella) Yang
> ...
- Qintu(Quinn) Tao
> ...


### Sketch 
![Rough_Sketch_Prototype.jpg](./doc/Rough_Sketch_Prototype.jpg)

