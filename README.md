
---

# **Property Management System**

## **Overview**

The **Property Management System** is a web-based application built using **React** and **Django** that facilitates property management for both **tenants (users)** and **landlords**. It provides a seamless experience for property booking, rental payments, and property management.

## **Features**
## Login
![alt text](image-21.png)

## Register
![alt text](image-22.png)

### **Tenant Dashboard (User)**

![alt text](image-17.png)

- View all available properties
  ![alt text](image-12.png)
- View and Book a property of choice
  ![alt text](image-13.png)
  ![alt text](image-14.png)
  ![alt text](image-15.png)
- Edit Account
  ![alt text](image-11.png)
- Make monthly rental payments
- Make a review of the property he/she has lived
  ![alt text](image-16.png)

- View payment history

### **Landlord Dashboard**

- View tenant bookings  
  ![alt text](image-18.png)
- Add new properties for rent
  ![alt text](image-20.png)

- View only their own listed properties
  ![alt text](image-19.png)
- Receive rental payments from tenants

## **Tech Stack**

- **Frontend:** React.js , Context API, Tanstack Query
- **Backend:** Django & Django Rest Framework (DRF)
- **Database:** PostgreSQL
- **Authentication:** JWT-based authentication
- **Payments:** Stripe for secure transactions

## **Installation**

### **Backend Setup (Django)**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/property-management.git
   cd property-management/backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Mac/Linux
   venv\Scripts\activate  # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### **Frontend Setup (React)**

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## **Usage**

1. **Landlord Registration/Login**
   - After logging in, landlords can add properties and view their own listings.

2. **Tenant Registration/Login**
   - Tenants can browse properties, book a property, and make payments.

3. **Payments**
   - Monthly payments are processed via Stripe, and landlords receive the amount in their accounts.

## Author

### Patrick Kipngetich Bett

---
