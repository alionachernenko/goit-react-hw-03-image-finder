import { ThreeDots } from "react-loader-spinner";
import { LoaderDots } from "./Loader.styled";

export const Loader = () => {
    return (
        <LoaderDots>
            <ThreeDots/>
        </LoaderDots>
    )
}