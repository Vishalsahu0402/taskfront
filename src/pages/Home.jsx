import { Link } from "react-router-dom";
import Cards from "../componenets/Cards";


export default function Home() {


    

    return <>
        <div className="bggrd py-4 MINH-100">
            <div className="d-flex justify-content-end px-3"> <Link to={"/addproject"}>
                <button type="button" class=" btn btn-success my-2">Add Project</button>
            </Link>
            </div>
            <h1 className="text-center mb-4">Posts</h1>
            <Cards />
        </div>
    </>;
}