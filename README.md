# **Accessor**

Accessor is a Role-Based Access Control (RBAC) system built with modern technologies, providing fine-grained control over user roles, permissions, and management actions. This project is designed to make managing and enforcing permissions in web applications straightforward and scalable.

## **Preview**

## **Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/debajoti/vrv-rbac-int.git
cd vrv-rbac-int
```
### **2.Install Dependencies**
```bash
npm install
```
### **3.Create `.env` file**
- Spin a supabase postgersql database & replace the connection string
```bash
DATABASE_URL="postgresql://postgres.[username]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
AUTH_SECRET = "random"
```
### **4. Generate Prisma Client**
```bash
npx prisma generate
```
### **5. Start the Development Server**
```bash
npm run dev
```
### **6. Visit the localhost**
```bash
http://localhost:3000
```

## **Features**

### 1. **User Role Management**
- Assign roles to users dynamically, such as `ADMIN`, `MANAGER`, or `USER`.
- Roles define access levels and permissions for different functionalities.
- Support for custom roles based on project requirements.

### 2. **Permission Control**
- Configure specific permissions for roles such as `READ`, `CREATE`, `UPDATE`, and `DELETE`.
- Roles can have a combination of permissions for granular access control.
- Protect sensitive data and restrict access to administrative features.

### 3. **User List View**
- A responsive user list that displays all registered users in a tabular format on desktops.
- Features include:
  - User **Name** and **Email**.
  - User **Role** and their specific **Permissions**.
  - Current **Status** (e.g., Active, Suspended).

### 4. **Mobile-Friendly Cards**
- For mobile devices, user information is displayed in a card layout.
- Cards are designed to adapt to smaller screen sizes without overflowing.
- Each card provides quick access to user details and actions.

### 5. **Edit and Delete Actions**
- **Edit User**:
  - Modify user details (e.g., name, role, permissions).
  - Accessible only to users with the `UPDATE` permission or admins.
- **Delete User**:
  - Soft-delete or remove users from the system.
  - Action is secured and requires explicit confirmation.

### 6. **Dynamic Loading Indicators**
- Displays a loader (`Bars` spinner) while fetching user data from the API.
- Ensures a smooth user experience when data is being loaded.

### 7. **Error Handling**
- Comprehensive error handling for failed API requests.
- Informative error messages are displayed to guide the user.

### 8. **Fine-Grained Access Control**
- Actions like Edit/Delete are restricted to users with relevant permissions (`UPDATE`, `DELETE`) or admin privileges.
- Permissions and roles can be configured dynamically.

### 9. **Modern UI Components**
- Built with modern, reusable UI components:
  - Tables for desktop views.
  - Responsive cards for mobile views.
  - Dialogs for delete confirmation.
  - Drawers for editing user details.

### 10. **API Integration**
- Fetches user data from a backend API (`/api/getUser`).
- Dynamically loads user data based on the current user's email and role.
- Supports secure delete operations with API integration (`/api/deleteUser`).

## **Technologies Used**
- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI, toast
- **Icons**: Lucide React
- **State Management**: React `useState` and `useEffect` hooks
- **HTTP Requests**: Axios
- **Loading Indicators**: React Loader Spinner
- **TypeScript**: For type safety and maintainability
- **Database**: Postgresql(Supabase)
- **ORM** : Prisma ORM
