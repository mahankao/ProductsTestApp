"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProductsStore } from "@/store/productsStore";

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();

    const { products, editProduct } = useProductsStore();
    const product = products.find((p) => p.id === Number(id));

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setDescription(product.description);
            setPrice(product.price.toString());
            setImage(product.image);
        }
    }, [product]);

    if (!product) {
        return <p className="p-6 text-center">Товар не найден</p>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !price || !image) {
            setError("Пожалуйста, заполните все поля");
            return;
        }

        if (isNaN(Number(price)) || Number(price) <= 0) {
            setError("Цена должна быть числом больше 0");
            return;
        }

        editProduct(product.id, {
            title,
            description,
            price: Number(price),
            image,
        });

        router.push("/products");
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <button
                onClick={() => router.push("/products")}
                className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-[#2F5E8C] hover:text-white"
            >
                Назад
            </button>

            <h1 className="text-3xl font-bold mb-6">Редактирование продукта</h1>

            {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                    required
                />

                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                    rows={4}
                    required
                />

                <input
                    type="number"
                    placeholder="Цена"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                    step="0.01"
                    min="0"
                    required
                />

                <input
                    type="url"
                    placeholder="Ссылка на картинку"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 transition"
                >
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
}
