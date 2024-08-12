import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { navigationBarBackgroundColor, silverColor, white } from "../css";
import { useAppContext } from "../context/AppContext";
import { Tag } from "antd";

function Navigationbar() {
  const { state } = useAppContext();

    const iconStyle={
        padding: '8px',
        marginLeft: '25px',
        borderRadius: '50%',
        backgroundColor: white,
        fontSize: '18px',
        cursor: 'pointer'
    }

    return ( 
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'fixed',
            left: '0px',
            borderBottom: '2px solid '+ silverColor,
            backgroundColor: navigationBarBackgroundColor,
            zIndex: 999
        }}>
            <span style={{padding: '20px'}}>CORE 
            {/* {
            state.selectedTool ? <Tag style={{fontSize: '15px', padding: '3px 10px', border: '0px', left: '15vw', position: 'absolute'}}>{state.selectedTool}</Tag> 
            :
            null
            } */}
            </span>
            <span style={{padding: '20px'}}>
                <BellOutlined style={iconStyle}/>
                <><UserOutlined style={iconStyle} /></>
            </span>
        </div>
     );
}

export default Navigationbar;