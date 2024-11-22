// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Customers } from './collections/Customers'
import { Accounts } from './collections/Accounts'
import { Permissions } from './collections/Permissions'
import { PointsHistory } from './collections/PointsHistory'
import { Branches } from './collections/Branches'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Promotions } from './collections/Promotions'
import { ProductPromotions } from './collections/ProductPromotions'
import { Orders } from './collections/Orders'
import { OrderItems } from './collections/OrderItems'
import { OrderShippings } from './collections/OrderShippings'
import { PointsConversionRate } from './collections/PointsConversionRate'
import { Complaints } from './collections/Complaints'
import { SalesReports } from './collections/SalesReports'
import { ProductAttributes } from './collections/ProductAttributes'
import { AttributeValues } from './collections/AttributeValues'
import { ProductPrices } from './collections/ProductPrices'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Accounts.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: 
  [
    Accounts,
    Users, 
    Customers, 
    Permissions, 
    PointsHistory,
    Branches, 
    Categories, 
    Products,
    Promotions,
    ProductPromotions,
    Orders,
    OrderItems,
    OrderShippings,
    PointsConversionRate,
    Complaints,
    SalesReports,
    ProductAttributes,
    AttributeValues,
    ProductPrices
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
