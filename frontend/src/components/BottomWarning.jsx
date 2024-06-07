/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BottomWarning = ({label, buttonText, to}) => {
    return (
        <div className="py-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <Link className="pointer underline p1-1 cursor-pointer" to={to}>{buttonText}</Link>
        </div>
    )
}

export default BottomWarning;