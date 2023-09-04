import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { title } from "process";

type postProps = {
    title: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
    const post: postProps = JSON.parse(req.body)
    if (req.method === "POST") {
        // Check for title
        if(!post.title.length) {
            return res.status(500).json({ message: "Title can't be empty!" })
        }
        try {
            const data = await prisma.post.create({
                data: {
                    title: post.title
                }
            })
            res.status(200).json(data)
        } catch(error) {
            return res.status(500).json({ message: "Error creating a new post" })
        }
    }
    } catch(error) {
        return res.status(500).json(error)
    }
}