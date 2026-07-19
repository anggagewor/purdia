# 🏪 Point of Sale

Full POS system with terminal interface, QR self-ordering, and multi-payment support.

## Sub-modules

| Sub-module   | Description                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| Dashboard    | Sales overview and stats                                                                             |
| POS Terminal | Product grid, favorites, inline discounts, multi-payment (Cash, Card, E-Wallet), numpad, hold orders |
| Stock        | Product inventory management                                                                         |
| Customers    | Customer database                                                                                    |
| Cash Drawer  | Cash management                                                                                      |
| Discounts    | Discount & promo management                                                                          |
| QR Codes     | Generate & print QR codes per table for customer self-order                                          |
| Reports      | Sales reports and analytics                                                                          |

## Screenshots

<p align="center">
  <img src="../Pos_dashboard.png" alt="POS Dashboard" width="100%"/>
</p>

## POS Terminal Features

- **Product Variants** — Size, sugar level, temperature, add-ons, spice level per product
- **Numpad** — On-screen numpad bound to active input (cash, card number, phone)
- **Voucher Code** — Apply promo codes with validation and discount stacking
- **Hold Order** — Save current order for later, resume anytime
- **Table/Tab System** — Assign orders to 12 tables, auto-merge items on same table
- **QR Self-Order** — Customers scan QR at table, browse menu, submit order to POS
- **Order Notifications** — Incoming QR orders appear with accept/reject flow

## Routes

All POS routes are prefixed with `/pos/`:

```
/pos              → Dashboard
/pos/terminal     → POS Terminal
/pos/stock        → Stock management
/pos/customers    → Customer list
/pos/cash-drawer  → Cash drawer
/pos/discounts    → Discounts & promos
/pos/qr-codes     → QR code management
/pos/reports      → Sales reports
```

## QR Self-Order Flow

1. Staff generates QR code for each table via `/pos/qr-codes`
2. Customer scans QR → opens `/order/:tableId` (public, no auth)
3. Customer browses menu, selects variants, submits order
4. POS Terminal receives notification with accept/reject action
5. Accepted orders appear in active orders list
