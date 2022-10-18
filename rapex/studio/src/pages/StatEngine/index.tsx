import type { ProFormColumnsType } from '@ant-design/pro-form';
import { GridContent } from '@ant-design/pro-layout';
import { Col, message, Row, Spin, Tabs } from 'antd';
import type { StaticContext } from 'react-router';
import type { RouteComponentProps } from 'react-router-dom';
import { useIntl } from 'umi';

import {
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import './index.less';

// Custom Component
import ArgumentForm from './components/ArgumentForm';
import MarkdownViewer from './components/MarkdownViewer';
import Resizer from './components/Resizer';
import ResultPanel from './components/ResultPanel';

// Custom DataType
import type { ChartResult, DataItem } from './components/ChartList/data';
type UIContext = Record<string, any>;

// Custom API
import { getChartTask, getChartUiSchema, postChart } from './services/StatEngine';

// Custom Data
import { langData } from './lang';

const { TabPane } = Tabs;

const StatEngine: React.FC<any & RouteComponentProps<{}, StaticContext>> = (props) => {
  const intl = useIntl();

  console.log('StatEngine Props: ', props);

  const uiContext: UIContext = {};
  Object.keys(langData).forEach((key) => {
    uiContext[key] = intl.formatMessage(langData[key]);
  });

  const [leftSpan, setLeftSpan] = useState<number>(8);
  const [resizeBtnActive, setResizeBtnActive] = useState<boolean>(false);

  // Left Panel
  const [currentActiveKey, setCurrentActiveKey] = useState<string>('arguments');

  // Chart
  const [currentChart, setCurrentChart] = useState<string | null>('');
  const [markdownLink, setMarkdownLink] = useState<string>('');
  const [argumentColumns, setArgumentColumns] = useState<ProFormColumnsType<DataItem>[]>([]);

  const [resultData, setResultData] = useState<ChartResult | undefined>({
    results: [],
    charts: [],
    task_id: '',
    log: '',
  });

  // Result
  const [resultLoading, setResultLoading] = useState<boolean>(false);

  useEffect(() => {
    // More details on https://v3.umijs.org/docs/routing#routing-component-parameters
    const chart = props.route.chart;
    if (chart) {
      setCurrentChart(chart);
    } else {
      setCurrentChart('boxplot');
    }
  }, [props.route.chart]);

  const setChart = (chart: string, result?: ChartResult) => {
    getChartUiSchema({ chart_name: chart }).then((response) => {
      const schema = {
        ...response.schema,
      };

      // Reset README
      setMarkdownLink(response.readme);

      // Reset Argument
      setArgumentColumns(schema.fields);
    });

    if (result) {
      setResultData(result);
    } else {
      setResultData(undefined);
    }
  };

  const selectItem = useCallback(setChart, []);

  const changeDataTab = (key: string) => {
    setCurrentActiveKey(key);
  };

  // For debug
  // useEffect(() => {
  //   autoFetchTask("f318ff50-4ad3-11ed-a5b3-c6aea7bb5ffb")
  // }, true)

  const autoFetchTask = (taskId: string) => {
    const interval = setInterval(() => {
      if (taskId.length > 0) {
        getChartTask({ id: taskId })
          .then((resp) => {
            if (resp.status === 'Finished') {
              setResultData({
                results: resp.response.results,
                charts: resp.response.charts,
                log: resp.response.log,
                task_id: resp.response.task_id,
              });
              setResultLoading(false);
              message.success('Load chart...');
              clearInterval(interval);
            } else if (resp.status === 'Failed') {
              setResultData({
                results: resp.response.results,
                charts: resp.response.charts,
                log: resp.response.log,
                task_id: resp.response.task_id,
              });
              setResultLoading(false);
              message.error('Something wrong, please check the log for more details.');
              clearInterval(interval);
            }
          })
          .catch((error) => {
            console.log('Get Task Error: ', error);
            clearInterval(interval);
          });
      }
    }, 1000);
  };

  const onSubmit = (values: any) => {
    const chartName: string = currentChart || '';
    console.log('onSubmit Chart: ', currentChart, values);
    return new Promise<ChartResult>((resolve, reject) => {
      postChart({ chart_name: chartName }, values)
        .then((response) => {
          console.log('Post Chart: ', response);
          message.success(`Create the chart ${chartName} successfully.`);
          setResultLoading(true);
          autoFetchTask(response.task_id);
          // resolve(response);
        })
        .catch((error) => {
          message.warn('Unknown error, please retry later.');
          console.log('Post Chart Error: ', error);
          reject(error);
        });
    });
  };

  const getRightSpan = (customLeftSpan: number): number => {
    return 24 - customLeftSpan ? 24 - customLeftSpan : 24;
  };

  useEffect(() => {
    if (currentChart) {
      selectItem(currentChart, resultData);
    }
  }, [currentChart, resultData, selectItem]);

  return (
    <GridContent>
      <Spin spinning={resultLoading} style={{ marginTop: '50px' }}>
        <Row className="stat-engine" gutter={8}>
          <Col className="left" xxl={leftSpan} xl={leftSpan} lg={leftSpan} md={24} sm={24} xs={24}>
            <Row className="left__content">
              <Col className="left__tabs">
                <Tabs
                  onChange={(key) => {
                    changeDataTab(key);
                  }}
                  activeKey={currentActiveKey}
                  defaultActiveKey="arguments"
                  className="left__tabs__arguments"
                >
                  <TabPane
                    tab={
                      <span>
                        <CheckCircleOutlined />
                        {uiContext.arguments}
                      </span>
                    }
                    key="arguments"
                  >
                    <ArgumentForm
                      labelSpan={24}
                      height="calc(100% - 10px)"
                      onSubmit={onSubmit}
                      columns={argumentColumns}
                    ></ArgumentForm>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <InfoCircleOutlined />
                        {uiContext.summary}
                      </span>
                    }
                    key="summary"
                  >
                    <MarkdownViewer url={markdownLink} />
                  </TabPane>
                </Tabs>
              </Col>
              <Resizer
                className="left__divider"
                HoverHandler={setResizeBtnActive}
                ClickHandler={setLeftSpan}
                btnActive={resizeBtnActive}
              ></Resizer>
            </Row>
          </Col>
          <Col
            className="right"
            xxl={getRightSpan(leftSpan)}
            xl={getRightSpan(leftSpan)}
            lg={getRightSpan(leftSpan)}
            md={24}
            sm={24}
            xs={24}
          >
            <Row className="right__content">
              <ResultPanel
                currentChart={currentChart}
                results={resultData?.results || []}
                charts={resultData?.charts || []}
                taskId={resultData?.task_id || ''}
                responsiveKey={leftSpan}
                logLink={resultData?.log || ''}
                onClickItem={selectItem}
              ></ResultPanel>
            </Row>
          </Col>
        </Row>
      </Spin>
    </GridContent>
  );
};

export default StatEngine;
