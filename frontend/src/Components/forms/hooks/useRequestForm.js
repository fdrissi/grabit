import { useState } from 'react';

export default (submit, validate) => {
  const [formData, setFormData] = useState({
    description: "",
    item: "",
    orderItems: [],
    asap: "",
    deliveryDate: new Date().toDateInputValue(),
    startAddress: "",
    deliveryAddress: "",
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value, errors: {} });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    setFormData({ ...formData, errors: validationErrors });

    if (validationErrors.isEmpty) submit();
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