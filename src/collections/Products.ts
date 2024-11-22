import { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  timestamps: true,
  access: {
    read: () => true, // Cho phép đọc tất cả
    create: () => true, // Cho phép tạo mới
    update: () => true, // Cho phép cập nhật
    delete: () => true, // Cho phép xóa
  },
  fields: [
    {
      name: 'name', // Tên sản phẩm
      type: 'text',
      required: true, 
      maxLength: 255, // Giới hạn độ dài tối đa là 255 ký tự
    },
    {
      name: 'price', // Giá sản phẩm
      type: 'number',
      required: true, // Bắt buộc nhập
      admin: {
        step: 0.01, // Giá trị nhỏ nhất tăng/giảm (2 chữ số thập phân)
      },
    },
    {
      name: 'points_price', // Giá quy đổi điểm
      type: 'number',
      required: true, 
      defaultValue: 0,
    },
    {
      name: 'quantity', // Số lượng tồn
      type: 'number',
      required: false, 
      defaultValue: 0, // Giá trị mặc định là 0
      admin: {
        step: 1, // Tăng/giảm từng đơn vị
      },
    },
    {
      name: 'image_url', // URL hình ảnh
      type: 'text',
      required: false, 
      maxLength: 255, // Giới hạn độ dài tối đa là 255 ký tự
    },
    {
      name: 'description', // Mô tả sản phẩm
      type: 'textarea',
      required: false, 
    },
    {
      name: 'category', // Liên kết với bảng categories
      type: 'relationship',
      relationTo: 'categories', // Tên collection categories
      required: false,
    },
    {
      name: 'branch', // Liên kết với bảng branches
      type: 'relationship',
      relationTo: 'branches', // Tên collection branches
      required: false, 
    },
    {
      name: 'attributes', // Liên kết các thuộc tính
      type: 'array',
      fields: [
        {
          name: 'attribute', // Thuộc tính (e.g., Size, Color)
          type: 'relationship',
          relationTo: 'product-attributes',
          required: true,
        },
        {
          name: 'values', // Giá trị thuộc tính (đa chọn)
          type: 'relationship',
          relationTo: 'attribute-values',
          required: true,
          hasMany: true,
          admin: {
            condition: (_, siblingData) => !!siblingData.attribute, // Chỉ hiển thị khi `attribute` đã được chọn
          },
        //   hooks: {
        //     beforeChange: [
        //       async ({ value, siblingData, req }) => {
        //         const attributeId = siblingData.attribute;
        //         if (!attributeId || !value || value.length === 0) {
        //           // Nếu không có attribute hoặc không có giá trị được chọn, giữ nguyên giá trị
        //           return value;
        //         }

        //         console.log('Attribute ID:', attributeId);
        //         console.log('Value trước khi lọc:', value);

        //         // Truy vấn tất cả giá trị hợp lệ của thuộc tính đã chọn
        //         const validValues = await req.payload.find({
        //           collection: 'attribute-values',
        //           where: {
        //             attribute: {
        //               equals: attributeId,
        //             },
        //           },
        //         });

        //         console.log('Valid Values:', validValues);

        //         // Lấy danh sách ID hợp lệ
        //         const validValueIds = validValues.docs.map((v: { id: string }) => v.id);

        //         console.log('Valid Value IDs:', validValueIds);

        //         // Lọc chỉ giữ lại các giá trị hợp lệ
        //         const filteredValues = value.filter((v: string) => validValueIds.includes(v));

        //         console.log('Filtered Values:', filteredValues);

        //         // Trả lại các giá trị hợp lệ hoặc giá trị ban đầu
        //         return filteredValues.length > 0 ? filteredValues : value;
        //       },
        //     ],            
        //   },
        },
      ],
    },
  ],
};
