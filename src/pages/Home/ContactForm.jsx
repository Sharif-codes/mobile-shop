

const ContactForm = () => {
    return (
        <div className="flex justify-center ">
            <form className="">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input type="text" name="user_name" placeholder="Your Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>
                    <input type="text" name="user_email" placeholder="Your Email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Comment</span>
                    </label>
                    <textarea type="text" name="message" placeholder="Your message" className="input input-bordered" required />

                </div>
                <div className="form-control mt-6">
                    <button className="btn  rounded-md hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 border-0">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;