"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/data/products";

export interface CartItem {
    id: string;
    name: string;
    sku?: string;
    slug?: string;
    image: string;
    price?: number;
    age?: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    totalItems: number;
    totalPrice: number;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "lmdpl_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Load cart from localStorage on client mount
    useEffect(() => {
        setIsMounted(true);
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setItems(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Failed to load cart from localStorage", e);
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (!isMounted) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            console.error("Failed to save cart to localStorage", e);
        }
    }, [items, isMounted]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const toggleCart = () => setIsOpen((prev) => !prev);

    const addItem = (product: Product, quantity: number = 1) => {
        setItems((prev) => {
            const existingIndex = prev.findIndex((item) => item.id === product.id);
            if (existingIndex > -1) {
                const next = [...prev];
                next[existingIndex] = {
                    ...next[existingIndex],
                    quantity: next[existingIndex].quantity + quantity,
                };
                return next;
            } else {
                return [
                    ...prev,
                    {
                        id: product.id,
                        name: product.name,
                        sku: product.sku,
                        slug: product.slug,
                        image: product.image,
                        price: product.price,
                        age: product.age,
                        quantity,
                    },
                ];
            }
        });
        setIsOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                totalItems,
                totalPrice,
                openCart,
                closeCart,
                toggleCart,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
