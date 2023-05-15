import React, { useEffect, useState, useContext } from "react";
import Graphin, { Components, Behaviors, GraphinContext, IG6GraphEvent } from '@antv/graphin';
import { INode, NodeConfig, IEdge } from '@antv/g6';
import Moveable from "react-moveable";
import { ContextMenu, FishEye, Toolbar } from '@antv/graphin-components';
import {
    BoxPlotOutlined,
    BarChartOutlined,
    HeatMapOutlined,
    DotChartOutlined,
    DeleteFilled,
    ExpandAltOutlined,
    QuestionCircleOutlined,
    CloudDownloadOutlined,
    EyeOutlined,
    BranchesOutlined,
    AimOutlined,
    InfoCircleFilled,
    ForkOutlined,
    FullscreenOutlined,
    DeleteOutlined,
    CloseCircleOutlined,
    RedditOutlined,
    ShareAltOutlined,
    CloseOutlined
} from '@ant-design/icons';
import type { TooltipValue, LegendChildrenProps, LegendOptionType } from '@antv/graphin';
import DataArea from './DataArea';
import {
    message, Descriptions, Switch, Button, Select, Empty, Menu as AntdMenu,
} from 'antd';
import { makeDataSource, layouts } from './utils';
import type {
    OnNodeMenuClickFn, OnEdgeMenuClickFn, GraphNode,
    OnClickEdgeFn, OnClickNodeFn, GraphEdge, OnCanvasMenuClickFn,
    AdjacencyList
} from "./typings";
import ShowPaths from './Components/ShowPaths';
import { GraphLayoutPredict } from '@antv/vis-predict-engine';
import voca from 'voca';
import './GraphinWrapper.less';

const { MiniMap, SnapLine, Tooltip, Legend } = Components;

const {
    ZoomCanvas, ActivateRelations, ClickSelect, Hoverable,
    FitView, DragNodeWithForce, DragNode, LassoSelect, BrushSelect,
} = Behaviors;

const { Menu } = ContextMenu;

const snapLineOptions = {
    line: {
        stroke: 'lightgreen',
        lineWidth: 1,
    },
};

type EdgeMenuProps = {
    onChange?: OnEdgeMenuClickFn,
    chatbotVisible?: boolean,
    onExplainRelationship?: OnEdgeMenuClickFn,
    item?: IG6GraphEvent['item'];
}

const EdgeMenu = (props: EdgeMenuProps) => {
    const { graph, apis } = useContext(GraphinContext);
    const { item, chatbotVisible, onExplainRelationship } = props;

    const [visible, setVisible] = useState<boolean>(false);
    const [sourceNode, setSourceNode] = useState<GraphNode | undefined>(undefined);
    const [targetNode, setTargetNode] = useState<GraphNode | undefined>(undefined);
    const [edge, setEdge] = useState<GraphEdge | undefined>(undefined);

    useEffect(() => {
        if (item) {
            const edge = item.getModel() as GraphEdge;
            const source = graph.findById(edge.source).getModel() as GraphNode;
            const target = graph.findById(edge.target).getModel() as GraphNode;

            if (source && target && edge) {
                setSourceNode(source);
                setTargetNode(target)
                setEdge(edge)
                setVisible(true)
            }
        } else {
            setVisible(false)
            setSourceNode(undefined);
            setTargetNode(undefined)
            setEdge(undefined)
        }
    }, [])

    const options = [
        {
            key: 'show-edge-details',
            icon: <InfoCircleFilled />,
            label: 'Show Edge Details',
        },
        {
            key: 'explain-relationship',
            icon: <RedditOutlined />,
            label: 'Explain Relationship (Experimental)',
        },
        {
            key: 'analyze-with-clinical-data',
            icon: <BarChartOutlined />,
            label: 'Analyze with Clinical Data',
            children: [
                {
                    key: 'barchart',
                    icon: <BarChartOutlined />,
                    label: 'Bar Chart',
                },
                {
                    key: 'boxchart',
                    icon: <BoxPlotOutlined />,
                    label: 'Box Plot',
                },
                {
                    key: 'heatmap',
                    icon: <HeatMapOutlined />,
                    label: 'Heatmap',
                },
                {
                    key: 'scatterchart',
                    icon: <DotChartOutlined />,
                    label: 'Scatter Chart',
                },
            ]
        },
        {
            key: 'analyze-with-omics-data',
            icon: <AimOutlined />,
            label: 'Analyze with Omics Data',
            children: [
                {
                    key: 'heatmap-omics',
                    icon: <HeatMapOutlined />,
                    label: 'Heatmap',
                },
                {
                    key: 'scatterchart-omics',
                    icon: <DotChartOutlined />,
                    label: 'Scatter Chart',
                },
            ]
        }
    ];

    if (chatbotVisible) {
        options.push({
            key: 'ask-question',
            icon: <QuestionCircleOutlined />,
            label: 'Ask Chatbot',
            children: [
                {
                    key: 'what-is-the-relationship',
                    icon: <BranchesOutlined />,
                    label: `What is the relationship between the two nodes?`,
                }
            ]
        })
    }

    const onChange = function (menuItem: any) {
        if (props.onChange && sourceNode && targetNode && edge && graph && apis) {
            props.onChange(menuItem, sourceNode, targetNode, edge, graph, apis)
            setVisible(false);
        } else {
            message.warn("Cannot catch the changes.")
        }
    }

    return visible ? <AntdMenu items={options} onClick={onChange} /> : null;
}

