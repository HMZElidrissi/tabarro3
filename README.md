<p align="center"><a href="https://tabarro3.ma/" target="_blank"><img src="public/logo.svg" width="400" alt="tabarro3 Logo"></a></p>

## tabarro3

tabarro3 is a platform aimed at raising awareness about blood donation in Morocco by connecting potential donors with those in need. The name "tabarro3" is derived from the Arabic word تبرع (tabara'), which means "to donate.". It addresses the challenges of awareness and ease of access in blood donation and the difficulty of finding donors in emergencies.

## Technologies Used

- Laravel 10 (RESTful API)
- Next.js + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)

## Getting Started

- Clone the repository

```bash
git clone https://github.com/HMZElidrissi/tabarro3.git
```

- Install dependencies

```bash
cd tabarro3
composer install
```

- Create a `.env` file and copy the contents of `.env.example` to it

```bash
cp .env.example .env
```

- Generate an application key

```bash
php artisan key:generate
```

- Generate a JWT secret

```bash
php artisan jwt:secret
```

- Run the migrations

```bash
php artisan migrate
```

- Start the development server

```bash
php artisan serve
```

## Frontend

> The Frontend is available at [tabarro3 Frontend](https://github.com/HMZElidrissi/tabarro3-frontend)
