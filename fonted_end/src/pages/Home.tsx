import {Outlet} from "react-router";
import MyMenu from "./Menu";

const Home = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <MyMenu/>
            <Outlet/>
        </div>
    );
}

export default Home