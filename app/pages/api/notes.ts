import { surrealDatabase } from "../../lib/surreal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const notes = await surrealDatabase.query('SELECT * FROM note');
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notes' });
    }
  } else if (req.method === 'POST') {
    const { content } = req.body;
    try {
      const created = await surrealDatabase.create('note', { content });
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create note' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}