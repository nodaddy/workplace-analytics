import { Spin } from "antd";
import { t } from "i18next";
import './spinner.css';

function Spinner({text, height}) {
    return ( 
        <div style={{width: '100%', height: height ? height : '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', color: 'grey'}}>
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