type NodeMenuProps = {
    onChange?: OnNodeMenuClickFn,
    chatbotVisible?: boolean,
    item?: IG6GraphEvent['item'];
}

const NodeMenu = (props: NodeMenuProps) => {
    const { graph, apis } = useContext(GraphinContext);
    const { item, chatbotVisible } = props;

    const [visible, setVisible] = useState<boolean>(false);

    console.log("NodeMenu", props.item)

    const [node, setNode] = useState<GraphNode | undefined>(undefined);

    useEffect(() => {
        if (item && item._cfg) {
            const nodeModel = item.getModel() as GraphNode;

            // Don't worry about the type of nodeModel.
            setNode(nodeModel)
            setVisible(true)
        } else {
            setVisible(false)
            setNode(undefined)
        }
    }, [])

    const options: any[] = [
        {
            key: 'show-node-details',
            icon: <InfoCircleFilled />,
            label: 'Show Node Details',
        },
        {
            key: 'expand-one-level',
            icon: <ExpandAltOutlined />,
            label: 'Expand One Level',
        },
        {
            key: 'expand-selected-nodes',
            icon: <FullscreenOutlined />,
            label: 'Expand Selected Nodes',
        },
        {
            key: 'reverse-selected-nodes',
            icon: <CloseCircleOutlined />,
            label: 'Reverse Selected Nodes',
        },
        {
            key: 'expand-all-paths',
            icon: <ShareAltOutlined />,
            label: 'Expand Paths (Within 3 Steps)',
            children: [
                {
                    key: 'expand-all-paths-1',
                    icon: <ShareAltOutlined />,
                    label: 'Within 1 Step',
                },
                {
                    key: 'expand-all-paths-2',
                    icon: <ShareAltOutlined />,
                    label: 'Within 2 Step',
                },
                {
                    key: 'expand-all-paths-3',
                    icon: <ShareAltOutlined />,
                    label: 'Within 3 Step',
                },
            ]
        },
        // {
        //     key: 'tag',
        //     icon: <TagFilled />,
        //     name: 'Tag Node',
        // },
        {
            key: 'delete-nodes',
            icon: <DeleteFilled />,
            label: 'Delete Selected Node(s)',
            danger: true,
        },
    ];

    if (chatbotVisible) {
        options.push({
            key: 'ask-question',
            icon: <QuestionCircleOutlined />,
            label: 'Ask Chatbot',
            children: [
                {
                    key: 'what-is-the-node',
                    icon: <EyeOutlined />,
                    label: `What is the node?`,
                }
            ]
        })
    }

    const onChange = function (menuItem: any) {
        // Only need to change the status of the nodes, so no need to call the onChange function.
        if (menuItem.key === 'reverse-selected-nodes') {
            graph.getNodes().forEach(node => {
                if (node.hasState('selected')) {
                    graph.setItemState(node, 'selected', false);
                } else {
                    graph.setItemState(node, 'selected', true);
                }
            })

            if (node) {
                // Reset the status of the current node to unselected, even if it is not selected.
                graph.setItemState(node.id, 'selected', false);
            }

            setVisible(false);
        } else {
            if (props.onChange && node && graph && apis) {
                props.onChange(menuItem, node, graph, apis)
                setVisible(false);
            } else {
                message.warn("Cannot catch the changes.")
            }
        }
    }

    return visible ? <AntdMenu items={options} onClick={onChange} /> : null;
}

