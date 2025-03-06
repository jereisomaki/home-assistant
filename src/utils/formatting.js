import { format, parseISO } from "date-fns";

export const formatCurrentDate = () => {
  return format(new Date(), "HH") + ":00";
};

export const formatDate = (date) => {
  return format(parseISO(date), "HH:mm");
};

export const formatPrice = (price) => {
  return price * 1.25 * 100;
};
