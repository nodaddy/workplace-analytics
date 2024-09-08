import { ApartmentOutlined } from "@ant-design/icons";
import { infoColor, leavesBannerColor, primaryColor, silverColor, white } from "../css";

function ToolBanner({title, subTitle, icon}) {
    return ( 
        <div style={{ 
            marginBottom: '40px',
            background: primaryColor,
            color: white,
            padding: '0px 0px',
            paddingBottom: '0px',
            position: 'sticky',
            top: '0px',
            zIndex: '999'}}>
                {/* <span style={{fontSize: '35px'}}>
                {icon}
                </span> */}
                <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'flex-start',
                    marginLeft: '0px', borderRadius: '0px', backgroundColor: silverColor, color: primaryColor,
                padding: '25px 20px',
                }}>
                    <span style={{fontSize: '30px', fontWeight: '300', marginRight: '16px'}}>
                {icon}
                </span>

                <div style={{width: '100%'}}>
                <div style={{fontWeight: '500', margin: '0px', fontSize: '21px'}}>{title}</div>
                <span style={{
                    fontSize: '14px',
                    fontWeight: '100',
                }}> {subTitle} </span>
                </div>
                </div>
        </div>
     );
}

export default ToolBanner;