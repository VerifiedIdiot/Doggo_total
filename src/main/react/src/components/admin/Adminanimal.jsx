import AdminAxiosApi from "../../api/AdminAxios";
import { SideBar } from "../PublicStyle"
import { RightBox } from "./Adminmember"


const Adminanimal = () => {
    
    const HandleDoggy = async () => {
        const BtnDog = async () => {
            try {
                const LoadingDog = await AdminAxiosApi.InsertDog();
    
            } catch (e) {
                console.log("견종도감 로딩에 실패했습니다.");
            };
        };
       BtnDog();
    }
    const Handlekitty = async () => {
        const BtnCat = async () => {
            try {
                const LoadingCat = await AdminAxiosApi.InsertCat();
    
            } catch (e) {
                console.log("묘종도감 로딩에 실패했습니다.");
            };
        };
       BtnCat();
    }

    return (
        <>
            <SideBar>
                <RightBox>
                    <h1>견종, 묘종 Setting</h1>
                    <div className="selectBox">
                        <button className="loadingBtn" onClick={HandleDoggy}>견종 loading</button>
                        <button className="loadingBtn" onClick={Handlekitty}>묘종 loading</button>
                    </div>
                </RightBox>
            </SideBar>
        </>
    );
};

export default Adminanimal;