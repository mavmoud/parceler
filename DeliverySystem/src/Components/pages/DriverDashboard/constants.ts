export const OPTION_VALUE: string = "value";
export const OPTION_NAME: string = "name";

export const ORDER_STATUS_OPTIONS = [
  { [OPTION_NAME]: "Shipment Created", [OPTION_VALUE]: 1 },
  { [OPTION_NAME]: "Picked Up", [OPTION_VALUE]: 2 },
  { [OPTION_NAME]: "In Transit", [OPTION_VALUE]: 3 },
  { [OPTION_NAME]: "Out for Delivery", [OPTION_VALUE]: 4 },
  { [OPTION_NAME]: "Delivered", [OPTION_VALUE]: 5 },
  { [OPTION_NAME]: "Delivery Attempted", [OPTION_VALUE]: 6 },
  { [OPTION_NAME]: "Returned to Sender", [OPTION_VALUE]: 7 },
];

export const ORDER_STATUS_MAP = new Map(
  ORDER_STATUS_OPTIONS.map((status) => [
    status[OPTION_NAME],
    status[OPTION_VALUE],
  ])
);
