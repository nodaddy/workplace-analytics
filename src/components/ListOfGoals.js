import { CaretRightOutlined } from "@ant-design/icons";
import { Bar } from "@ant-design/plots";
import { Alert, Checkbox, Collapse, Progress, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";

function ListOfGoals({items}) {
    const [goals, setGoals] = useState([]);
    useEffect(() => {
        setGoals(items.map(x => { 
            const progressPercent = (x.initiatives?.reduce((a, b) => a + b.achieved ? 1 : 0, 0) + x.keyResults?.reduce((a, b) => a + b.achieved ? 1 : 0, 0))/(x.initiatives?.length + x.keyResults?.length)*100;
            return {key: x.id, label: <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            {x.objective?.description}
            <Tag>{progressPercent}%</Tag>
            </div>, children: <>
            <b style={{fontWeight: '500'}}>Progress:</b>
            <Progress size={'small'} percent={progressPercent} />
            <br/>
            <br/>
            <b style={{fontWeight: '500'}}>Initiatives</b>:
            <ul>
                {x.initiatives?.map(y => <Tooltip title={'Mark as achieved'}><Checkbox>{y.description}</Checkbox></Tooltip>)}
            </ul> 

            <b style={{fontWeight: '500'}}>Key Results</b>:
            <ul>
                {x.keyResults?.map(y => <Tooltip title={'Mark as achieved'}><Checkbox>{y.description}</Checkbox></Tooltip>)}
            </ul>
        </>}}));
    }, [items]);
    return ( items && items.length > 0 ? <>
        <Collapse
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        onChange={()=>{}}
        expandIconPosition={'start'}
        items={goals}
        accordion
      >
      
      </Collapse>
    </> : <Alert style={{ borderRadius: '0px', border: '0px', paddingLeft: '20px'}} showIcon type="warning" message="No goals found, set goals to manage them here!"></Alert> );
}

export default ListOfGoals;