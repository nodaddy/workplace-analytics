import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { silverColor, white } from "../css";
import BackButton from "./BackButton";
import './SideBar.css';
import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { AppstoreOutlined, ArrowRightOutlined, CaretRightFilled, Loading3QuartersOutlined, LoadingOutlined, RightCircleFilled } from "@ant-design/icons";

function SideBar() {
    const {state, saveSelectedTool} = useAppContext();
    const [tools, setTools] = useState([]);

    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if(state.isAdmin != null){
            var tools = state.isAdmin ? state.adminTools : state.tools;
            setTools(tools);
        }
    }, [state.isAdmin]);

    return ( 
        <div
        style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            transition: 'width 0.5s',
            right: '0px',
            width: sidebarOpen ? '100vw' : '50px',
            // width: '15vw',
            // position: 'fixed',
            // left: '0px',
            // height: '100vh',
            zIndex: 9999,
            // border: '2px solid ' + silverColor,
            backgroundColor: white
        }}>
        {true ? <Link to={'/'}>
        {/* <div align="center"><img src="https://cdn.pixabay.com/photo/2016/12/17/15/50/logo-1913689_1280.png" style={{
        width: '70px',
        }} /> 
        </div> */}
        </Link>
        :<BackButton />
        }
          
           <span style={{
                        textDecoration: 'none',
                        fontSize: '13px',
                        borderRadius: '5px',
                        margin: '15px 0px',
                        cursor: 'pointer',
                        fontWeight: '200',
                        padding: '10px 20px'
                    }}>Tools <CaretRightFilled /> </span>
        {
            state.isAdmin == null && <span style={{
                textDecoration: 'none',
                fontSize: '13px',
                borderRadius: '5px',
                margin: '15px 0px',
                cursor: 'pointer',
                fontWeight: '200',
                padding: '10px 0px'
            }}><Loading3QuartersOutlined spin style={{color: 'black'}}/></span>
        }
        {
            tools?.map((tool) => {
                return (
                // <Tooltip title={tool.displayName}>
                <Link
                    to={`/${tool.displayName.toLocaleLowerCase().split(" ").join("")}`}
                    onClick={() => {
                        saveSelectedTool(tool.displayName);
                       // setSidebarOpen(false);
                    }}
                    className="sidebar-menu-item"
                    style={{
                        textDecoration: 'none',
                        fontSize: '13px',
                        borderRadius: '5px',
                        margin: '15px 5px',
                        cursor: 'pointer',
                        color: 'black',
                        fontWeight: '200',
                        padding: '10px 20px',
                        textWrap: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis', display: 'block',
                        backgroundColor: state.selectedTool == tool.displayName ? silverColor : silverColor,
                        border: state.selectedTool == tool.displayName ?  '1px solid ' + '#E0E0E0' : '1px solid ' + white
                    }}>
                        {tool.displayName}
                    </Link>
                    // </Tooltip>
                )
            })
        }
        <br/>
        <br/>
        {state.isAdmin ? <Link 
        onClick={()=>{
            localStorage.removeItem('companyhris');
        }}
         align="center"
        style={{
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '15px',
                        margin: '0px',
                        cursor: 'pointer',
                        color: 'black',
                        fontWeight: '200',
                        padding: '15px 20px',
                        textWrap: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis'
                    }} to="/companyprofile">New Registration</Link> : null}
        </div>
     );
}

export default SideBar;