# Project: Admin Panel

This project is structured to support a full-stack Admin Panel application with separate frontend and backend components. Below is an outline of the folder and file structure for the project, detailing the purpose of each directory and key file.

---

## Project Structure
admin-panel  
admin-panel-backend  
&nbsp;&nbsp;&nbsp;&nbsp;middleware  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[authMiddleware.js](#authmiddlewarejs)  

&nbsp;&nbsp;&nbsp;&nbsp;models  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Content.js](#contentjs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[User.js](#userjs)  

&nbsp;&nbsp;&nbsp;&nbsp;routes  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[auth.js](#authjs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[content.js](#contentjs-1)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[data.js](#datajs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[home.js](#homejs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[upload.js](#uploadjs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[users.js](#usersjs)  

&nbsp;&nbsp;&nbsp;&nbsp;uploads  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_update.csv  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_update.xls  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;latest_update.csv  

&nbsp;&nbsp;&nbsp;&nbsp;[.env](#.env)  
&nbsp;&nbsp;&nbsp;&nbsp;[README.md](#readmemd)  
&nbsp;&nbsp;&nbsp;&nbsp;[server.js](#serverjs)  

admin-panel-frontend  
&nbsp;&nbsp;&nbsp;&nbsp;public  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[index.html](#indexhtml)  

&nbsp;&nbsp;&nbsp;&nbsp;src  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;api  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[fetchData.js](#fetchdatajs)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;components  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[AdminRoute.js](#adminroutejs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Content.js](#contentjs-2)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Dashboard.js](#dashboardjs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Data.js](#datajs-1)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ErrorBoundary.js](#errorboundaryjs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Home.js](#homejs-1)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Login.js](#loginjs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[LogoutButton.js](#logoutbuttonjs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Navbar.js](#navbarjs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Register.js](#registerjs)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Upload.js](#uploadjs-1)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Users.js](#usersjs-1)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;styles  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;login.css  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modal.css  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;navbar.css  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;products.css  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;register.css  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;upload.css  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;users.css  

&nbsp;&nbsp;&nbsp;&nbsp;[App.js](#appjs)  
&nbsp;&nbsp;&nbsp;&nbsp;[index.js](#indexjs-1)  
&nbsp;&nbsp;&nbsp;&nbsp;[ProtectedRoute.js](#protectedroutejs)  

[.gitignore](#.gitignore)  
[README.md](#readmemd)  



> **Here's the terminal code to create the folders and files tree:**

```bash
mkdir -p admin-panel/admin-panel-backend/{middleware,models,routes,uploads} admin-panel/admin-panel-frontend/{public,src/api,src/components/styles} && touch admin-panel/.gitignore admin-panel/README.md admin-panel/admin-panel-backend/middleware/authMiddleware.js admin-panel/admin-panel-backend/models/Content.js admin-panel/admin-panel-backend/models/User.js admin-panel/admin-panel-backend/routes/{auth.js,content.js,data.js,home.js,upload.js,users.js} admin-panel/admin-panel-backend/uploads/{last_update.csv,last_update.xls,latest_update.csv} admin-panel/admin-panel-backend/.env admin-panel/admin-panel-backend/README.md admin-panel/admin-panel-backend/server.js admin-panel/admin-panel-frontend/public/index.html admin-panel/admin-panel-frontend/src/api/fetchData.js admin-panel/admin-panel-frontend/src/components/{AdminRoute.js,Content.js,Dashboard.js,Data.js,ErrorBoundary.js,Home.js,Login.js,LogoutButton.js,Navbar.js,Register.js,Upload.js,Users.js} admin-panel/admin-panel-frontend/src/components/styles/{login.css,modal.css,navbar.css,products.css,register.css,upload.css,users.css} admin-panel/admin-panel-frontend/src/{App.js,index.js,ProtectedRoute.js}
