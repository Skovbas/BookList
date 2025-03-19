# Book Management System

## Описание

Это одностраничное веб-приложение для управления списком книг. Приложение включает фронтенд на React и бэкенд на Django с использованием Django REST Framework (DRF). Пользователи могут добавлять, редактировать, удалять книги, а также выбирать авторов для каждой книги.

Приложение взаимодействует с REST API для получения данных о книгах и авторах, а также для выполнения операций CRUD с этими данными.

## Функциональные требования

### Функции для пользователя:

- **Отображение списка книг**: Приложение отображает список всех книг с названием и именем автора.
- **Добавление новой книги**: Пользователь может добавить новую книгу, указав название и автора.
- **Редактирование книги**: Пользователь может отредактировать существующую книгу, обновив её название или автора.
- **Удаление книги**: Пользователь может удалить книгу из списка.
- **Выбор авторов**: При добавлении или редактировании книги пользователь может выбрать автора из выпадающего списка, который загружается через API.

#### Операции с API:

- Получение списка книг.
- Получение списка авторов.
- Добавление новой книги.
- Редактирование книги.
- Удаление книги.

#### Обработка ошибок:

- В случае ошибок API отображаются соответствующие сообщения для пользователя.

### Технологии:

- **Фронтенд**: React, Axios (for API requests), React Router.
- **Запросы**: Axios.

## Бэкенд

- **Бекенд**: Django, Django REST Framework, SQLite

### Модели:

- **Автор**:
  - Имя (строка, максимум 255 символов).
  - Дата рождения (опционально).
- **Книга**:
  - Название (строка, максимум 255 символов).
  - Автор (внешний ключ на модель автора).

### API Endpoints:

- **CRUD операции для модели автора**:
  - Создание, получение, обновление, удаление автора.
- **CRUD операции для модели книги**:
  - Создание, получение, обновление, удаление книги.

### Реализация API:

- Реализованы сериализаторы и вьюсеты для моделей.
- Реализованы маршруты для взаимодействия с API.

### English verision

# Book Management System

A full-stack application that allows users to manage a list of books. The project includes a React frontend and a Django backend using Django REST Framework (DRF). Users can add, edit, delete, and view books and authors.

## Project Description

This project consists of two parts:

1. **Frontend (React)**: The React app provides a user interface that allows users to interact with the backend. It enables users to:

   - View a list of books.
   - Add new books with information such as title, author, and genre.
   - Edit and delete existing books.
   - View a list of available authors.

2. **Backend (Django REST Framework)**: The backend is built with Django and DRF and handles the logic for managing books and authors. It provides the following API endpoints:

## Tech Stack

- **Frontend**: React, Axios (for API requests), React Router
- **Backend**: Django, Django REST Framework, SQLite

## Installation and Setup

### Prerequisites

- Python 3.x
- Node.js and npm

### 1. Backend (Django)

#### Clone the repository

```
git clone <repository_url>
cd Booklist/booklist
```

### Create and activate a virtual environment

```
python -m venv env
source env/bin/activate
```

### Install backend dependencies

```
pip install -r requirements.txt
```

### Run migrations

```
python manage.py migrate
```

### 2. Frontend ( React)

### Navigate to the frontend folder

```
cd ../frontend
```

### Install frontend dependencies

```
npm install
```

### Start the frontend development server

```
npm start
```

The frontend will be running at http://localhost:3000/.
