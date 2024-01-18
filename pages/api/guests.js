import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Guests");
 
        const guests = await db
            .collection("Guest")
            .find({})
            .sort({ metacritic: -1 })
            .toArray();
 
            res.status(200).json({ guests });
        } catch (e) {
        console.log(e);
    }
}