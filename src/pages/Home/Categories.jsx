
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useAllCategories from "../../Hooks/useAllCategories";
import mobile from "../../../src/categoryIcon/mobile.png"
import tab from "../../../src/categoryIcon/tablet_icon.png"
import accessories from "../../../src/categoryIcon/accessories.png"
import tv from "../../../src/categoryIcon/tv.png"
import wifi from '../../../src/categoryIcon/wifi.png';


const Categories = () => {
    const [allCategories, categoryLoading] = useAllCategories()
    console.log(allCategories);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    if (categoryLoading) {
        // Optionally render a loading indicator
        return <div>Loading categories...</div>;
    }

    return (
        <div className="w-full min-h-[100px]">
            <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={1500}>
                
                   {
                    allCategories?.map((category, idx) => (
                        <div key={idx} className="p-4 bg-transparent rounded flex flex-col items-center justify-center">
                            <img className="w-24 " src={category.img} alt={category} />
                            <p className="font-semibold text-center">{category.categoryName}</p>
                        </div>
                    ))
                } 
                <div>hq</div>
                <div>hq</div>
                <div>hq</div>
                <div>hq</div>
                
                

            </Carousel>
        </div>

    );
};

export default Categories;