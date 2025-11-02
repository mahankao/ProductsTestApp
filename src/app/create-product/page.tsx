"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProductsStore } from "@/store/productsStore";
import {Product} from "@/types/product";

export default function CreateProductPage() {
    const router = useRouter();
    const { addProduct } = useProductsStore();

    // Состояния для полей формы
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

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

        const newProduct: Product = {
            id: Date.now() + Math.floor(Math.random() * 10000),
            title,
            description,
            price: Number(price),
            category: "Без категории",
            image,
            liked: false,
            createdAt: new Date().toISOString(),
        };


        // Добавляем продукт в store
        addProduct(newProduct);

        // Перенаправляем на страницу списка продуктов
        router.push("/products");
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <button
                onClick={() => router.push("/products")}
                className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-[#2F5E8C] hover:text-white"
            > Назад
            </button>
            <h1 className="text-3xl font-bold mb-6">Создать продукт</h1>

            {error && (
                <p className="mb-4 text-red-500 font-medium">{error}</p>
            )}

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
                    min={0}
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
                    Создать продукт
                </button>
            </form>
        </div>
    );
}
