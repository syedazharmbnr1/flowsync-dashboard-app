# FlowSync Dashboard

FlowSync is a modern workflow automation dashboard built with React, Tailwind CSS, and Supabase. It provides a comprehensive interface for managing workflows, tasks, teams, and integrations with a focus on analytics and team collaboration.

![FlowSync Dashboard Preview](docs/dashboard-preview.png)

## Features

- 📊 **Interactive Dashboard** - Real-time metrics and KPI tracking
- 📝 **Task Management** - Create, assign, and track tasks across your organization
- 📈 **Reports & Analytics** - Generate custom reports and visualize key metrics
- 👥 **Team Activity** - Monitor team performance and activity
- ⚡ **Workflow Automation** - Create and manage automated workflows
- 🔌 **Integrations** - Connect with popular tools and services
- 🔐 **User Management** - Control access and permissions
- ⚙️ **Interactive Settings** - Personalize your experience

## Project Structure

```
flowsync-dashboard-app/
├── README.md                # Project documentation
├── package.json             # NPM package configuration
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── public/                  # Static assets
│   ├── favicon.ico          # Application favicon
│   ├── index.html           # HTML entry point
│   ├── manifest.json        # PWA manifest file
│   └── robots.txt           # Robots configuration
├── docs/                    # Documentation assets
│   └── dashboard-preview.png  # Dashboard preview image
├── scripts/                 # Utility scripts
│   └── db-setup.sql         # Supabase database setup script
└── src/                     # Source code
    ├── App.js               # Main application component
    ├── index.js             # JavaScript entry point
    ├── api/                 # API integrations
    │   └── supabase.js      # Supabase client configuration
    ├── components/          # Reusable UI components
    │   ├── common/          # Shared components
    │   │   ├── Header.js    # App header component
    │   │   ├── Sidebar.js   # App sidebar component
    │   │   └── NotificationPanel.js # Notifications panel
    │   ├── dashboard/       # Dashboard components
    │   │   ├── MetricsRow.js        # KPI metrics
    │   │   ├── RevenueChart.js      # Revenue visualization
    │   │   ├── SatisfactionChart.js # CSI visualization
    │   │   ├── ReportsOverview.js   # Reports listing
    │   │   └── TeamPerformance.js   # Team performance metrics
    │   └── settings/        # Settings components
    ├── contexts/            # React contexts
    │   └── AuthContext.js   # Authentication context
    ├── layouts/             # Page layouts
    │   └── DashboardLayout.js # Main dashboard layout
    ├── pages/               # Application pages
    │   ├── Dashboard.js     # Main dashboard page
    │   ├── Login.js         # Login page
    │   ├── Register.js      # Registration page
    │   └── Settings.js      # Settings page
    └── styles/              # CSS styles
        └── tailwind.css     # Tailwind CSS styles
```

## Prerequisites

- Node.js (v16.0.0 or later)
- npm (v7.0.0 or later) or Yarn (v1.22.0 or later)
- Git (for cloning the repository)
- A Supabase account (free tier works fine for getting started)

## Detailed Setup Instructions

### 1. Clone the Repository

#### Mac/Linux
```bash
git clone https://github.com/yourusername/flowsync-dashboard-app.git
cd flowsync-dashboard-app
```

#### Windows
```bash
git clone https://github.com/yourusername/flowsync-dashboard-app.git
cd flowsync-dashboard-app
```

### 2. Setting up Supabase

