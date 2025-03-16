import { useState } from "react";
import { todaysElectricityPrices, tomorrowsElectricityPrices } from "../API/electricityApi";
import { formatCurrentDate, formatDate, formatPrice } from "../utils/formatting";
import { useQuery } from "@tanstack/react-query";

import Wrapper from "../components/Wrapper";
import BarChart from "../components/BarChart";
import DataCard from "../components/DataCard";
import Switch from "../components/Switch";
import Loader from "../components/Loader";

const currentHour = formatCurrentDate();

const ChartHeader = ({ value, tomorrowData, showTomorrowData, handleToggle, t }) => {
  return (
    <div className="flex justify-between px-4 py-2 items-start border-b border-border bg-background-500 -m-2">
      <div className="flex-col">
        <span className="text-light text-2xl text-text">
          {t("price")} {t("now")}
        </span>
        <div className="flex gap-2 items-end">
          <span className="text-primary-500 text-3xl font-bold ">{value}</span>
          <span className="text-light text-lg text-text">{t("centsPerKwh")}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <Switch
          label={t("showTomorrow")}
          checked={showTomorrowData}
          disabled={!tomorrowData || tomorrowData.length === 0}
          onClick={handleToggle}
        />
        <span className="text-end text-sm px-2 opacity-60 text-text">{t("tomorrowNote")}</span>
      </div>
    </div>
  );
};

const makeChartData = (data) => {
  if (!data) return [];
  return data.reduce((acc, curr) => {
    const priceHour = formatDate(curr.time_start);
    const cents = formatPrice(curr.EUR_per_kWh).toFixed(2);
    acc.push({ label: priceHour, value: cents });
    return acc;
  }, []);
};

const priceExtremes = (data) => {
  if (!data) return { min: { value: 0, hour: null }, max: { value: 0, hour: null } };

  let minObj = data[0];
  let maxObj = data[0];

  data.forEach((obj) => {
    if (obj.EUR_per_kWh < minObj.EUR_per_kWh) minObj = obj;
    if (obj.EUR_per_kWh > maxObj.EUR_per_kWh) maxObj = obj;
  });

  return {
    min: { value: formatPrice(minObj.EUR_per_kWh), hour: formatDate(minObj.time_start) },
    max: { value: formatPrice(maxObj.EUR_per_kWh), hour: formatDate(maxObj.time_start) },
  };
};

const averagePrice = (data) => {
  if (!data) return 0;
  const values = data.map((e) => formatPrice(e.EUR_per_kWh));
  return (
    values.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0) / data.length
  );
};

const currentPrice = (data) => {
  if (!data) return 0;
  const price = data.find((e) => formatDate(e.time_start) === formatCurrentDate())?.EUR_per_kWh;
  return formatPrice(price).toFixed(2);
};

const ElectricityPriceData = ({ t }) => {
  const [showTomorrowData, setShowTomorrowData] = useState(false);

  const {
    data: todayData,
    error: todayError,
    isPending: todayPending,
  } = useQuery({ queryKey: ["today"], queryFn: todaysElectricityPrices });

  const {
    data: tomorrowData,
    error: _tomorrowError,
    isPending: tomorrowPending,
  } = useQuery({
    queryKey: ["tomorrow"],
    queryFn: tomorrowsElectricityPrices,
    retry: (failureCount, error) => {
      if (error.response?.status === 404) return false;
      return failureCount < 2;
    },
  });

  if (todayError) return null;

  const todaysChartData = makeChartData(todayData);
  const tomorrowsChartData = showTomorrowData ? makeChartData(tomorrowData) : [];

  const { min, max } = priceExtremes(todayData);
  const avgPrice = averagePrice(todayData);
  const currPrice = currentPrice(todayData);

  const handleToggle = (e) => {
    setShowTomorrowData((previous) => !previous);
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full h-full p-4">
        {todayPending || tomorrowPending ? (
          <div className="flex justify-center w-full h-full">
            <Loader />
          </div>
        ) : (
          <>
            <div className="flex gap-4 w-full h-1/2">
              <Wrapper>
                <DataCard title={t("mostExpensive")} subtitle={max.hour} value={max.value} unit={t("centsPerKwh")} />
              </Wrapper>
              <Wrapper>
                <DataCard title={t("leastExpensive")} subtitle={min.hour} value={min.value} unit={t("centsPerKwh")} />
              </Wrapper>
              <Wrapper>
                <DataCard title={t("average")} subtitle="0:00 - 24:00" value={avgPrice} unit={t("centsPerKwh")} />
              </Wrapper>
            </div>
            <Wrapper>
              <BarChart
                series={[
                  { name: `${t("price")} ( ${t("centsPerKwh")} )`, data: todaysChartData.map(({ value }) => value) },
                  {
                    name: `${t("price")} ${t("tomorrow")} ( ${t("centsPerKwh")} )`,
                    type: "line",
                    data: tomorrowsChartData.map(({ value }) => value),
                  },
                ]}
                header={
                  <ChartHeader
                    value={currPrice}
                    tomorrowData={tomorrowData}
                    showTomorrowData={showTomorrowData}
                    handleToggle={handleToggle}
                    t={t}
                  />
                }
                labels={todaysChartData.map(({ label }) => label)}
                highlight={currentHour}
                options={{ tickAmount: 12 }}
              />
            </Wrapper>
          </>
        )}
      </div>
    </>
  );
};

export default ElectricityPriceData;
