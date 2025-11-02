"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductsStore } from "@/store/productsStore";
import { Heart, Trash2 } from "lucide-react";

export default function ProductPage() {
    const router = useRouter();
    const { id } = useParams();

    const { products, fetchProducts, toggleLike, deleteProduct } = useProductsStore();

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return <p className="p-6 text-center">Загрузка...</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <button
                onClick={() => router.push("/products")}
                className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-[#2F5E8C] hover:text-white"
            >
                Назад
            </button>

            <div className="bg-white rounded shadow p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-64 h-64 object-contain bg-gray-50 rounded"
                    />

                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <p className="text-xl font-semibold text-blue-500 mb-6">
                                ${product.price}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => toggleLike(product.id)}
                                className="p-2 rounded bg-gray-200 transition"
                            >
                                <Heart
                                    className={`w-6 h-6 hover:fill-red-500 hover:stroke-red-500 transition ${
                                        product.liked
                                            ? "fill-red-500 stroke-red-500"
                                            : "stroke-gray-500"
                                    }`}
                                />
                            </button>

                            <button
                                onClick={() => {
                                    deleteProduct(product.id);
                                    router.push("/products");
                                }}
                                className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
