"use client";

import { useEffect } from "react";
import { useProductsStore } from "@/store/productsStore";
import { useRouter } from "next/navigation";
import { Heart, Trash, Pencil } from "lucide-react";

export default function ProductsPage() {
    const router = useRouter();

    const {
        products,
        fetchProducts,
        toggleLike,
        setPage,
        currentPage,
        deleteProduct,
        showFavorites: showFavorites,
        setFilter,
        searchQuery,
        setSearch,
    } = useProductsStore();


    const filteredProducts = products
        .filter((p) => !showFavorites || p.liked)
        .filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const itemsOnPage = 8;

    useEffect(() => {
        if (filteredProducts.length === 0) fetchProducts();
    }, [filteredProducts.length, fetchProducts]);

    const startItem = (currentPage - 1) * itemsOnPage;
    const currentItemsOnPage = filteredProducts.slice(startItem, startItem + itemsOnPage);
    const totalPages = Math.ceil(filteredProducts.length / itemsOnPage);



    return (
        <div className="p-6 max-w-12xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Cписок товаров</h1>
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setFilter(false)}
                        className={`px-4 py-2 rounded hover:bg-[#2F5E8C] hover:text-white ${!showFavorites ? "bg-[#2F5E8C] text-white" : "bg-gray-300"}`}>
                    Все
                </button>
                <button onClick={() => setFilter(true)}
                        className={`px-4 py-2 rounded hover:bg-[#2F5E8C] hover:text-white ${showFavorites ? "bg-[#2F5E8C] text-white" : "bg-gray-300"}`}>
                    Избранное
                </button>
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearch(e.target.value)}
                    className="ml-auto px-4 py-2 border rounded w-55 bg-white"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItemsOnPage.map((p) => (
                    <div
                        key={p.id}
                        className="border-1 rounded-lg p-0 cursor-pointer hover:shadow bg-[#B4CDED]"
                        onClick={()=> router.push(`/products/${p.id}`)}>
                        <div className="flex items-center justify-center  rounded-t-lg h-45 bg-white mb-2 p-4">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="h-40 object-contain mb-2"/>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{p.title}</h3>
                            <p className="text-[#1D2835CF] text-sm mb-2 line-clamp-2 h-[2.8rem]">{p.description}</p>
                            <p className="text-xl font-semibold text-blue-500 mb-3">
                                ${p.price}
                            </p>
                            <div className="mt-auto flex gap-4 justify-center">

                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleLike(p.id); }}
                                    className="p-2 rounded bg-gray-100 transition"
                                >
                                    <Heart
                                        className={`w-8 h-6 hover:fill-red-500 hover:stroke-red-500 transition ${
                                            p.liked
                                                ? "fill-red-500 stroke-red-500"
                                                : "stroke-gray-500"
                                        }`}
                                    />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); router.push(`/products/edit/${p.id}`)
                                    }}
                                    className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-400 transition">

                                    <Pencil className="w-8 h-6 stroke-gray-500"></Pencil>
                                </button>

                                <button
                                onClick={(e) => { e.stopPropagation(); deleteProduct(p.id); }}
                                className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-400 transition" >
                                    <Trash className="w-8 h-6 stroke-gray-500"></Trash>
                                </button>

                            </div>
                        </div>
                    </div>
                    ))}
                    {filteredProducts.length === 0 &&
                        ( <p className="col-span-full text-center text-gray-500">
                            Товары не найдены. </p> )}

            </div>
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={` bg-gray-300 rounded p-2 ${currentPage === 1 ? "opacity-50" : 
                        "opacity-100 hover:bg-[#2F5E8C] hover:text-white" }`}
                >
                    ←
                </button>
                {Array.from({length: totalPages}, (_, i) =>
                    (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`rounded p-2 hover:bg-[#2F5E8C] hover:text-white 
                            ${currentPage === i + 1 ? "bg-[#2F5E8C] text-white" : "bg-gray-300" }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                <button
                    onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={` bg-gray-300 rounded p-2 ${currentPage === totalPages ? "opacity-50" :
                        "opacity-100 hover:bg-[#2F5E8C] hover:text-white" }`}
                >
                    →
                </button>
            </div>


        </div>

    )
}
