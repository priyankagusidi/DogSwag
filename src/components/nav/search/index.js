import { useRouter } from "next/router";
import {useState} from "react"

export default function Index(){

   const [searchValue, setSearchValue] = useState("");
   const router = useRouter();


  function handleSearch(e) {
    setSearchValue(e.target.value);
  }

  async function onSearch(e) {
    e.preventDefault();
    // setMenu(false);
    try {
      router.push(`/search/${searchValue}`);
    } catch (err) {
      console.log(err);
    }
  }

  return(
        
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <form onSubmit={onSearch}>
                <input
                  onChange={handleSearch}
                  type="search"
                  id="default-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-600 border border-gray-300 rounded-md bg-gray-50  focus:border-gray-400 outline-0 hover:shadow-md"
                  placeholder="Title, description, breed, category etc.."
                  required
                />
              </form>
            </div>

    )
}

 