type CanvasMenuProps = {
    onCanvasClick?: OnCanvasMenuClickFn,
    handleOpenFishEye?: () => void,
    onClearGraph?: () => void,
}

const CanvasMenu = (props: CanvasMenuProps) => {
    const { graph, contextmenu, apis } = useContext(GraphinContext);
    const context = contextmenu.canvas;
    const handleDownload = () => {
        graph.downloadFullImage('canvas-contextmenu');
        context.handleClose();
    };

    const handleAutoConnect = () => {
        if (props.onCanvasClick) {
            props.onCanvasClick({
                key: 'auto-connect',
                name: 'AutoConnect',
            }, graph, apis);
        }
    };

    const handleClear = () => {
        // TODO: It doesn't work well. why?
        // graph.clear();
        if (props.onClearGraph) {
            props.onClearGraph();
            message.info(`Clear canvas successfully`);
        } else {
            message.warn(`Cannot clear canvas`);
        }
        context.handleClose();
    };

    // const handleStopLayout = () => {
    //     message.info(`Stop layout successfully`);
    //     graph.stopAnimate();
    //     context.handleClose();
    // };

    const handleOpenFishEye = () => {
        if (props.handleOpenFishEye) {
            props.handleOpenFishEye();
        }
    };

    return (
        <Menu bindType="canvas">
            <Menu.Item onClick={handleAutoConnect}>
                <ForkOutlined /> Auto Connect
            </Menu.Item>
            <Menu.Item onClick={handleOpenFishEye}>
                <EyeOutlined /> Enable FishEye
            </Menu.Item>
            <Menu.Item onClick={handleClear}>
                <DeleteOutlined /> Clear Canvas
            </Menu.Item>
            {/* <Menu.Item onClick={handleStopLayout}>
                <CloseCircleOutlined /> Stop Layout
            </Menu.Item> */}
            <Menu.Item onClick={handleDownload}>
                <CloudDownloadOutlined /> Download Layout
            </Menu.Item>
        </Menu>
    );
};

const CustomHoverable = (props: {
    bindType?: 'node' | 'edge';
    disabled?: boolean;
}) => {
    const { bindType, disabled } = props;
    const { graph } = useContext(GraphinContext);
    const [enableHoverable, setEnableHoverable] = useState<boolean>(false);

    // TODO: How to disable hoverable when there are multiple nodes selected?
    // useEffect(() => {
    //     const selectedNodes = graph.getNodes().filter(node => {
    //         return node.getStates().includes('selected')
    //     })
    //     setEnableHoverable(selectedNodes.length > 1)
    // }, [])

    return <Hoverable bindType={bindType} disabled={enableHoverable || disabled} />
}

const NodeLabelVisible = (props: {
    visible: boolean
}) => {
    const { visible } = props;

    const graph = useContext(GraphinContext).graph;

    useEffect(() => {
        graph.getNodes().forEach(node => {
            graph.updateItem(node, {
                style: {
                    // @ts-ignore
                    label: {
                        visible: visible,
                    },
                }
            })
        })
    }, [visible]);
    return null;
};

const EdgeLabelVisible = (props: {
    visible: boolean;
}) => {
    const { visible } = props;
    const graph = useContext(GraphinContext).graph;

    useEffect(() => {
        graph.getEdges().forEach(edge => {
            graph.updateItem(edge, {
                style: {
                    // @ts-ignore
                    label: {
                        visible: visible,
                    },
                }
            })
        })
    }, [visible]);
    return null;
};

const HighlightNode = (props: { selectedNode?: string }) => {
    if (props.selectedNode) {
        // More details on https://graphin.antv.vision/graphin/quick-start/interface
        const { graph } = useContext(GraphinContext);
        const nodes = graph.getNodes();
        const edges = graph.getEdges();
        // More details on https://graphin.antv.vision/graphin/render/status

        // Clear all status
        nodes.forEach(node => {
            graph.setItemState(node, 'inactive', false);
            graph.setItemState(node, 'active', false);
        });

        // Highlight the selected node.
        nodes.forEach(node => {
            const model = node.getModel();

            if (props.selectedNode && props.selectedNode !== model.id) {
                console.log("UnSelected Node: ", props.selectedNode, model.id)
                graph.setItemState(node, 'inactive', true);
            } else {
                console.log("Selected Node: ", props.selectedNode, model.id)
                graph.setItemState(node, 'active', true);
            }
        });
    }
    return null;
}

