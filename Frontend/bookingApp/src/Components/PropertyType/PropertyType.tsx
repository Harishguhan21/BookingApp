import * as React from "react";
import useFetch from "../../Hooks/useFetch";

const PropertyType = () => {
  const { data }: any = useFetch(
    `${import.meta.env.VITE_API_KEY}/api/hotels/getBytype`
  );
  const images = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1597047084993-bf337e09ede0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc29ydHN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1662048504895-f11b7c3b8cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmlsYXN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1681922761648-d5e2c3972982?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiaW5zfGVufDB8fDB8fHww",
  ];

  return (
    <div>
      <h1 className="font-bold text-2xl">Browse by Property Type</h1>
      <div className="flex flex-wrap justify-center">
        {data.map((item: any, index: number) => {
          return (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 p-4">
              <div className="">
                <img src={images[index]} className="h-full w-full" />
                <div className="mx-4">
                  <h1 className="text-2xl font-bold capitalize">{item.type}</h1>
                  <p>
                    {item.count} {item.type}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyType;
