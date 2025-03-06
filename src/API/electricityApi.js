import { format, addDays } from "date-fns";

const apiUrl = (year, month, day) => {
  return `https://www.sahkonhintatanaan.fi/api/v1/prices/${year}/${month}-${day}.json`;
};

export const todaysElectricityPrices = async () => {
  try {
    const formattedDate = format(new Date(), "yyyy MM dd");
    const [year, month, day] = formattedDate.split(" ");

    const response = await fetch(apiUrl(year, month, day));

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    return [data, null];
  } catch (error) {
    return [null, error.message || erro];
  }
};

export const tomorrowsElectricityPrices = async () => {
  try {
    const formattedDate = format(addDays(new Date(), 1), "yyyy MM dd");
    const [year, month, day] = formattedDate.split(" ");

    const response = await fetch(apiUrl(year, month, day));

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    return [data, null];
  } catch (error) {
    return [[], error.message || erro];
  }
};
