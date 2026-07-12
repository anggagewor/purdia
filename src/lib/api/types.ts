/**
 * Shared API types derived from OpenAPI spec.
 */

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface AuthTokenResponse {
  access_token: string
  token_type: string
  expires_at: string | null
}

export interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive' | 'suspended'
  email_verified_at: string | null
  created_at: string
  avatar?: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface ChangePasswordPayload {
  current_password: string
  new_password: string
  new_password_confirmation: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  token: string
  password: string
  password_confirmation: string
}

// ---------------------------------------------------------------------------
// Roles & Permissions
// ---------------------------------------------------------------------------

export interface Role {
  id: number
  name: string
  slug: string
  description?: string
  permissions?: Permission[]
}

export interface RolePayload {
  name: string
  slug: string
  description?: string
}

export interface Permission {
  id: number
  name: string
  scope: 'page' | 'component' | 'action' | 'api'
  description?: string
}

export interface PermissionPayload {
  name: string
  scope: 'page' | 'component' | 'action' | 'api'
  description?: string
}

// ---------------------------------------------------------------------------
// Tenants & Branches
// ---------------------------------------------------------------------------

export interface Tenant {
  id: number
  name: string
  slug: string
  currency?: string
  locale?: string
  timezone?: string
  settings?: Record<string, unknown>
}

export interface TenantPayload {
  name: string
  slug: string
  currency?: string
  locale?: string
  timezone?: string
  settings?: Record<string, unknown>
}

export interface Branch {
  id: number
  name: string
  code: string
  type?: 'store' | 'warehouse' | 'office' | 'factory' | 'virtual'
  parent_branch_id?: number
  address?: string
  phone?: string
  timezone?: string
  settings?: Record<string, unknown>
  children?: Branch[]
}