const FocusBehavior = (props: { queriedId?: string, onClickNode?: (nodes: GraphNode) => void }) => {
    const { graph, apis } = useContext(GraphinContext);

    useEffect(() => {
        // 初始化聚焦到查询节点
        if (props.queriedId) {
            apis.focusNodeById(props.queriedId);
        }

        const handleClick = (evt: IG6GraphEvent) => {
            const node = evt.item as INode;
            const model = node.getModel() as NodeConfig;
            apis.focusNodeById(model.id);

            if (props.onClickNode) {
                props.onClickNode(node.getModel() as GraphNode);
            }
        };

        // 每次点击聚焦到点击节点上
        graph.on('node:click', handleClick);

        return () => {
            graph.off('node:click', handleClick);
        };
    }, []);

    return null;
};

const NodeClickBehavior = (props: { onClick?: OnClickNodeFn }) => {
    const { graph, apis } = useContext(GraphinContext);

    useEffect(() => {
        const handleClick = (evt: IG6GraphEvent) => {
            if (props.onClick) {
                const node = evt.item as INode;
                const model = node.getModel() as GraphNode;
                props.onClick(model.id, model);
            }
        };

        graph.on('node:click', handleClick);
        return () => {
            graph.off('node:click', handleClick);
        };
    }, []);
    return null;
};

const EdgeClickBehavior = (props: { onClick?: OnClickEdgeFn }) => {
    const { graph, apis } = useContext(GraphinContext);

    useEffect(() => {
        const handleClick = (evt: IG6GraphEvent) => {
            if (props.onClick) {
                const edge = evt.item as IEdge;
                const model = edge.getModel() as GraphEdge;
                const startNode = graph.findById(model.source).getModel() as GraphNode;
                const endNode = graph.findById(model.target).getModel() as GraphNode;
                props.onClick(model.relid, startNode, endNode, model);
            }
        };

        graph.on('edge:click', handleClick);
        return () => {
            graph.off('edge:click', handleClick);
        };
    }, []);
    return null;
};

const NodeSearcher = () => {
    const { graph, apis } = useContext(GraphinContext);

    const [searchLoading, setSearchLoading] = useState(false);
    const [nodeOptions, setNodeOptions] = useState<any[]>([]);

    const handleNodeSelectorChange = (value: string) => {
        console.log("handleNodeSelectorChange: ", value)
        if (value) {
            apis.focusNodeById(value);
        }
    }

    const handleNodeSearch = (value: string) => {
        console.log("handleNodeSearch: ", value)
        setSearchLoading(true);
        if (value) {
            const nodeOptions: any[] = [];
            graph.getNodes().forEach(node => {
                const model = node.getModel() as NodeConfig & GraphNode;
                console.log("handleNodeSearch: ", model)
                if ((model.label && model.label.toLowerCase().includes(value.toLowerCase()))
                    || (model.data.name && model.data.name.toLowerCase().includes(value.toLowerCase()))) {
                    nodeOptions.push({
                        label: `${model.id} | ${model.data.name}`,
                        value: model.id,
                    })
                }
            });
            setNodeOptions(nodeOptions);
            setSearchLoading(false);
        } else {
            setNodeOptions([]);
            setSearchLoading(false);
        }
    }

    return (
        <Select
            className="node-searcher"
            showSearch
            allowClear
            loading={searchLoading}
            defaultActiveFirstOption={false}
            showArrow={true}
            placement={"topRight"}
            placeholder={"Search nodes"}
            onSearch={handleNodeSearch}
            onChange={handleNodeSelectorChange}
            options={nodeOptions}
            filterOption={false}
            notFoundContent={<Empty description={
                searchLoading ? "Searching..." :
                    (nodeOptions !== undefined ? "Not Found" : `Enter your interested node ...`)
            } />}
        >
        </Select>
    )
}

