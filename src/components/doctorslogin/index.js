
const DoctorsLogin = () => {
    return (
       <div className="h-screen flex bg-white">
      
    <div className="max-w-md mx-auto mt-20 w-full p-5 bg-white h-fit border-gray-500 z-10 shadow-lg">
    <h3  className="text-2xl font-semibold">Docs Login</h3>
     <div className="flex flex-col gap-2 w-full mt-5">
        <input className="p-2 w-full border border-gray-300 rounded-xl" placeholder="Email" type="email" name="doctorEmail" required />
        <input className="p-2 w-full border border-gray-300 rounded-xl"  placeholder="ID" type="text" name="doctorID" required />
        <p className="mt-2">Forgot?</p>
        <button className="bg-yellow-500 text-white hover:bg-yellow-600 p-2 rounded-xl">Login</button>
     </div>
          </div>
    </div>
    );
};

export default DoctorsLogin;