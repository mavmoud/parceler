export const ORDER_STATUS_OPTIONS = [
  { name: "Shipment Created", value: 1 },
  { name: "Picked Up", value: 2 },
  { name: "In Transit", value: 3 },
  { name: "Out for Delivery", value: 4 },
  { name: "Delivered", value: 5 },
  { name: "Delivery Attempted", value: 6 },
  { name: "Returned to Sender", value: 7 },
];

export const ORDER_STATUS_MAP = new Map(
  ORDER_STATUS_OPTIONS.map((status) => [status.name, status.value])
);

export const getStatusName = (statusId: number) => {
  return ORDER_STATUS_OPTIONS.find((status) => status.value === statusId)?.name;
};

export const getStatusId = (statusName: string) => {
  return ORDER_STATUS_OPTIONS.find((status) => status.name === statusName)
    ?.value;
};
