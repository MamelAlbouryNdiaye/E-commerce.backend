import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true, 
     trim: true 
    },
  description: { 
    type: String, 
    required: true 
  },
  price: {
     type: Number, 
     required: true,
      default: 0 
    },
  images: [{ 
    type: String 
  }], 
  category: { 
    type: String, 
    default: 'Uncategorized'
   },
  brand: { 
    type: String 
  },
  countInStock: { 
    type: Number, 
    required: true,
     default: 0
     },
  rating: { 
    type: Number, 
    default: 0 
  },
  numReviews: { 
    type: Number, 
    default: 0 
  },
  // ++
  featured: {
     type: Boolean,
     default: false 
    },
  attributes: { 
    type: mongoose.Schema.Types.Mixed 
  } // ex: { color: 'red', size: 'M' }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
