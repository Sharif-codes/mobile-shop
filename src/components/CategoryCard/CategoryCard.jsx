

const CategoryCard = ({categories}) => {
    return (
        <div>
            <div className="rounded-md border-1 shadow-md">
                <figure>
                    <img
                        src={categories.img}
                        alt={categories.name}
                        className=" h-24 md:h-44 lg:h-52 object-fit rounded-t-md " />
                </figure>
                
            </div>
        </div>
    );
};

export default CategoryCard;