#### Create a Supabase Project
1. Go to [Supabase](https://supabase.com) and sign up for an account if you don't have one already
2. Log in to your Supabase account
3. Click on "New Project" button
4. Enter a name for your project (e.g., "FlowSync")
5. Set a secure password for the database
6. Choose a region closest to your location
7. Click "Create New Project" and wait for the project to be created (this may take a few minutes)

#### Get Your API Keys
1. Once your project is created, go to the project dashboard
2. In the left sidebar, click on "Settings" (gear icon)
3. Click on "API" in the submenu
4. Under "Project API keys", you'll find:
   - URL: The URL of your Supabase project (e.g., `https://xyzproject.supabase.co`)
   - anon/public: Your public API key (starts with `eyJh...`)
5. Copy both the URL and the anon key, you'll need them later

#### Set Up the Database Schema
1. In the Supabase dashboard, go to the "SQL Editor" section in the left sidebar
2. Click on "New Query"
3. Open the SQL script from this project at `scripts/db-setup.sql`
4. Copy the entire contents of this file
5. Paste it into the SQL Editor in Supabase
6. Click "Run" to execute the SQL script
7. You should see "Success. No rows returned" if everything went well

### 3. Project Configuration

#### Setting Up Environment Variables

##### Mac/Linux
```bash
# Create a .env file from the example
cp .env.example .env

# Edit the .env file with your favorite editor
nano .env  # or vim .env, or any other editor
```

##### Windows
```bash
# Create a .env file from the example
copy .env.example .env

# Edit the .env file with your favorite editor
notepad .env  # or use any text editor
```

Add your Supabase credentials to the .env file:
```
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Replace `your_supabase_url_here` with your Supabase project URL and `your_supabase_anon_key_here` with your anon/public key.

### 4. Installing Dependencies

#### Mac/Linux (Using npm)
```bash
npm install
```

#### Mac/Linux (Using yarn)
```bash
yarn install
```

#### Windows (Using npm)
```bash
npm install
```

#### Windows (Using yarn)
```bash
yarn install
```

### 5. Running the Application

#### Mac/Linux (Using npm)
```bash
npm start
```

#### Mac/Linux (Using yarn)
```bash
yarn start
```

#### Windows (Using npm)
```bash
npm start
```

#### Windows (Using yarn)
```bash
yarn start
```

This will start the development server, and your browser should automatically open to `http://localhost:3000`. If it doesn't, you can manually navigate to this URL.

### 6. Creating a User Account

1. When you first open the application, you'll be redirected to the login page
2. Click on "Create a new account" to go to the registration page
3. Fill in your details and click "Create account"
4. You'll be redirected to the login page
5. Enter your credentials and click "Sign in"
6. You should now have access to the FlowSync Dashboard

## Troubleshooting

### Common Issues

#### 1. Supabase Connection Issues
- Make sure your .env file has the correct Supabase URL and anon key
- Check that your Supabase project is up and running
- Verify that you've executed the SQL script correctly

#### 2. Node.js Version Issues
- Make sure you're using Node.js version 16 or later
- If you need to manage multiple Node.js versions, consider using [nvm](https://github.com/nvm-sh/nvm) (Mac/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows)

#### 3. Port Conflicts
If port 3000 is already in use, React will ask if you want to use a different port. Type 'Y' to accept.

#### 4. Dependency Installation Issues
- Try clearing npm cache: `npm cache clean --force`
- On Windows, you might need to run your command prompt as administrator

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode on [http://localhost:3000](http://localhost:3000)
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production to the `build` folder
- `npm run eject`: Ejects the create-react-app configuration

## Customizing the Application

### Tailwind CSS Configuration
- You can customize the app's appearance by editing `tailwind.config.js`
- Add custom CSS in `src/styles/tailwind.css`

### Adding New Pages
1. Create a new file in the `src/pages` directory
2. Add the component to the routes in `src/App.js`

### Adding New Components
1. Decide which category your component belongs to (common, dashboard, settings, etc.)
2. Create a new file in the appropriate subdirectory under `src/components`
3. Import and use the component in your pages or other components

## Deployment

### Building for Production

```bash
npm run build
# or with yarn
yarn build
```

This creates a `build` directory with production-optimized assets.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Connect your GitHub repository or upload the build folder
- **Firebase Hosting**: Deploy using the Firebase CLI
- **AWS Amplify**: Connect your GitHub repository for CI/CD

## Database Schema

The application uses the following tables in Supabase:

### users
Extension of Supabase auth.users with additional profile information.

### teams
```sql
id uuid primary key
name text not null
description text
created_at timestamp with time zone default now()
updated_at timestamp with time zone default now()
```

### team_members
```sql
id uuid primary key
team_id uuid references teams(id)
user_id uuid references auth.users(id)
role text not null -- 'admin', 'member', etc.
created_at timestamp with time zone default now()
```

### workflows
```sql
id uuid primary key
name text not null
description text
team_id uuid references teams(id)
created_by uuid references auth.users(id)
status text not null -- 'active', 'inactive', 'draft'
created_at timestamp with time zone default now()
updated_at timestamp with time zone default now()
```

### tasks
```sql
id uuid primary key
title text not null
description text
assigned_to uuid references auth.users(id)
workflow_id uuid references workflows(id)
status text not null -- 'todo', 'in_progress', 'completed', 'blocked'
priority text not null -- 'low', 'medium', 'high'
due_date timestamp with time zone
created_at timestamp with time zone default now()
updated_at timestamp with time zone default now()
```

### reports
```sql
id uuid primary key
name text not null
description text
created_by uuid references auth.users(id)
team_id uuid references teams(id)
status text not null -- 'draft', 'completed', 'archived'
data jsonb -- report data
created_at timestamp with time zone default now()
updated_at timestamp with time zone default now()
```

### integrations
```sql
id uuid primary key
name text not null
service text not null -- 'salesforce', 'slack', etc.
config jsonb -- integration configuration
team_id uuid references teams(id)
status text not null -- 'connected', 'disconnected', 'error'
last_sync timestamp with time zone
created_at timestamp with time zone default now()
updated_at timestamp with time zone default now()
```

### user_settings
```sql
user_id uuid primary key references auth.users(id)
account jsonb -- account settings
notifications jsonb -- notification preferences
appearance jsonb -- theme preferences
security jsonb -- security settings
api_access jsonb -- api keys and access
billing jsonb -- billing information
created_at timestamp with time zone default now()
updated_at timestamp with time zone default now()
```

## Authentication

FlowSync uses Supabase Authentication for user management. The app supports:

- Email/password authentication
- Social login (GitHub, Google)
- Password reset
- User profile management

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
- [Supabase](https://supabase.com/)