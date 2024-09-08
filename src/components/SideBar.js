import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { primaryColor, primaryTextColor, silverColor, white } from "../css";
import BackButton from "./BackButton";
import './SideBar.css';
import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { AppstoreOutlined, ArrowRightOutlined, CaretRightFilled, Loading3QuartersOutlined, LoadingOutlined, RightCircleFilled } from "@ant-design/icons";

function SideBar() {
    const {state, saveSelectedTool} = useAppContext();
    const [tools, setTools] = useState([]);

    useEffect(() => {
        if(state.isAdmin != null && state.tools != null) {
            // alert('s');
            var toolss = state.isAdmin ? state.adminTools : state.tools;
            setTools(toolss);
        }
    }, [state.isAdmin, state.tools]);

    return ( 
        <div
        style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            transition: 'width 0.5s',
            right: '0px',
            width: '50px',
            // width: '15vw',
            // position: 'fixed',
            // left: '0px',
            // height: '100vh',
            zIndex: 9999,
            // border: '2px solid ' + silverColor,
            backgroundColor: white,
            color: primaryColor
        }}>
        {true ? <Link to={'/'}>
        {/* <div align="center"><img src="https://cdn.pixabay.com/photo/2016/12/17/15/50/logo-1913689_1280.png" style={{
        width: '70px',
        }} /> 
        </div> */}
        </Link>
        :<BackButton />
        }
          
           {/* <span style={{
                        textDecoration: 'none',
                        fontSize: '13px',
                        borderRadius: '5px',
                        marginLeft: '20px',
                        cursor: 'pointer',
                        fontWeight: '200',
                        padding: '10px 20px',
                        backgroundColor: primaryColor,
                        color: white
                    }}>Tools <CaretRightFilled /> </span> */}
        {
            (state.isAdmin == null || state.tools == null) && <span style={{
                textDecoration: 'none',
                fontSize: '13px',
                borderRadius: '5px',
                margin: '15px 0px',
                cursor: 'pointer',
                fontWeight: '200',
                padding: '10px 0px',
            }}><Loading3QuartersOutlined spin style={{color: 'black', marginLeft: '20px'}}/></span>
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
                        fontSize: '14px',
                        // borderRadius: '5px',
                        margin: '15px 20px',
                        cursor: 'pointer',
                        color: state.selectedTool == tool.displayName ?  primaryColor : primaryTextColor,
                        fontWeight: '200',
                        padding: '10px 1px',
                        textWrap: 'nowrap', textOverflow: 'ellipsis', display: 'block',
                        borderBottom: state.selectedTool == tool.displayName ?  '1px solid ' + primaryColor : '1px solid ' + white
                    }}>
                        {tool.displayName}
                    </Link>
                    // </Tooltip>
                )
            })
        }
        {
            state.isAdmin && state.adminTools?.map((tool) => {
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
                        fontSize: '14px',
                        // borderRadius: '5px',
                        margin: '15px 20px',
                        cursor: 'pointer',
                        color: state.selectedTool == tool.displayName ?  primaryColor : primaryTextColor,
                        fontWeight: '200',
                        padding: '10px 1px',
                        textWrap: 'nowrap', textOverflow: 'ellipsis', display: 'block',
                        borderBottom: state.selectedTool == tool.displayName ?  '1px solid ' + primaryColor : '1px solid ' + white
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
            window.location.reload();
        }}
         align="center"
        style={{
                        textDecoration: 'none',
                        fontSize: '14px',
                        margin: '0px',
                        cursor: 'pointer',
                        color: 'black',
                        fontWeight: '200',
                        padding: '15px 20px',
                        textWrap: 'nowrap', overflow: 'auto'
                    }} to="/companyprofile">New Registration</Link> : null}
        </div>
     );
}

export default SideBar;