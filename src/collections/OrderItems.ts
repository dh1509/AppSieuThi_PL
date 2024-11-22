import { CollectionConfig} from 'payload';

export const OrderItems: CollectionConfig = {
  slug: 'order_items',
  admin: {
    useAsTitle: 'id', // Hiển thị `id` làm tiêu đề trong Admin
  },
  fields: [
    {
      name: 'order', // Liên kết với đơn hàng
      type: 'relationship',
      relationTo: 'orders', 
      required: true, 
    },
    {
      name: 'product', // Liên kết với sản phẩm
      type: 'relationship',
      relationTo: 'products', // Tên slug của bảng `products`
      required: true, 
    },
    {
      name: 'quantity', // Số lượng sản phẩm
      type: 'number',
      required: true, 
    },
    {
      name: 'price', // Giá sản phẩm khi thêm vào đơn hàng
      type: 'number',
      required: true, 
      admin: {
        step: 0.01, 
      },
    },
  ],
  hooks: {
    afterChange: [ async ({ doc, operation, req }) => {
      const { product_id, quantity } = doc;
      if (operation === 'create' || operation === 'update') {
        // Sử dụng req.payload.find để tìm sản phẩm trong bảng products
        const products = await req.payload.find({
          collection: 'products',
          where: { id: product_id },
        });

        if (products.docs && products.docs.length > 0) {
          const product = products.docs[0]; // Lấy sản phẩm đầu tiên từ docs
          
          // Kiểm tra nếu quantity có giá trị hợp lệ
          const currentQuantity = product.quantity ?? 0;  // Nếu quantity là null hoặc undefined, mặc định là 0
          const updatedQuantity = currentQuantity - quantity;  // Giảm số lượng

          // Cập nhật lại số lượng của sản phẩm
          await req.payload.update({
            collection: 'products',
            id: product.id,  // ID của sản phẩm
            data: { quantity: updatedQuantity },
          });
        }
      }
    },],
  },
};
