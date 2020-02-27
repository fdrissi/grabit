import { useState } from 'react';

export default (submit, validate) => {
  const [formData, setFormData] = useState({
    description: "",
    item: "",
    orderItems: [],
    asap: "",
    deliveryDate: new Date().toDateInputValue(),
    startAddress: "",
    startAddressCoords: {},
    deliveryAddress: "",
    deliveryAddressCoords: {},
    estimatedTime: null,
    cost: "",
    errors: {},
  });
  const { item, orderItems } = formData;

  const handleAddItem = () => {
    if (orderItems.indexOf(item) === -1)
      setFormData({ ...formData, orderItems: [item, ...orderItems], item: "" });
    else
      setFormData({ ...formData, item: "" });
  }

  const handleDeleteItem = (event) => {
    setFormData({ ...formData, orderItems: orderItems.filter(item => item !== event.target.alt) });
  }

  const handleChange = (event, name, value) => {
    if (name && value) {
      setFormData({ ...formData, [name]: value, errors: {} })
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value, errors: {} });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // const validationErrors = validate(formData);
    // setFormData({ ...formData, errors: validationErrors });

    // if (validationErrors.isEmpty) submit();
    submit();
  }

  return {
    formData,
    setFormData,
    handleAddItem,
    handleChange,
    handleDeleteItem,
    handleSubmit
  };
}