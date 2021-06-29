module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, photo_id) {
        var cartItem = this.items[photo_id];
        if (!cartItem) {
            cartItem = this.items[photo_id] = {item: item};
        }
       
        this.totalPrice += cartItem.item.photo_price;
    };

    this.remove = function(photo_id) {
       
        this.totalPrice -= this.items[photo_id].photo_price;
        delete this.items[photo_id];
        
    };
    
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};