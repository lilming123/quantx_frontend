import React from "react"
import {useState} from "react";
import {
    Checkbox,
    Collapse,
    Divider,
    Button,
    InputNumber,
    Layout,
    Select,
    message,
    CheckboxOptionType
} from 'antd';
// import  CalculateController from "@/ts/controller/Calculate"
import {CaretRightOutlined} from "@ant-design/icons";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {CheckboxValueType} from "antd/es/checkbox/Group";
import {getOption, SiderContextType} from "@/assets/fromData";
const { Panel } = Collapse;
const { Sider } = Layout;
const plainOptions = [
    {
        label: '盈利因子',
        value: '盈利因子',

    },
    {
        label: '动量因子',
        value: '动量因子',
    },
    {
        label: '波动率因子',
        value: '波动率因子',

    },{
        label: '非线性规模因子',
        value: '非线性规模因子',

    },
    {
        label: '估值因子',
        value: '估值因子',

    },
    {
        label: '流动性因子',
        value: '流动性因子',

    },
];



const panelStyle = {
    marginBottom: 18,
    border: 'none',
    fontSize: 18,
    backgroundColor:'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};




const defaultCheckedList = ['盈利因子','动量因子','波动率因子','非线性规模因子','估值因子','流动性因子'];


const BasicSider : React.FC<SiderContextType> = ({setFromData}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const { Option } = Select;
    const success = () => {
        messageApi.open({
            type: 'loading',
            content: ' 正在加载中..',
            duration: 0,
        });
        setTimeout(async () => {
            // const rea = await CalculateController.calculate({});
            setFromData(getOption)
        }, 10000);
        setTimeout(messageApi.destroy, 10000);
    };
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [checkAll, setCheckAll] = useState(true);
    const selectBefore = (
        <Select defaultValue="市值因子" style={{ width: 100 }}>
            <Option value="市值因子">市值因子</Option>
            <Option value="β因子">β因子</Option>
        </Select>
    );
    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? defaultCheckedList : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    const onChange = (list:CheckboxValueType[]) => {
        setCheckedList(list as string[]);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };
    return(
    <Sider
    width={250}
    style={{
        backgroundColor: 'white',
        backdropFilter: 'blur(20px)',
        borderRadius: '8px',
        padding: '15px',
        margin:'10px',
        marginTop:'80px',
    }}
>
    <Collapse bordered={false}
              defaultActiveKey={['1','2','3','4']}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              style={{

              }}>
        <Panel header="因子选择" key="1" style={panelStyle}>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} >
                全选
            </Checkbox>
            <Divider />
            <Checkbox.Group
                defaultValue={defaultCheckedList as CheckboxValueType[]} options={plainOptions as CheckboxOptionType[]} value={checkedList} onChange={onChange} />
        </Panel>
        <Panel header="与基准指数的偏离程度" key="2" style={panelStyle}>
            <InputNumber
                style={{
                    marginBottom:15
                }}
                addonBefore="行业偏离程度"
                defaultValue={5}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => {
                    const result = value?.replace('%', '');
                    return Number(result) as 0|5|100;
                }}                />
            <InputNumber
                addonBefore={selectBefore}
                defaultValue={5}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => {
                    const result = value?.replace('%', '');
                    return Number(result) as 0|5|100;
                }}                />
        </Panel>
        <Panel header="股票权重范围" key="3" style={panelStyle}>
            <InputNumber
                style={{
                    marginBottom:15
                }}
                addonBefore="最小值"
                defaultValue={5}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => {
                    const result = value?.replace('%', '');
                    return Number(result) as 0|5|100;
                }}                />
            <InputNumber
                addonBefore="最大值"
                defaultValue={0.1}
                min={0}
                max={100}
                step={0.1}
                formatter={(value) => `${value}%`}
                parser={(value) => {
                    const result = value?.replace('%', '');
                    return Number(result) as 0|100|0.1;
                }}                />
        </Panel>
        {/*<Panel key="4" header="回测区间" style={panelStyle}>*/}

        {/*</Panel>*/}
    </Collapse>
    {contextHolder}
    <Button onClick={success}  style={{
        left: 40,
        marginTop: 15
    }
    } type="primary" size="large" > 生成收益率曲线 </Button>
</Sider>

    )

}
export default BasicSider