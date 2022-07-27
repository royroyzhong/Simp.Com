export default class Product {

    constructor(seller) {

        this.uuid = null;
        this.title = "";
        this.price = 0;
        this.quantity = 0;
        this.tags = [];
        this.imgRefs = [];
        this.features = {}; // key is the title, value is the description
        this.seller = seller;

    }

}