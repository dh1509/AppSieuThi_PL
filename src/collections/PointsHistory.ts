import type { CollectionConfig } from 'payload';

export const PointsHistory: CollectionConfig = {
  slug: 'points-history',
  access: {
    read: () => true, // Cho phép đọc tất cả
    create: () => true, // Cho phép tạo mới
    update: () => true, // Cho phép cập nhật
    delete: () => true, // Cho phép xóa
  },
  fields: [
    {
        name: 'customer', // Trường liên kết với bảng customers
        type: 'relationship',
        relationTo: 'customers', // Liên kết tới collection `customers`
        required: true, // Bắt buộc có customer
        hasMany: false, // Mỗi điểm lịch sử chỉ có một khách hàng
    },
    {
        name: 'points', // Số điểm thay đổi
        type: 'number',  // Kiểu số (int)
        required: true,  // Bắt buộc có giá trị
    },
    {
        name: 'reason', // Lý do thay đổi điểm
        type: 'text',    // Kiểu text để mô tả lý do
        required: false, // Không bắt buộc nhập lý do
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        if (operation === 'create' || operation === 'update') {
          const customerId = data.customer;
          const currentPoints = data.points;
          const previousPoints = originalDoc?.points || 0;
  
          let pointsChange =
            operation === 'create'
              ? currentPoints
              : currentPoints - previousPoints;
  
          // Kiểm tra điểm hiện tại của khách hàng
          const customer = await req.payload.findByID({
            collection: 'customers',
            id: customerId,
          });
  
          if (!customer) {
            throw new Error('Customer not found');
          }
  
          const availablePoints = customer.points || 0;
  
          // Nếu đang trừ điểm và không đủ điểm
          if (pointsChange < 0 && availablePoints + pointsChange < 0) {
            throw new Error(
              `Insufficient points. Available points: ${availablePoints}, but trying to deduct: ${Math.abs(
                pointsChange
              )}.`
            );
          }
        }
      },
    ],
      afterChange: [ async ({
        doc,
        operation,
        req,
      }: {
        doc: any;
        operation: string;
        req: any;  // Chỉ cần khai báo req là kiểu any
      }) => {
        const customerId = doc.customer;
        const currentPoints = doc.points;
  
        let pointsChange = 0;
  
        if (operation === 'create') {
          pointsChange = currentPoints;
        } else if (operation === 'update') {
          // Truy vấn lại tài liệu gốc trước khi thay đổi
          const previousDoc = await req.payload.findByID({
            collection: 'points-history',
            id: doc.id, // Sử dụng ID của doc để truy vấn tài liệu cũ
          });
  
          const previousPoints = previousDoc?.points || 0;
  
          pointsChange = currentPoints - previousPoints;
        } else if (operation === 'delete') {
          pointsChange = -doc.points;
        }
  
        // Cập nhật điểm cho khách hàng
        await updateCustomerPoints(customerId, pointsChange, req);
      },],
  },
};


// Hàm cập nhật điểm cho khách hàng
const updateCustomerPoints = async (
  customerId: string,
  pointsChange: number,
  req: any  // Chỉ cần req là kiểu any
) => {
  const customer = await req.payload.findByID({
    collection: 'customers',
    id: customerId,
  });

  if (!customer) {
    throw new Error('Customer not found');
  }

  let newPoints = customer.points || 0;

  newPoints += pointsChange;

  // Cập nhật điểm mới vào collection customers
  await req.payload.update({
    collection: 'customers',
    id: customerId,
    data: {
      points: newPoints,
    },
  });
};