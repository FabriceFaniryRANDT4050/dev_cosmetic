import Siderbar from "../components/Sidebar";
import ProductCard from "../components/Gallery";
export default function Produit(){
    return(
        <div className="flex flex-wrap">
            <aside>{<Siderbar/>}</aside>
            <section>{<ProductCard/>}</section>
        </div>
    )
}