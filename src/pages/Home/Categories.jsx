import CategoryCard from "../../components/CategoryCard/CategoryCard";


const Categories = () => {
   
    const categoriesData= [
        {
            id: 1,
            name: "Samsung",
            img: "https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$"
        },
        {
            id: 2,
            name: "Vivo",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTucXbasq2KXQpLMVKf4vmFX0OhYy1MXSrYDw&s"
        },
        {
            id:3,
            name: "Apple",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCD6cl92WdvaHCBq4ySNtAt6IC-vI6J-mxmQ&s"
        },
        {
            id:3,
            name: "Apple",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCD6cl92WdvaHCBq4ySNtAt6IC-vI6J-mxmQ&s"
        }
    ]
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
            {categoriesData.map(item=><CategoryCard key={item.id} categories={item}></CategoryCard> )}
          
        </div>
    );
};

export default Categories;