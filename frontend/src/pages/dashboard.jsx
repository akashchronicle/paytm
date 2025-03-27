import { Appbar } from "../DashComponent/Appbar";
import { Balance } from "../DashComponent/balance";
import { Users } from "../DashComponent/user";

export function Dashboard(){
    return (
        <div>
        <Appbar />
        <div className="m-8">
           
            <Balance value={"10000"}/>
            <Users />
            </div>
        </div>
    )
}