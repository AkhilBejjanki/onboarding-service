# Support & Onboarding Backend Service

This is a backend service built with Node.js, Express, PostgreSQL, and TypeORM. It manages user authentication, complaint handling, and sends automated onboarding reminders through a scheduled job.

---

## Setup Steps

### 1. Clone the repository

```bash
git clone https://github.com/AkhilBejjanki/onboarding-service
cd onboarding-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_URL=postgres://<db_user>@localhost:5432/support_db
JWT_SECRET=your_jwt_secret
```

### 4. Start PostgreSQL

Ensure PostgreSQL is running and create the database:

```sql
CREATE DATABASE support_db;
```

### 5. Run the application

```bash
npm run dev
```

The server will start at: **http://localhost:3000**

### 6. API Documentation

The API documentation is available through Swagger UI at http://localhost:3000/docs where you can test all endpoints.

---

## Environment Variables

| Variable      | Description                    |
|---------------|--------------------------------|
| PORT          | Server port                    |
| DB_URL        | PostgreSQL connection string   |
| JWT_SECRET    | Secret key for JWT authentication |

---

## Database Structure

### 1. users
Stores registered users and onboarding progress.

| Column            | Description                  |
|-------------------|------------------------------|
| id                | Primary key                  |
| name              | User name                    |
| email             | Unique email                 |
| password          | Hashed password              |
| onboarding_stage  | Current onboarding stage     |
| created_at        | User registration time       |

### 2. complaints
Stores complaints raised by users.

| Column            | Description                  |
|-------------------|------------------------------|
| id                | Complaint ID                 |
| user_id           | Linked user                  |
| complaint_type    | Type of complaint            |
| status            | Complaint status             |
| payload           | JSON data related to complaint |
| created_at        | Created time                 |
| status_updated_at | Last status update           |

### 3. notifications
Stores triggered notifications (notification sending is mocked).

| Column      | Description              |
|-------------|--------------------------|
| id          | Notification ID          |
| user_id     | Linked user              |
| title       | Notification title       |
| body        | Notification content     |
| is_sent     | Delivery status          |
| created_at  | Sent time                |

### 4. onboarding_reminders
Tracks onboarding reminders to ensure reminders are sent only once.

| Column          | Description           |
|-----------------|-----------------------|
| id              | Reminder ID           |
| user_id         | Linked user           |
| stage           | Onboarding stage      |
| reminder_level  | Reminder sequence     |
| sent_at         | Reminder timestamp    |


---

## Onboarding Reminder System

The application includes a scheduled job that runs every 10 minutes to check for inactive users and send onboarding reminders based on predefined time rules. The system prevents duplicate reminders by tracking them in the database.

---

## Key Features

- JWT-based authentication
- Complaint lifecycle with valid status transitions
- Time-based complaint metrics
- Cron job with idempotency
- Swagger API documentation
- PostgreSQL + TypeORM integration

---

## Testing

The application has been tested using Swagger UI for API endpoints. Database operations have been verified through PostgreSQL queries.
