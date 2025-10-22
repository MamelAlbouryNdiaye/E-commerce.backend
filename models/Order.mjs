import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Product', 
     required: true 
    },
  name: { 
    type: String,
     required: true 
    },    // snapshot of name
  qty: { type: Number, 
    required: true, 
    min: 1 
  },
  price: { 
    type: Number, 
    required: true 
  },   // snapshot of price
  image: { 
    type: String }
}, { _id: false });

const ShippingAddressSchema = new mongoose.Schema({
  address: { 
    type: String,
     required: true },
  city: { 
    type: String, 
    required: true 
  },
  postalCode: { 
    type: String, 
    required: true
   },
  country: { 
    type: String,
     required: true 
    },
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true },

  orderItems: [OrderItemSchema],
  shippingAddress: ShippingAddressSchema,

  paymentMethod: { 
    type: String,
     required: true
     },
  paymentResult: { // completed by Stripe/PayPal webhook if needed 
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
  },

  taxPrice: { 
    type: Number, 
    required: true, 
    default: 0.0 
  },
  shippingPrice: { type: Number,
     required: true, 
     default: 0.0 
    },
  totalPrice: { type: Number,
     required: true, 
     default: 0.0
     },

  isPaid: {
    type: Boolean, 
    default: false },
  paidAt: { 
    type: Date
   },
  isDelivered: { 
    type: Boolean,
     default: false },
  deliveredAt: {
     type: Date 
    },

  status: {
     type: String,
      enum: ['pending','processing','shipped','delivered','cancelled'],
       default: 'pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
