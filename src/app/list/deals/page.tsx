"use client";

import { useEffect, useState } from "react";

import { getList } from "@/actions/list/listServices";
import ProductCard from "@/domains/product/components/productCard";
import { TListItem } from "@/domains/store/productList/types";
import { IMAGE_BASE_URL } from "@/shared/constants/store";

const TopDeals = () => {
  const [products, setProducts] = useState<TListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        
        const response = await getList("/list/deals", { sortName: "price", sortType: "asc" }, {
          brands: [],
          stockStatus: "all",
          priceMinMax: [0, 0],
          priceMinMaxLimitation: [0, 0]
        });

        if (response.products) {
         
          const dealsProducts = response.products.filter(product => product.salePrice !== null);
          setProducts(dealsProducts);
        }
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="mt-[180px] min-h-screen bg-white">
      <div className="storeContainer py-8">
        <h1 className="text-3xl font-light mb-6">Top Deals</h1>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-[300px] bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                imgUrl={[IMAGE_BASE_URL + product.images[0], IMAGE_BASE_URL + product.images[1]]}
                name={product.name}
                price={product.price}
                isAvailable={product.isAvailable}
                dealPrice={product.salePrice || undefined}
                specs={product.specialFeatures}
                url={"/product/" + product.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No deals available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopDeals;