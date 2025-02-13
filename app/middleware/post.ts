import express from 'express';

export const app = express();

app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(express.json({ limit: '2mb' }));
