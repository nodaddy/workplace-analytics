import { ApartmentOutlined } from "@ant-design/icons";
import { leavesBannerColor, silverColor, white } from "../css";

function ToolBanner({title, subTitle, icon}) {
    return ( 
        <div style={{ marginBottom: '40px', background: leavesBannerColor, color: white, display: 'flex', alignItems: 'center', padding: '20px 20px', position: 'sticky', top: '0px', zIndex: '999'}}>
                    <span style={{fontSize: '35px'}}>
                    {icon}
                    </span>
                    <div style={{marginLeft: '18px'}}>
                    <h2 style={{fontWeight: '300', margin: '0px'}}>{title}</h2>
                    <span> {subTitle} </span>
                    </div>
        </div>
     );
}

export default ToolBanner;