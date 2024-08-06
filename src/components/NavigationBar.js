import { BellOutlined, UserOutlined } from "@ant-design/icons";

function Navigationbar() {
    const iconStyle={
        border: '1px inset silver',
        padding: '8px',
        borderRadius: '50%'
    }

    return ( 
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px'
        }}>
            <span>CORE</span>
            <span>
                <BellOutlined style={iconStyle}/>
                &nbsp;
                &nbsp;
                <UserOutlined style={iconStyle} />
            </span>
        </div>
     );
}

export default Navigationbar;