import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";


const MechanicLoggedOut = () => {

    const { mechanicData } = useAppSelector((state) => state.auth);    
    if (mechanicData) {

        return <Navigate to="/mechanic/home/dashbord"/>
    } else {
        return <Outlet />
    }

}

export default MechanicLoggedOut;