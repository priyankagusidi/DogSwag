import {useState,useEffect} from 'react'
import moment from 'moment'

export default function Coins({userdata,coindata}){
	console.log(coindata)
    const [CoinList,setCoinList] = useState(coindata ? coindata.coins :[])
    console.log(CoinList)
    const Total = CoinList && CoinList.reduce((acc, curr) => acc + curr.value, 0);

	return(
		  <div className="mt-10">
		  <div className="max-w-xl bg-white rounded-md mx-auto p-5">
		      <h1 className="text-2xl">Coins</h1>
		      <div className="grid gap-2">

		      <div className="flex font-bold">
		         <div className="flex w-11/12 border-b-2">
		            <div className="">Recent coin activity</div>
		         </div>
		         <div className="flex w-1/12 border-b-2">Value</div>
		      </div>

		      {
		         	CoinList && CoinList.map((m,i)=>{
		         		return (
		         			  <div className="flex" key={m._id}>
		         			    <div className="flex flex-col w-11/12">
						         <div className="flex font-semibold">{m.type}</div>
						         <div className="flex text-xs">{moment(m.createdAt).format("DD.MM.YYYY")}</div>
						        </div> 
						         <div className="flex items-center w-1/12 gap-1 text-xs font-semibold">{m.value}<img src="/assets/icons/coin.svg" className="w-3"/></div>
						      </div>
		         			)
		         	})
		         }
		  </div>
		  <div className="flex justify-center gap-2 border-t mt-5 p-2">
		     <div className="font-bold">Total</div>
		     <div>{Total}</div>
		  </div>
		  </div>

		  </div>
		)
}