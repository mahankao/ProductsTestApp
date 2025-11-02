import { create } from "zustand";
import { Product } from "@/types/product";

interface ProductsState {
    products: Product[];
    showFavorites: boolean;
    searchQuery: string;
    setPage: (page: number) => void;
    currentPage: number;
    fetchProducts: () => Promise<void>;
    addProduct: (product: Product) => void;
    toggleLike: (id: number) => void;
    deleteProduct: (id: number) => void;
    setFilter: (favoritesOnly: boolean) => void;
    setSearch: (query: string) => void;
    editProduct: (id: number, editedData: Partial<Product>) => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    currentPage: 1,
    showFavorites: false,
    searchQuery: "",

    // Загружаем данные из публичного API
    fetchProducts: async () => {
        if (get().products.length > 0) return;

        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const productsWithLikes = data.map((item: Product) => ({
            ...item,
            liked: false,
        }));

        set({ products: productsWithLikes });
    },


    addProduct: (product) => {
        set({
            products: [...get().products, product],
        });
    },

    toggleLike: (id) => {
        set({
            products: get().products.map((p) =>
                p.id === id ? { ...p, liked: !p.liked } : p
            ),
        });
    },

    deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) });
    },

    editProduct: (id: number, editedData: Partial<Product>) => {
        set({
            products: get().products.map(p =>
                p.id === id ? { ...p, ...editedData } : p
            )
        });
    },

    setFilter: (favorites) => set({ showFavorites: favorites }),

    setSearch: (query) => set({ searchQuery: query }),

    setPage: (page) => set({ currentPage: page }),

}));
