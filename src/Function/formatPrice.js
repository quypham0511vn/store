function priceFormat(price, sign = "VND") {
    return (
      price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " " + sign
    );
  }
  export default { priceFormat };