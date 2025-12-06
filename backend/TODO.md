# MarketHub Backend - TODO

This is a placeholder for the backend implementation.

## Structure to Implement

### /controllers
- `authController.ts` - Handle user authentication (login, register, logout)
- `productController.ts` - CRUD operations for products
- `alertController.ts` - Manage price alerts
- `userController.ts` - User profile management

### /routes
- `authRoutes.ts` - Auth endpoints
- `productRoutes.ts` - Product endpoints
- `alertRoutes.ts` - Alert endpoints
- `userRoutes.ts` - User endpoints

### /models
- `User.ts` - User schema (name, email, password, role)
- `Product.ts` - Product schema
- `Alert.ts` - Price alert schema
- `Report.ts` - Issue report schema

### /services
- `emailService.ts` - Send email notifications
- `priceService.ts` - Price comparison logic

### /scrapers
- `amazonScraper.ts` - Scrape Amazon prices
- `flipkartScraper.ts` - Scrape Flipkart prices
- `meeshoScraper.ts` - Scrape Meesho prices
- `myntraScraper.ts` - Scrape Myntra prices
- `ajioScraper.ts` - Scrape Ajio prices

### /config
- `database.ts` - MongoDB connection
- `redis.ts` - Redis for caching

## Tech Stack (Planned)
- Node.js + Express
- MongoDB + Mongoose
- Redis for caching
- JWT for authentication
- Puppeteer/Cheerio for scraping
