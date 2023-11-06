const VetChatHomeSection = () => {
    return (
        <section className="my-20 max-w-5xl mx-auto font-Jumper px-5">
            <div className="container">
                <div className="grid gap-10">
                    <div className="grid lg:gap-10 lg:grid-cols-2">
                        <div></div>
                        <div className="py-10 md:py-20 px-10 bg-[#76E4DA] rounded-2xl lg:max-w-xl ml-auto">
                            <p className="text-2xl md:text-4xl font-thin uppercase leading-[70px]">
                                Everything about Puppies
                            </p>
                        </div>
                    </div>
                    <div className="grid lg:gap-10 lg:grid-cols-2">
                        <div className="py-10 md:py-20 px-10 bg-[#F47892] rounded-2xl lg:max-w-md lg:ml-auto lg:relative lg:-mt-20">
                            <p className="text-2xl md:text-4xl font-thin uppercase leading-[70px]">
                                Senior Dogs
                            </p>
                        </div>
                        <div></div>
                    </div>
                    <div className="grid lg:gap-10 lg:grid-cols-2">
                        <div></div>
                        <div className="py-10 md:py-20 px-10 bg-[#B188E5] rounded-2xl lg:max-w-2xl lg:relative lg:-ml-20 lg:mt-10">
                            <p className="text-2xl md:text-4xl font-thin uppercase leading-[70px]">
                                Dogs in different stages of their life
                            </p>
                        </div>
                    </div>
                    <div className="lg:grid lg:gap-10 lg:grid-cols-2">
                        <div className="py-10 md:py-20 px-10 bg-[#FFCB07] rounded-2xl">
                            <p className="text-2xl md:text-4xl font-thin uppercase leading-[70px]">
                                Natural Remedies, Tips, and Tricks
                                </p>
                           </div>
                        <div></div>
                    </div>
                    <div className="grid lg:gap-10 lg:grid-cols-2">
                        <div></div>
                        <div className="py-10 md:py-20 px-10 bg-[#A9E40B] rounded-2xl">
                            <p className="text-2xl md:text-4xl font-thin uppercase leading-[70px]">
                                Breed specific bare it all information
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default VetChatHomeSection