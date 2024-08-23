import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { navigationBarBackgroundColor, silverColor, white } from "../css";
import { useAppContext } from "../context/AppContext";

function Navigationbar() {
  const { state } = useAppContext();

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
            justifyContent: 'space-between',
            width: '100vw',
            position: 'relative',
            right: '0px',
            borderBottom: '1px solid '+ 'silver',
            backgroundColor: navigationBarBackgroundColor,
            zIndex: 999,
            // marginBottom: '25px',
        }}>
            <span style={{padding: '20px'}}>CORE 
            {/* {
            state.selectedTool ? <Tag style={{fontSize: '15px', padding: '3px 10px', border: '0px', left: '15vw', position: 'absolute'}}>{state.selectedTool}</Tag> 
            :
            null
            } */}
            </span>

            <div style={{position: 'absolute', right: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '26px'}}>
                        <img src="https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg" style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            border: '4px solid white',
                            outline: '1px solid gray',
                            backgroundColor: white,
                            objectFit: 'cover',
                        }} />
                    </div>
        </div>
     );
}

export default Navigationbar;