export type GraphinProps = {
    selectedNode?: string;
    data: any;
    layout: any;
    style: React.CSSProperties;
    containerId?: string;
    changeLayout?: (layout: any) => void;
    onNodeMenuClick?: OnNodeMenuClickFn;
    onEdgeMenuClick?: OnEdgeMenuClickFn;
    onCanvasMenuClick?: OnCanvasMenuClickFn;
    queriedId?: string;
    statistics: any;
    chatbotVisible?: boolean;
    toolbarVisible?: boolean;
    onClickNode?: OnClickNodeFn;
    onClickEdge?: OnClickEdgeFn;
    onClearGraph?: () => void;
    className?: string;
    children?: React.ReactNode;
}

type GraphinSettings = {
    autoPin: boolean;
    nodeLabelVisible: boolean;
    edgeLabelVisible: boolean;
    nodeTooltipEnabled: boolean;
    edgeTooltipEnabled: boolean;
    selectedNodeEnabled: boolean;
    selectionMode: string;
    focusNodeEnabled: boolean;
    miniMapEnabled: boolean;
    snapLineEnabled: boolean;
    infoPanelEnabled: boolean;
}

const defaultSettings: GraphinSettings = {
    autoPin: false,
    nodeLabelVisible: true,
    edgeLabelVisible: true,
    nodeTooltipEnabled: true,
    edgeTooltipEnabled: false,
    selectedNodeEnabled: true,
    selectionMode: "brush-select",
    focusNodeEnabled: false,
    miniMapEnabled: true,
    snapLineEnabled: true,
    infoPanelEnabled: true,
}

