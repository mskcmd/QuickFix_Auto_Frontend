import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../Config/Firebase";
import { googleLogin } from "../../../Api/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUserCredential } from "../../../app/slice/AuthSlice";
import { Button } from "@nextui-org/react";

function Gauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGooglrAuth = async () => {
    provider.setCustomParameters({ prompt: "select_account" });
    const resultsFromGoogle = await signInWithPopup(auth, provider);
    const data = await googleLogin(
      resultsFromGoogle.user.displayName,
      resultsFromGoogle.user.email,
      resultsFromGoogle.user.photoURL
    );

    if (data?.data.isverified == false) {
      return toast.error(data?.data.message);
    }

    if (data?.data.IsData == false) {
      return toast.error(data?.data.message);
    }
    dispatch(setUserCredential(data?.data.data));
    navigate("/home");
    toast.success("Login succussfilly");
  };

  return (
    <>
      <div className="mt-2 flex justify-center">
        <Button
          onClick={handleGooglrAuth}
          className="w-full bg-black text-white rounded-lg flex items-center px-4 py-2 hover:text-indigo-800 "
        >
          <FcGoogle size={20} />
          Sign Up with Google
        </Button>
      </div>
    </>
  );
}

export default Gauth;
