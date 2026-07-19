# 📦 Inventory

Inventory management with products, warehouses, stock movements, purchases, barcodes, and quality control.

## Sub-modules

| Sub-module      | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| Dashboard       | Stats overview, quick actions, recent stock movements                        |
| Products        | Full CRUD with SKU, barcode, category, warehouse, stock levels, pricing      |
| Warehouses      | Warehouse locations with manager, capacity, item count                       |
| Stock Movements | Track stock in, stock out, and transfers between warehouses                  |
| Purchases       | Purchase order CRUD with multi-item line items, supplier, status tracking    |
| Barcodes        | Barcode listing, generate & print labels (EAN-13, Code-128, QR), scan/lookup |
| Maintenance     | Equipment maintenance requests with type, priority, scheduling, activity log |
| Quality Control | Quality inspections with checklist, pass/fail results, batch tracking        |

## Routes

All inventory routes are prefixed with `/inventory/`:

```
/inventory              → Dashboard
/inventory/products     → Products
/inventory/warehouses   → Warehouses
/inventory/movements    → Stock Movements
/inventory/purchases    → Purchase Orders
/inventory/barcodes     → Barcode Management
/inventory/maintenance  → Equipment Maintenance
/inventory/quality      → Quality Control
```