const GraphinWrapper: React.FC<GraphinProps> = (props) => {
    const explanationPanelRef = React.useRef<HTMLDivElement>(null);
    const {
        data, style, onNodeMenuClick,
        onEdgeMenuClick, selectedNode, onCanvasMenuClick
    } = props
    const [fishEyeVisible, setFishEyeVisible] = useState(false);
    const [explanationPanelVisible, setExplanationPanelVisible] = useState(false);

    const [settings, setSettings] = useState<GraphinSettings>({} as GraphinSettings);

    const [currentEdge, setCurrentEdge] = useState<any>(null);
    const [currentNode, setCurrentNode] = useState<any>(null);
    const [focusedNodes, setFocusedNodes] = useState<GraphNode[]>([]);
    const [adjacencyList, setAdjacencyList] = useState<AdjacencyList>({} as AdjacencyList); // Adjacency list for the current graph

    const ref = React.useRef(null);

    // All initializations
    // Save the node or edge when the context menu is clicked.
    useEffect(() => {
        loadSettings();

        if (ref && ref.current && ref.current.graph) {
            ref.current.graph.on("edge:contextmenu", e => {
                setCurrentEdge(e.item)
            })
            ref.current.graph.on("node:contextmenu", e => {
                setCurrentNode(e.item)
            })
        }
    }, [])

    useEffect(() => {
        // TODO: how to force update the layout, the following code doesn't work.
        if (ref.current && ref.current.graph) {
            console.log("Updating layout: ", props.layout);
            ref.current.graph.updateLayout(props.layout);
            ref.current.graph.refreshPositions();
        }
    }, [props.layout])

    useEffect(() => {
        // create a map to hold the adjacency list
        const adjacencyList = new Map();
        for (const node of data.nodes) {
            adjacencyList.set(node.id, []);
        }
        for (const edge of data.edges) {
            adjacencyList.get(edge.source).push(edge.target);
            adjacencyList.get(edge.target).push(edge.source);
        }
        setAdjacencyList(adjacencyList);
    }, [data]);

    const handleOpenFishEye = () => {
        setFishEyeVisible(true);
    };

    const onCloseFishEye = () => {
        setFishEyeVisible(false);
    };

    const onClickNodeInFocusMode = (node: GraphNode) => {
        setFocusedNodes(prevState => [...prevState, node]);
    }

    const onClosePathsFinder = () => {
        setFocusedNodes([]);
    }

    const HoverText: React.FC<{ data: Record<string, any>, style: any }> = ({ data, style }) => {
        console.log("HoverText: ", data)
        const dataSource = makeDataSource(data, ["comboId", "degree", "depth", "layoutOrder", "x", "y", "type", "category"])
        const items = Object.keys(dataSource).map(key => {
            if (dataSource[key]) {
                return (
                    <Descriptions.Item key={key} label={voca.titleCase(key)} style={{ height: '50px', overflowY: 'scroll' }}>
                        {dataSource[key]}
                    </Descriptions.Item>
                )
            } else {
                return null
            }
        })
        return (
            items.length > 0 ?
                (<Descriptions size={"small"} column={1} title={null} bordered style={style}>
                    {items}
                </Descriptions>)
                : (<span style={style}>No Properties</span>)
        )
    }

    const options = { enabledStack: true, filterCenter: true }

    const onChangeLegend = (checkedValue: LegendOptionType, options: LegendOptionType[]) => {
        console.log(checkedValue, options);
    };

    const loadSettings = (settingId: string = 'graphin-settings') => {
        const settings = JSON.parse(localStorage.getItem(settingId) || '{}')
        if (Object.keys(settings).length === 0) {
            setSettings(defaultSettings)
        } else {
            setSettings(settings)
            message.success('Settings loaded')
        }
    }

    return (
        data && <Graphin ref={ref} layoutCache options={options} data={data} layout={props.layout} style={style}>
            <FitView></FitView>
            {/* BUG?: This seems like it doesn't work. Maybe we need a new layout algorithm. */}
            <DragNodeWithForce autoPin={settings.autoPin} />
            {/* TODO: Cannot work. To expect all linked nodes follow the draged node. */}
            <DragNode />
            <ZoomCanvas />
            {
                settings.selectionMode == "lasso-select" ?
                    <LassoSelect />
                    : null
            }
            {
                settings.selectionMode == "brush-select" ?
                    <BrushSelect />
                    : null
            }
            <NodeLabelVisible visible={settings.nodeLabelVisible} />
            {/* BUG: Cannot restore the label of edges */}
            <EdgeLabelVisible visible={settings.edgeLabelVisible} />
            <FishEye options={{}} visible={fishEyeVisible} handleEscListener={onCloseFishEye} />
            <HighlightNode selectedNode={selectedNode}></HighlightNode>
            {
                !settings.selectedNodeEnabled ?
                    <CustomHoverable bindType="node" />
                    : null
            }
            {
                !settings.selectedNodeEnabled ?
                    <CustomHoverable bindType="edge" />
                    : null
            }
            {
                !settings.selectedNodeEnabled ?
                    <ActivateRelations disabled={settings.selectedNodeEnabled} />
                    : null
            }
            <ContextMenu style={{ width: '160px' }}>
                <NodeMenu chatbotVisible={props.chatbotVisible}
                    item={currentNode} onChange={(menuItem, data, graph, graphin) => {
                        // Clear the current node when the context menu is closed, elsewise the node menu cannot be opened again.
                        setCurrentNode(null);
                        onNodeMenuClick && onNodeMenuClick(menuItem, data, graph, graphin);
                    }} />
            </ContextMenu>
            <ContextMenu style={{ width: '160px' }} bindType="canvas">
                <CanvasMenu handleOpenFishEye={handleOpenFishEye}
                    onCanvasClick={(menuItem, graph, graphin) => {
                        // Clear the current node & edge when the context menu is closed
                        setCurrentNode(null);
                        setCurrentEdge(null);
                        onCanvasMenuClick && onCanvasMenuClick(menuItem, graph, graphin);
                    }} onClearGraph={props.onClearGraph} />
            </ContextMenu>
            <ContextMenu style={{ width: '160px' }} bindType="edge">
                <EdgeMenu item={currentEdge} chatbotVisible={props.chatbotVisible}
                    onChange={(menuItem, source, target, edge, graph, apis) => {
                        // Clear the current edge when the context menu is closed, elsewise the edge menu cannot be opened again.
                        setCurrentEdge(null);

                        // TODO: How to generate explanation report for the edge?
                        if (menuItem.key == 'explain-relationship') {
                            setExplanationPanelVisible(true)
                        }

                        if (onEdgeMenuClick) {
                            onEdgeMenuClick(menuItem, source, target, edge, graph, apis)
                        }
                    }} />
            </ContextMenu>
            <Legend bindType="node" sortKey="nlabel">
                {(renderProps: LegendChildrenProps) => {
                    console.log('renderProps', renderProps);
                    return <Legend.Node {...renderProps} onChange={onChangeLegend} />;
                }}
            </Legend>
            {props.toolbarVisible ?
                <Toolbar style={{
                    top: 'unset', right: '5px',
                    bottom: '45px', left: 'unset',
                    marginBottom: '0px', opacity: 0.8,
                }}>
                    <Toolbar.Item>
                        <Select style={{ width: '100%' }} allowClear
                            defaultValue={props.layout.type}
                            onChange={(value) => {
                                // TODO: Need to notice the user that the layout is changed, but it's not working when the previous layout is not finished.
                                if (value == 'auto') {
                                    GraphLayoutPredict.predict(data).then((layout) => {
                                        console.log("Predicted layout: ", layout)
                                        const l = layouts.find(item => item.type === layout.predictLayout);
                                        message.info(`Predicted layout: ${layout.predictLayout}`);
                                        if (props.changeLayout) {
                                            props.changeLayout(l);
                                        }
                                    }).catch((err) => {
                                        console.log(err)
                                        message.error(`Failed to predict layout: ${err.message}`);
                                    })
                                } else if (value == 'graphin-force') {
                                    message.warn(`The layout '${value}' may not work well with the device which doesn't support GPU.`);
                                    const l = layouts.find(item => item.type === value);
                                    if (props.changeLayout) {
                                        props.changeLayout(l);
                                    }
                                } else {
                                    const l = layouts.find(item => item.type === value);
                                    if (props.changeLayout) {
                                        props.changeLayout(l);
                                    }
                                }
                            }}
                            placeholder="Select a layout">
                            {
                                layouts.map(item => {
                                    const { type } = item;
                                    return (
                                        <Select.Option key={type} value={type}>
                                            <ForkOutlined />
                                            &nbsp;
                                            {type}
                                        </Select.Option>
                                    );
                                })
                            }
                        </Select>
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Select style={{ width: '100%' }} allowClear
                            defaultValue={"brush-select"}
                            disabled={!settings.selectedNodeEnabled}
                            onChange={(value) => {
                                setSettings({ ...settings, selectionMode: value })
                            }}
                            placeholder="Select a selection mode">
                            {
                                ["brush-select", "lasso-select"].map(item => {
                                    return (
                                        <Select.Option key={item} value={item}>
                                            <ForkOutlined />
                                            &nbsp;
                                            {voca.titleCase(item)}
                                        </Select.Option>
                                    );
                                })
                            }
                        </Select>
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, selectedNodeEnabled: checked })
                        }} checked={settings.selectedNodeEnabled} />
                        Select Mode
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, focusNodeEnabled: checked })
                        }} checked={settings.focusNodeEnabled} />
                        Focus Mode
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, autoPin: checked })
                        }} checked={settings.autoPin} disabled />
                        Auto Pin
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, nodeLabelVisible: checked })
                        }} checked={settings.nodeLabelVisible} />
                        Node Label
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, edgeLabelVisible: checked })
                        }} checked={settings.edgeLabelVisible} />
                        Edge Label
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, nodeTooltipEnabled: checked })
                        }} checked={settings.nodeTooltipEnabled} />
                        Node Tooltip
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, edgeTooltipEnabled: checked })
                        }} checked={settings.edgeTooltipEnabled} />
                        Edge Tooltip
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, miniMapEnabled: checked })
                        }} checked={settings.miniMapEnabled} />
                        MiniMap
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, snapLineEnabled: checked })
                        }} checked={settings.snapLineEnabled} />
                        SnapLine
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Switch onChange={(checked) => {
                            setSettings({ ...settings, infoPanelEnabled: checked })
                        }} checked={settings.infoPanelEnabled} />
                        Info Panel
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Button type="primary" size="small" style={{ width: '100%' }} onClick={() => {
                            localStorage.setItem('graphin-settings', JSON.stringify(settings))
                            message.success('Settings saved')
                        }}>Save Settings</Button>
                    </Toolbar.Item>
                    <Toolbar.Item>
                        <Button danger size="small" style={{ width: '100%' }} onClick={() => {
                            loadSettings()
                        }}>Load Settings</Button>
                    </Toolbar.Item>
                </Toolbar>
                : null
            }

            <NodeSearcher></NodeSearcher>

            {settings.focusNodeEnabled ?
                <>
                    <FocusBehavior queriedId={props.queriedId} onClickNode={onClickNodeInFocusMode} />
                    <ShowPaths selectedNodes={focusedNodes} nodes={data.nodes} edges={data.edges}
                        onClosePathsFinder={onClosePathsFinder} adjacencyList={adjacencyList}
                        // TODO: hard code here, need to be fixed
                        algorithm={data.edges.length > 500 ? 'bfs' : 'dfs'} />
                </>
                : null
            }
            {
                // TODO: generate explanations for the current edge
                // 1. Get the current edge, the source node and target node
                // 2. Send the source node and target node to the backend and get the prompt (markdown format) which contains the prompt and api codes for retrieving context information
                // 3. Send the markdown to the backend and get the filled markdown
                // 4. Send the filled markdown to LLM and generate explanations by using `rethinking with retrieval` method
                // 5. Show the filled markdown in the explanation panel
                (currentEdge && explanationPanelVisible) ?
                    <div className='explanation-panel'
                        style={{
                            top: '200px',
                            right: '200px'
                        }}>
                        <div ref={explanationPanelRef} style={{
                            position: "absolute",
                            width: "400px",
                            maxWidth: "auto",
                            maxHeight: "auto",
                        }} className="explanation-content">
                            <div className="explanation-title">
                                <h3>Explanation</h3>
                                <CloseOutlined className="explanation-close" onClick={() => {
                                    setExplanationPanelVisible(false)
                                }} />
                            </div>
                            <div className='explanation-info'>
                                TODO: generate explanations for the current edge<br />
                                1. Get the current edge, the source node and target node<br />
                                2. Send the source node and target node to the backend and get the prompt (markdown format) which contains the prompt and api codes for retrieving context information<br />
                                3. Send the markdown to the backend and get the filled markdown<br />
                                4. Send the filled markdown to LLM and generate explanations by using `rethinking with retrieval` method<br />
                                5. Show the filled markdown in the explanation panel<br />
                            </div>
                        </div>
                        {/* More details on https://daybrush.com/moveable/storybook/index.html?path=/story/basic--basic-resizable */}
                        <Moveable
                            target={explanationPanelRef}
                            draggable={true}
                            throttleDrag={1}
                            edgeDraggable={false}
                            startDragRotate={0}
                            throttleDragRotate={0}
                            onDrag={e => {
                                e.target.style.transform = e.transform;
                            }}
                            resizable={true}
                            keepRatio={false}
                            throttleResize={1}
                            renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
                            onResize={e => {
                                e.target.style.width = `${e.width}px`;
                                e.target.style.height = `${e.height}px`;
                                e.target.style.transform = e.drag.transform;
                            }}
                        />
                    </div>
                    : null
            }
            {(settings.selectedNodeEnabled && !settings.focusNodeEnabled) ?
                <ClickSelect multiple={true} trigger={"shift"}></ClickSelect>
                : null
            }
            {(!settings.selectedNodeEnabled && !settings.focusNodeEnabled) ?
                <NodeClickBehavior onClick={props.onClickNode}></NodeClickBehavior>
                : null
            }
            {(!settings.selectedNodeEnabled && !settings.focusNodeEnabled) ?
                <EdgeClickBehavior onClick={props.onClickEdge}></EdgeClickBehavior>
                : null
            }
            {settings.nodeTooltipEnabled ?
                <Tooltip bindType="node" hasArrow placement="bottom" style={{ opacity: 0.9 }}>
                    {(value: TooltipValue) => {
                        if (value.model) {
                            const { model } = value;
                            return (
                                <HoverText data={model} style={{ padding: '10px', width: 'fit-content', maxWidth: '400px' }}></HoverText>
                            );
                        }
                        return null;
                    }}
                </Tooltip>
                : null}
            {settings.edgeTooltipEnabled ?
                <Tooltip bindType="edge" hasArrow placement="bottom" style={{ opacity: 0.9 }}>
                    {(value: TooltipValue) => {
                        if (value.model) {
                            const { model } = value;
                            return (
                                <HoverText data={model} style={{ padding: '10px', width: 'fit-content' }}></HoverText>
                            );
                        }
                        return null;
                    }}
                </Tooltip>
                : null}
            {settings.miniMapEnabled ? <MiniMap /> : null}
            {settings.snapLineEnabled ? <SnapLine options={snapLineOptions} visible /> : null}
            {settings.infoPanelEnabled ?
                <DataArea data={props.statistics}
                    style={{
                        position: 'absolute', top: '0px',
                        left: '0px', zIndex: 1
                    }}>
                </DataArea>
                : null
            }
            {props.children ? props.children : null}
        </Graphin>
    );
}

export default GraphinWrapper;