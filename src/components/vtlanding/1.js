import Link from "next/link"

const VetChatHeader =()=>{
    return (
        <div  className="max-w-5xl mx-auto text-center py-10">
            <div className="font-Jumper text-5xl ">
               {`When it comes to your DOG, What You Don't Know Hurts`}
            </div>
            <p className="mt-10 font-Inter text-gray-600">{`Learn everything about dogs Get to  know your dogs From trusted EXPERTS`}</p>
        <div className="flex justify-center mx-auto mb-8 mt-8">
          <img src="/assets/img/Chat.png" alt="" />
        </div>
        <p className="mt-10 font-Inter text-gray-600">{`DogSwag in partnership with Bangalore Pet Hospital brings to you The First Edition of `}<br/><span className="text-[#8138E0]">{`Vet Talk`}</span> </p>
    </div>
    )
}

export default VetChatHeader