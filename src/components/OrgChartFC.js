import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";

function OrgChartFC() {
    const {state} = useContext(AppContext);
    const { t } = useTranslation();

    return ( 
        <>
          {t('description.part1')}  
        </>
     );
}

export default React.memo(OrgChartFC);