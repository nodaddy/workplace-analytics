import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { silverColor, white } from "../css";
import BackButton from "./BackButton";
import './SideBar.css';

function SideBar() {
    const {state, saveSelectedTool} = useAppContext();
    return ( 
        <div
        style={{
            width: '15vw',
            position: 'fixed',
            left: '0px',
            height: '100vh',
            paddingTop: '110px',
            border: '2px solid ' + silverColor
        }}>
        <BackButton />
        <br/>
        <br/>
        
        {
            state.tools.map((tool) => {
                return (
                // <Tooltip title={tool.displayName}>
                <Link
                    to={`/${tool.displayName.toLocaleLowerCase().split(" ").join("")}`}
                    onClick={() => {
                        saveSelectedTool(tool.displayName);
                    }}
                    className="sidebar-menu-item"
                    style={{
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '15px',
                        width: '100%',
                        cursor: 'pointer',
                        color: 'black',
                        fontWeight: '200',
                        padding: '15px 0px',
                        textWrap: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis', display: 'inline-block',
                        backgroundColor: state.selectedTool == tool.displayName ? silverColor : white
                    }}>
                        &nbsp; &nbsp; &nbsp; {tool.displayName}
                    </Link>
                    // </Tooltip>
                )
            })
        }
        </div>
     );
}

export default SideBar;