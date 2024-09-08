import { BellFilled, BellOutlined, BellTwoTone, CiCircleFilled, UserOutlined } from "@ant-design/icons";
import { errorColor, infoColor, navigationBarBackgroundColor, primaryBorderRadius, primaryColor, silverColor, successColor, white } from "../css";
import { useAppContext } from "../context/AppContext";
import { info } from "sass";
import { Link } from "react-router-dom";
import { Badge, Button, Input, Tooltip, notification } from "antd";
import { useEffect, useState } from "react";
import { getRequests } from "../services/requestsService";

function Navigationbar() {
  const { state, saveRequestsForManager } = useAppContext();

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    getRequests(state.apiToken).then((res) => {
        console.log(res.data);
        saveRequestsForManager(res.data);
    }).catch((err) => {
        console.log(err);
    })
  }, []);

  const lineColor = primaryColor;

    const iconStyle={
        padding: '8px',
        marginLeft: '25px',
        borderRadius: '50%',
        backgroundColor: white,
        fontSize: '18px',
        cursor: 'pointer',
    }

    return ( 
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100vw',
            justifyContent: 'space-between',
            position: 'relative',
            right: '0px',
            borderBottom: '0px solid '+ 'white',
            backgroundColor: primaryColor,
            // background: `linear-gradient(to right,  ${white}, ${white}, ${white}, ${primaryColor})`,
            zIndex: 999,
            color: white,
            // marginBottom: '25px',
        }}>
            <span style={{padding: '18px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                <span style={{ fontSize: '21px'}}> CORE.HR
                </span>  
                <sub style={{fontSize: '13px', fontWeight: '100', paddingLeft: '2px'}}>{state.company?.companyName || 'loading...'}</sub>
            </span>

            {state.isAdmin == false && <div style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '20px',
            }}>
                
            {/* <Input.Search style={{
                width: '200px',
                marginRight: '29px',
            }} placeholder="Quick search" onSearch={() => {}} /> */}
            <Link to='/requests' style={{ textDecoration: 'none', maxHeight: '28px'}}>
            <Badge size="small" count={state.requestsForManager?.length}>
            <Button type="primary" size="small" style={{cursor: 'pointer', fontSize: '13px', padding: '12px 12px',
            border: '1px solid white',
            backgroundColor: white,
            color: primaryColor,
        }}>
                <BellOutlined />
                Requests
            </Button>
            </Badge>
            </Link>

            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;

            {/* <BellOut style={{marginRight: '25px', fontSize: '15px', padding: '6px', borderRadius: '50%', border: '2px solid white'}} /> */}

            <Link style={{textDecoration: 'none', maxHeight: '28px'}} to={`/profile/${state.currentEmployee?.email}`}>
                            <img src={state.currentEmployee?.imageUrl || state.currentEmployee?.firstName.charAt(0) + state.currentEmployee?.lastName.charAt(0)} style={{
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: '2px solid ' + lineColor,
                                outline: '2px solid white',
                                backgroundColor: white,
                                objectFit: 'cover'
                            }} />
                        </Link>

            </div>}
            
            {/* {
            state.selectedTool ? <Tag style={{fontSize: '15px', padding: '3px 10px', border: '0px', left: '15vw', position: 'absolute'}}>{state.selectedTool}</Tag> 
            :
            null
            } */}
            {/* <CiCircleFilled style={{backgroundColor: white, borderRadius: '50%', fontSize: '8px'}}/>  */}
          
          {/* <Tooltip
          title={"Visit Profile"} >
            <div style={{position: 'absolute', right: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '40px'}}>
                        <Link to={`/profile/${state.currentEmployee?.id}`}>
                            <img src={state.currentEmployee?.imageUrl || state.currentEmployee?.firstName.charAt(0) + state.currentEmployee?.lastName.charAt(0)} style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: '3px solid white',
                                outline: '5px solid ' + lineColor,
                                backgroundColor: white,
                                objectFit: 'cover',
                            }} />
                        </Link>
                    </div>
                </Tooltip> */}
        </div>
     );
}

export default Navigationbar;