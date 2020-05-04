import React, {useState, useEffect} from "react";
import Topbar from "../components/Topbar/Topbar";
import Separator from "../components/Separator/Separator";
import Foot from "../components/Foot/Foot";
import TourHead from "../components/TourHead/TourHead";
import TourDescription from "../components/TourDescription/TourDescription";
import TourImages from "../components/TourImages/TourImages";
import PopDown from "../components/PopDown/PopDown";

function Tour() {
    const [ showPopDown, setShowPopDown ] = useState({
        prevScrollPos: window.pageYOffset,
        visible: false
    });

    const handleScroll = () => {
        const { prevScrollPos } = showPopDown;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollPos < currentScrollPos && currentScrollPos > 70;

        setShowPopDown(state => ({
            prevScrollPos: currentScrollPos,
            visible
        }))
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll])

    return (
        <>
            <Topbar transparent={true} isLogged={true}/>
            <TourHead />
            <TourDescription />
            <Separator />
            <TourImages />
            <Separator />
            <Foot />
            <PopDown show={showPopDown.visible}/>
        </>
    )
}

export default Tour