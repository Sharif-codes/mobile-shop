import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
        something went wrong!
       <Link to="/"> <button className="btn btn-success">Back to home</button></Link>
    </div>
    );
};

export default ErrorPage;