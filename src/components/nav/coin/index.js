import {useState} from 'react'
import { useRouter } from 'next/router'
import { Menu } from '@mantine/core';
import moment from 'moment'
import Link from 'next/link'
import axios from 'axios'
export default function Index({coindata}){
    const [CoinList,setCoinList] = useState(coindata ? coindata.coins :[])
    const Total = CoinList && CoinList.reduce((acc, curr) => acc + curr.value, 0);
     async function markAllAsRead(){
        const readall = CoinList.map((m,i)=>{
            if(m.checked === false){
               return {...m,checked:true}                
            }else {
                return {...m}
            }
        })
        setCoinList(readall)

        await axios.put(`/api/coins/readall`,null).then(res=>{
            console.log(res.data)
        })
      }


    return(
           <div className="flex items-center font-[poppins]">
                    <Menu shadow="md" width={300} position = "bottom-end" withArrow transition="pop-bottom-right">
                    <Menu.Target>
                     <div className="relative" onClick={markAllAsRead} >
                      <img src="/assets/icons/wallet.svg" className='h-5 hover:opacity-60 transition cursor-pointer' alt="" />
                      {CoinList && CoinList.some(obj => obj.hasOwnProperty('checked') && obj.checked === false) ?<span className="absolute bg-red-600 w-2 h-2 rounded-full top-0 "></span>:""}
                     </div>
                    </Menu.Target>

                    <Menu.Dropdown >
                     <div className="h-80 p-2 text-xs overflow-y-auto cursor-pointer">
                       <div className="border-b border-gray-300 flex justify-between">
                         <h1 className="font-bold p-1">Recent coins</h1>
                       </div>
                       <div className="mt-1">
                        {
                            CoinList && CoinList.map((m,i)=>{
                                return (
                                       <Menu.Item key={m._id}>
                                         <div className="flex">
                                            <div className="flex flex-col w-11/12">
                                             <div className="flex font-semibold">{m.type}</div>
                                             <div className="flex text-xs">{moment(m.createdAt).format("DD.MM.YYYY")}</div>
                                            </div> 
                                             <div className="flex items-center w-1/12 gap-1 text-xs font-semibold">{m.value}<img src="/assets/icons/coin.svg" className="w-3"/></div>
                                         </div>
                                        </Menu.Item>
                                    )
                            }).sort((a,b)=>b-a)
                        }
                        </div>
                     </div>   
                     <div className="text-xs p-2">Total coins : {Total}</div>
                    <Link href="/coin"><Menu.Item className="text-blue-500 text-xs flex justify-center w-full">Check all coins</Menu.Item></Link>

                    </Menu.Dropdown>
                    </Menu>

                </div>
        )
}

