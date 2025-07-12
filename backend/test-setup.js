const mongoose = require('mongoose');
const Item = require('./src/models/Item');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear');
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

const createTestItems = async () => {
  try {
    // Clear existing test items
    await Item.deleteMany({ title: { $in: ['Vintage Denim Jacket', 'Summer Floral Dress', 'Classic White T-Shirt'] } });
    
    // Create test items
    const testItems = [
      {
        user_id: new mongoose.Types.ObjectId(), // Create a new ObjectId
        title: 'Vintage Denim Jacket',
        description: 'Classic vintage denim jacket in excellent condition. Perfect for layering.',
        category: 'outerwear',
        size: 'm',
        condition: 'good',
        tags: ['vintage', 'denim', 'jacket'],
        image_urls: ['/uploads/placeholder1.jpg'],
        status: 'available',
        points_required: 50
      },
      {
        user_id: new mongoose.Types.ObjectId(),
        title: 'Summer Floral Dress',
        description: 'Beautiful floral print dress perfect for summer days.',
        category: 'dresses',
        size: 's',
        condition: 'like-new',
        tags: ['summer', 'floral', 'dress'],
        image_urls: ['/uploads/placeholder2.jpg'],
        status: 'available',
        points_required: 75
      },
      {
        user_id: new mongoose.Types.ObjectId(),
        title: 'Classic White T-Shirt',
        description: 'Essential white t-shirt made from organic cotton.',
        category: 'tops',
        size: 'l',
        condition: 'new',
        tags: ['basic', 'organic', 'cotton'],
        image_urls: ['/uploads/placeholder3.jpg'],
        status: 'available',
        points_required: 25
      }
    ];

    const createdItems = await Item.insertMany(testItems);
    console.log('✅ Test items created successfully:', createdItems.length, 'items');
    
    // Display the created items
    createdItems.forEach(item => {
      console.log(`- ${item.title} (ID: ${item._id})`);
    });
    
  } catch (error) {
    console.error('❌ Error creating test items:', error);
  }
};

const main = async () => {
  await connectDB();
  await createTestItems();
  process.exit(0);
};

main(); 