import React, { useState} from 'react';

const UploadProduct = ({brandData}) => {
    // return res.status(200).json({brandProductNo,totalQuizesPlayed:sum.totalQuizesPlayed,totalProductClicked: sum.totalProductClicked,totalClickedOnBuy: sum.totalClickedOnBuy});


  return (
    <div className="flex-1">
  <div className="p-6">
    <h2 className="text-2xl font-semibold mb-4">Analytics</h2>


    <div className="grid grid-cols-2 gap-4">

 {/*     <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-2 text-sm">No of views</h3>
        <p className="text-5xl text-gray-600 font-bold">0</p>
      </div>*/}

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-2 text-sm">No of products</h3>
        <p className="text-5xl text-gray-600 font-bold">{brandData.brandProductNo}</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-2 text-sm">Clicked on Products</h3>
        <p className="text-5xl text-gray-600 font-bold">{brandData.totalProductClicked}</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-2 text-sm">Clicked on buy</h3>
        <p className="text-5xl text-gray-600 font-bold">{brandData.totalClickedOnBuy}</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-2 text-sm">Quizzes Played</h3>
        <p className="text-5xl text-gray-600 font-bold">{brandData.totalQuizesPlayed}</p>
      </div>

 
    </div>
  </div>
</div>
  );
};

export default UploadProduct;
