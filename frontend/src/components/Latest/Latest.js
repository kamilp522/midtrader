import React, { useEffect, useState } from "react";
import { LatestH2 } from "./LatestElements";
import { Wrapper } from "../UI/Wrapper/Wrapper";

import * as colors from "../variables/colors";

import indicatorService from "../../services/indicators";

import IndicatorChart from "./IndicatorChart/IndicatorChart";
import { options } from "../../Charts/bar_chart_options";
import { latest_content } from "./content";

const Latest = () => {
  const [dataMPMI, setDataMPMI] = useState({ labels: null, datasets: null });
  const [dataSPMI, setDataSPMI] = useState({ labels: null, datasets: null });
  const [dataMichigan, setDataMichigan] = useState({
    labels: null,
    datasets: null,
  });

  useEffect(() => {
    indicatorService
      .getIndicatorChartParams(indicatorService.getDataManPMI)
      .then((response) => {
        setDataMPMI({
          labels: response.labels,
          datasets: [
            { data: response.values, backgroundColor: colors.clr_violet_800 },
          ],
        });
      });
  }, []);

  useEffect(() => {
    indicatorService
      .getIndicatorChartParams(indicatorService.getDataNonManPMI)
      .then((response) => {
        setDataSPMI({
          labels: response.labels,
          datasets: [
            { data: response.values, backgroundColor: colors.clr_violet_800 },
          ],
        });
      });
  }, []);

  useEffect(() => {
    indicatorService
      .getIndicatorChartParams(indicatorService.getDataMichiganSentiment)
      .then((response) => {
        setDataMichigan({
          labels: response.labels,
          datasets: [
            { data: response.values, backgroundColor: colors.clr_violet_800 },
          ],
        });
      });
  }, []);

  return (
    <Wrapper>
      <LatestH2>Latest Economic Data</LatestH2>

      {dataMPMI.datasets ? (
        <IndicatorChart
          title={latest_content.manufacturing_pmi.title}
          interpretation={latest_content.manufacturing_pmi.interpretation}
          options={options}
          data={dataMPMI}
        />
      ) : (
        <div></div>
      )}

      {dataSPMI.datasets ? (
        <IndicatorChart
          title={latest_content.non_manufacturing_pmi.title}
          interpretation={latest_content.non_manufacturing_pmi.interpretation}
          options={options}
          data={dataSPMI}
        />
      ) : (
        <div></div>
      )}

      {dataMichigan.datasets ? (
        <IndicatorChart
          title={latest_content.michigan_sentiment.title}
          interpretation={latest_content.michigan_sentiment.interpretation}
          options={options}
          data={dataMichigan}
        />
      ) : (
        <div></div>
      )}
    </Wrapper>
  );
};

export default Latest;
