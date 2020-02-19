export default (formData) => {
  const errors = {};
  const { description, orderItems, asap, deliveryDate, cost, startAddress, deliveryAddress } = formData;

  if (description === "") errors.description = "Describe your order";
  if (orderItems.length === 0) errors.orderItems = "Enter your requested items";
  if (asap === "") {
    if (deliveryDate === "") {
      errors.deliveryDate = "Enter valid date";
      errors.asap = "Enter date or ASAP";
    }
  }
  if (cost === "") errors.cost = "Enter estimated cost";
  if (startAddress === "") errors.startAddress = "Enter pickup address";
  if (deliveryAddress === "") errors.deliveryAddress = "Enter delivery address";
  errors.isEmpty = Object.keys(errors).length ? false : true;
  return errors;
}