import React from "react";
import Header from "@/components/layout/Header";
import GridLayout from "@/components/layout/GridLayout";

export default function Home() {
    return (
        <main className="bg-white text-black min-h-screen">
            <Header />
            <GridLayout />
        </main>
    );
}
