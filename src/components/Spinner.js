import { Spin } from "antd";
import { t } from "i18next";
import './Spinner.css';

function Spinner({text}) {
    return ( 
        <div style={{width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute'}}>
        <div align="center">
        <div className="loader" />
        <br/>
        <br/>
        {text}
        </div>
      </div>
     );
}

export default Spinner;