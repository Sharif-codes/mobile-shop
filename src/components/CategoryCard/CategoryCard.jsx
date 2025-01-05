

const CategoryCard = ({categories}) => {
    return (
        <div>
            <div className="rounded-md border-1 shadow-md">
                <figure>
                    <img
                        src={categories.img}
                        alt={categories.name}
                        className="w-full h-60 object-cover rounded-t-md " />
                </figure>
                
            </div>
        </div>
    );
};

export default CategoryCard;