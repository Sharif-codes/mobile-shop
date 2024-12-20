import CategoryCard from "../../components/CategoryCard/CategoryCard";


const Categories = () => {
    const count = [1,2,3]
    return (
        <div className="grid grid-cols-3 gap-2">
            {count.map(item=><CategoryCard key={item}></CategoryCard> )}
          
        </div>
    );
};

export default Categories;