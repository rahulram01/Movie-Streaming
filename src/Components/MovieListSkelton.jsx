function MovieListSkeleton() {
  const dummyList = [1, 2, 3, 4];

  return (
    <div>
      {dummyList.map((item, index) => (
        <div key={index} className="mb-32">
          <div className="animate-pulse h-[30px] mb-5 w-[200px] bg-gray-400 rounded-md"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dummyList.map((innerItem, innerIndex) => (
              <div key={innerIndex} className="animate-pulse m-3">
                <div className="h-[200px] w-full bg-gray-400 rounded-md"></div>
                <div className="h-[20px] w-full mt-4 bg-gray-400 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieListSkeleton;
