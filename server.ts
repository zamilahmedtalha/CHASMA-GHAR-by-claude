import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Ensure products.json exists
if (!fs.existsSync(PRODUCTS_FILE)) {
  const defaultProducts = [
    {
      id: "1",
      slug: "aviator-classic",
      name: "Aviator Classic",
      price: 120.00,
      description: "Timeless aviator sunglasses with polarized lenses and a lightweight metal frame.",
      images: ["https://picsum.photos/seed/aviator/800/1000"],
      category: "sunglasses",
      stock: 15,
      featured: true,
      accentColor: "#1A1A1A"
    },
    {
      id: "2",
      slug: "retro-round",
      name: "Retro Round",
      price: 185.00,
      description: "Vintage-inspired round eyeglasses with a premium tortoiseshell finish.",
      images: ["https://picsum.photos/seed/retroround/800/1000"],
      category: "eyeglasses",
      stock: 8,
      featured: true,
      accentColor: "#C9A96E"
    },
    {
      id: "3",
      slug: "wayfarer-bold",
      name: "Wayfarer Bold",
      price: 240.00,
      description: "Bold, thick-framed wayfarers designed for maximum UV protection and style.",
      images: ["https://picsum.photos/seed/wayfarer/800/1000"],
      category: "sunglasses",
      stock: 5,
      featured: true,
      accentColor: "#E0D8C8"
    },
    {
      id: "4",
      slug: "clear-vision",
      name: "Clear Vision",
      price: 145.00,
      description: "Modern transparent frames with blue-light blocking lenses.",
      images: ["https://picsum.photos/seed/clearvision/800/1000"],
      category: "eyeglasses",
      stock: 20,
      featured: false,
      accentColor: "#8C7A6B"
    },
    {
      id: "5",
      slug: "cat-eye-chic",
      name: "Cat Eye Chic",
      price: 95.00,
      description: "Elegant cat-eye sunglasses that add a touch of glamour to any outfit.",
      images: ["https://picsum.photos/seed/cateye/800/1000"],
      category: "sunglasses",
      stock: 12,
      featured: false,
      accentColor: "#B0B5B9"
    },
    {
      id: "6",
      slug: "titanium-edge",
      name: "Titanium Edge",
      price: 175.00,
      description: "Ultra-lightweight titanium eyeglasses for all-day comfort.",
      images: ["https://picsum.photos/seed/titanium/800/1000"],
      category: "eyeglasses",
      stock: 30,
      featured: false,
      accentColor: "#A67C52"
    }
  ];
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(defaultProducts, null, 2));
}

// Ensure reviews.json exists
if (!fs.existsSync(REVIEWS_FILE)) {
  const defaultReviews = [
    {
      id: "1",
      name: "Elena R.",
      rating: 5,
      text: "The quality of the Retro Round glasses is exceptional. They fit perfectly.",
      date: new Date().toISOString()
    },
    {
      id: "2",
      name: "Marcus T.",
      rating: 4,
      text: "Love the minimalist design of the Aviator Classic. Very comfortable.",
      date: new Date().toISOString()
    },
    {
      id: "3",
      name: "Sophia L.",
      rating: 5,
      text: "The Wayfarer Bold sunglasses are both beautiful and practical. Highly recommend.",
      date: new Date().toISOString()
    }
  ];
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(defaultReviews, null, 2));
}

// Helper to read data
const readData = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Admin Middleware
const requireAdmin = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// --- API ROUTES ---

// Products
app.get('/api/products', (req, res) => {
  res.json(readData(PRODUCTS_FILE));
});

app.get('/api/products/:id', (req, res) => {
  const products = readData(PRODUCTS_FILE);
  const product = products.find(p => p.id === req.params.id || p.slug === req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ error: 'Not found' });
});

app.post('/api/products', requireAdmin, (req, res) => {
  const products = readData(PRODUCTS_FILE);
  const newProduct = { ...req.body, id: Date.now().toString() };
  products.push(newProduct);
  writeData(PRODUCTS_FILE, products);
  res.status(201).json(newProduct);
});

app.patch('/api/products/:id', requireAdmin, (req, res) => {
  const products = readData(PRODUCTS_FILE);
  const index = products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    writeData(PRODUCTS_FILE, products);
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/products/:id', requireAdmin, (req, res) => {
  let products = readData(PRODUCTS_FILE);
  products = products.filter(p => p.id !== req.params.id);
  writeData(PRODUCTS_FILE, products);
  res.status(204).send();
});

// Reviews
app.get('/api/reviews', (req, res) => {
  res.json(readData(REVIEWS_FILE));
});

app.post('/api/reviews', (req, res) => {
  const reviews = readData(REVIEWS_FILE);
  const newReview = { ...req.body, id: Date.now().toString(), date: new Date().toISOString() };
  reviews.push(newReview);
  writeData(REVIEWS_FILE, reviews);
  res.status(201).json(newReview);
});

app.delete('/api/reviews/:id', requireAdmin, (req, res) => {
  let reviews = readData(REVIEWS_FILE);
  reviews = reviews.filter(r => r.id !== req.params.id);
  writeData(REVIEWS_FILE, reviews);
  res.status(204).send();
});

// Contact
app.post('/api/contact', (req, res) => {
  // Mock contact submission
  console.log('Contact form submitted:', req.body);
  res.status(200).json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
