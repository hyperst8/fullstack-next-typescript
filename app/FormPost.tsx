"use client"

import React, {useState} from "react";
import { useRouter } from "next/navigation";

export default function FormPost() {
    const [title, setTitle] = useState<string>("");
    const router = useRouter();

    // Create a submit post
    async function submitPost(e: React.FormEvent) {
        e.preventDefault();
        const data = await fetch(`/api/createPost`, {
            method: "POST",
            body: JSON.stringify({ title }),
        });
        const res = await data.json();
        router.refresh();
        setTitle("");

        if (!res.ok) console.log(res.message)
    }

    return (
        <form onSubmit={submitPost} className="py-4 flex flex-col">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type="submit" className="text-black font-bold bg-green-500 py-2 rounded-md mt-2">Make a new post</button>
        </form>
    )
}