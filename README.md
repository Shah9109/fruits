# FreshPick | Direct Farm-to-Consumer Fruits E-Commerce

FreshPick is a direct farm-to-consumer e-grocery platform featuring dynamic freshness decay pricing algorithms, sourcing traceability pipelines, and interactive agricultural diagnostics.

---

## 🚀 Key Features

* **Algorithmic Freshness Pricing**: Fruit prices drop dynamically over cold-storage age using three distinct biological decay curves:
  * **Linear Spoilage Decay**: Constant pricing markdown proportional to shelf-life age (ideal for Citrus/Apples).
  * **Exponential Spoilage Decay**: High-speed markdown rate near shelf-life end (ideal for Berries).
  * **Stepwise Clearance Tiers**: Progressive clearance discounts triggered at aging milestones (ideal for Mangoes/Bananas).
* **Interactive Time-Travel Decay Simulator**: Allows customers to simulate harvest age duration, visually demonstrating dynamic price drops, sugar levels (Brix index), moisture evaporation weight loss, and tracking nodes.
* **Agricultural Traceability Map**: Tracks every batch along four key nodes:
  1. *Harvest Node* (Farmer Sourced Origin)
  2. *Inspection Hub* (Washing, grading, and sweetness metrics verification)
  3. *Cold Storage Facility* (Managed 4.2°C temperature)
  4. *Direct Consumer Node* (Active checkout and logistics dispatch)
* **Farmer/Supplier Terminal**: Verified farmers can log harvest batches with exact sweetness indices, storage temperatures, and soil report metrics.
* **Live Order Logistics Maps**: Visual tracking of orders featuring a CSS-animated delivery truck moving dynamically based on shipment duration alongside real-time shipping logs.
* **Demo Quick-Switch Panel**: A floating portal in the bottom-left corner of the screen allowing examiners to instantly log in as Customer, Farmer, or Admin with one click.

---

## 🛠 Tech Stack

* **Structure**: Plain HTML5 (Semantic tagging)
* **Styling**: Vanilla CSS3 (HSL color tokens, dark mode toggle, glassmorphism, keyframe animations, custom scrollbars)
* **Logic**: ES6+ Modular JavaScript (State management, canvas rendering charts, localStorage mock database migrations)
* **Simulation DB**: Browser LocalStorage (No backend setup required)

---

## 💻 Running the Project Locally

1. Clone or download this repository.
2. Navigate to the root directory and start a local HTTP server:
   ```bash
   python3 -m http.server 8080
   ```
3. Open [http://localhost:8080](http://localhost:8080) in your web browser.

---

## 👤 Test Credentials

Use the floating **Demo Portal** drawer in the bottom-left corner to quickly switch between profiles, or use the following manual login credentials:
* **Customer**: `consumer@freshpick.com` / `Password123`
* **Farmer**: `farmer@freshpick.com` / `Password123`
* **Admin**: `admin@freshpick.com` / `Password123`
