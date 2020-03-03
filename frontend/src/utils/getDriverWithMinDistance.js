const calculateDistance = (driver, actualOrder) => {
  const { startAddressCoords: driverAssignedStartAddress, deliveryAddressCoords: driverAssignedFinishAddress } = driver.assignedOrders[0]; // driver assigned order start and finish coords
  const driverLocation = driver.location.coordinates; // driver current location
  const { startAddressCoords: actualOrderStartAddressCoords, deliveryAddressCoords: actualOrderDeliveryAddressCoords } = actualOrder; // actual order start and finish coords

  const request = {
    origin: { lat: parseFloat(driverLocation[1]), lng: parseFloat(driverLocation[0]) },
    destination: { lat: parseFloat(actualOrderDeliveryAddressCoords.coordinates[1]), lng: parseFloat(actualOrderDeliveryAddressCoords.coordinates[0]) },
    waypoints: [
      (driver.assignedOrders[0].status === 'Requested') && 
      ({
        location: `${driverAssignedStartAddress.coordinates[1]}, ${driverAssignedStartAddress.coordinates[0]}`,
        stopover: true,
      }),
      {
        location: `${driverAssignedFinishAddress.coordinates[1]}, ${driverAssignedFinishAddress.coordinates[0]}`,
        stopover: true,
      },
      {
        location: `${actualOrderStartAddressCoords.coordinates[1]}, ${actualOrderStartAddressCoords.coordinates[0]}`,
        stopover: true,
      }
    ],
    travelMode: "DRIVING"
  };

  const directionsService = new window.google.maps.DirectionsService();
  directionsService.route(request, function(result, status) {
    if (status === "OK") {
      const distance = result.routes[0].legs[0].distance.value;
      driver.totalDistance = distance;
    }
  });
}

export const getDriverWithMinDistance = (order) => {
  const { details } = order;
  const drivers = order.drivers.slice(0, 5);

  for (let index = 0; index < drivers.length; index++) {
    const driver = drivers[index];
    calculateDistance(driver, details);
  }

  return drivers;
}