export interface BranchPayload {
  name: string
  code: string
  type?: 'store' | 'warehouse' | 'office' | 'factory' | 'virtual'
  parent_branch_id?: number
  address?: string
  phone?: string
  timezone?: string
  settings?: Record<string, unknown>
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export interface ConfigItem {
  key: string
  value: unknown
  type?: 'string' | 'boolean' | 'integer' | 'float' | 'json' | 'array'
}

export interface ConfigSetPayload {
  key: string
  value: unknown
  type?: 'string' | 'boolean' | 'integer' | 'float' | 'json' | 'array'
}

export interface ConfigBulkPayload {
  configs: ConfigSetPayload[]
}

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------

export interface FileRecord {
  id: number
  filename: string
  mime_type: string
  size: number
  module: string
  entity_type?: string
  entity_id?: string
  visibility: 'public' | 'private' | 'restricted'
  disk?: string
  url?: string
  metadata?: Record<string, unknown>
}

export interface FileAccessPayload {
  accessor_type: 'user' | 'role'
  accessor_id: string
  access_level?: 'read_only' | 'read_write' | 'full_control'
}

// ---------------------------------------------------------------------------
// Lookups & References
// ---------------------------------------------------------------------------

export interface LookupItem {
  value: string | number
  label: string
  [key: string]: unknown
}

export interface Country {
  id: number
  name: string
  code: string
  region?: string
  currency?: Currency
}

export interface Currency {
  id: number
  name: string
  code: string
  symbol: string
  decimal_places?: number
}

export interface UnitCategory {
  name: string
  units: Unit[]
}

export interface Unit {
  code: string
  name: string
  symbol?: string
  conversion_factor?: number
}

export interface UnitConversion {
  from: string
  to: string
  value: number
  result: number
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

export interface Sequence {
  id: number
  type: string
  prefix: string
  format?: string
  reset_frequency?: 'never' | 'daily' | 'monthly' | 'yearly'
  branch_id?: number
}

export interface SequencePayload {
  type: string
  prefix: string
  format?: string
  reset_frequency?: 'never' | 'daily' | 'monthly' | 'yearly'
  branch_id?: number
}

export interface GeneratedDocument {
  number: string
  type: string
}

// ---------------------------------------------------------------------------
// Parties
// ---------------------------------------------------------------------------

export interface Party {
  id: number
  type: 'person' | 'organization'
  code?: string
  contacts?: PartyContact[]
  addresses?: PartyAddress[]
  roles?: string[]
  person?: PersonDetail
  organization?: OrganizationDetail
}

export interface PersonDetail {
  first_name: string
  last_name?: string
  birth_date?: string
  gender?: string
  religion?: string
  blood_type?: string
  marital_status?: string
  national_id?: string
}

export interface OrganizationDetail {
  legal_name: string
  display_name?: string
  tax_number?: string
  npwp?: string
  nib?: string
  industry?: string
  website?: string
}

export interface PartyContact {
  type: 'email' | 'phone' | 'mobile' | 'fax' | 'website' | 'whatsapp' | 'other'
  value: string
  label?: string
  is_primary?: boolean
}

export interface PartyAddress {
  type: 'billing' | 'shipping' | 'office' | 'warehouse' | 'home' | 'other'
  line_1: string
  line_2?: string
  city?: string
  state?: string
  postal_code?: string
  country_code?: string
}

export interface PersonPayload {
  first_name: string
  last_name?: string
  code?: string
  birth_date?: string
  gender?: string
  religion?: string
  blood_type?: string
  marital_status?: string
  national_id?: string
  contacts?: PartyContact[]
  addresses?: PartyAddress[]
  roles?: string[]
}

export interface OrganizationPayload {
  legal_name: string
  display_name?: string
  code?: string
  tax_number?: string
  npwp?: string
  nib?: string
  industry?: string
  website?: string
  contacts?: PartyContact[]
  addresses?: PartyAddress[]
  roles?: string[]
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

export interface Product {
  id: number
  name: string
  slug: string
  sku?: string
  barcode?: string
  type: 'goods' | 'service' | 'digital' | 'bundle'
  category_id?: number
  brand_id?: number
  description?: string
  unit?: string
  category?: Category
  brand?: Brand
}

export interface ProductPayload {
  name: string
  slug: string
  sku?: string
  barcode?: string
  type?: 'goods' | 'service' | 'digital' | 'bundle'
  category_id?: number
  brand_id?: number
  description?: string
  unit?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  parent_id?: number
  description?: string
  sort_order?: number
  children?: Category[]
}

export interface CategoryPayload {
  name: string
  slug: string
  parent_id?: number
  description?: string
  sort_order?: number
}

export interface Brand {
  id: number
  name: string
  slug: string
  description?: string
}

export interface BrandPayload {
  name: string
  slug: string
  description?: string
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export interface PriceResolution {
  base_price: number
  final_price: number
  price_list_id: string
  price_list_name: string
  currency: string
  applied_promotions: unknown[]
}

export interface PriceResolvePayload {
  product_id: number
  variant_id?: number
  branch_id?: number
  qty?: number
  price_list_id?: number
}

export interface DiscountResult {
  applied: boolean
  original_amount: number
  discount_amount: number
  final_amount: number
  error?: string
}

export interface DiscountApplyPayload {
  code: string
  amount: number
}

export interface PriceList {
  id: number
  name: string
  slug: string
  type: 'selling' | 'buying'
  currency: string
  is_default: boolean
}

export interface PriceListPayload {
  name: string
  slug: string
  type?: 'selling' | 'buying'
  currency?: string
  is_default?: boolean
}

export interface Discount {
  id: number
  name: string
  code?: string
  type: 'percentage' | 'fixed'
  value: number
  min_order_amount?: number
  max_discount_amount?: number
  usage_limit?: number
  starts_at?: string
  ends_at?: string
}

export interface DiscountPayload {
  name: string
  code?: string
  type: 'percentage' | 'fixed'
  value: number
  min_order_amount?: number
  max_discount_amount?: number
  usage_limit?: number
  starts_at?: string
  ends_at?: string
}

export interface Promotion {
  id: number
  name: string
  scope?: 'product' | 'category' | 'brand' | 'cart' | 'global'
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  min_qty?: number
  min_order_amount?: number
  max_discount_amount?: number
  priority?: number
  is_combinable?: boolean
  starts_at?: string
  ends_at?: string
  rules?: PromotionRule[]
}

export interface PromotionRule {
  entity_type: 'product' | 'category' | 'brand'
  entity_id: string
}

export interface PromotionPayload {
  name: string
  scope?: 'product' | 'category' | 'brand' | 'cart' | 'global'
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  min_qty?: number
  min_order_amount?: number
  max_discount_amount?: number
  priority?: number
  is_combinable?: boolean
  starts_at?: string
  ends_at?: string
  rules?: PromotionRule[]
}

// ---------------------------------------------------------------------------
// Menus
// ---------------------------------------------------------------------------

export interface Menu {
  id: number
  name: string
  slug: string
  path: string | null
  icon: string | null
  permission: string | null
  sort_order: number
  is_visible: boolean
  children?: Menu[]
}

export interface MenuPayload {
  name: string
  slug: string
  path?: string | null
  icon?: string | null
  permission?: string | null
  parent_id?: number | null
  sort_order?: number
  is_visible?: boolean
}

export interface MenuReorderItem {
  id: number
  sort_order: number
  parent_id?: number | null
}
