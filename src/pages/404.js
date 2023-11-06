import Link from 'next/link';


const CustomErrorPage = ({ statusCode }) => {
  const getStatusCodeText = (statusCode) => {
    switch (statusCode) {
      case 404:
        return 'Page not found';
      default:
        return 'An error occurred';
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-[88vh] bg-white">
      <img src="/errorpagebg.png" className="object-cover w-96"/>
      <Link href="/">
        <p className="mt-4 ml-10 rounded-2xl hover:underline bg-yellow-500 hover:border-4 hover:border-b-red-600 p-4 top-50">Go Home</p>
      </Link>
    </div>
  );
};

export default CustomErrorPage;