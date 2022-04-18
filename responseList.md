Список запросов:

- POST "/api/register" регистрация пользователя
  Передать JSON-файл с полями: "email", "password".
  Возвращает поле sesID - id сессии.
  Пример: POST http://localhost:8080/api/register/login
  JSON: 
  {
    "email" : "test123@email.ru",
    "password": "123456789"
  }

- GET "/api/register" валидация пользователя
  Передать параметр sesID.
  Возвращает поле email или 400, если пользователя не существует.

- POST "/api/register/login"
  Передать два параметра: email и password.
  Возвращает поле sesID или 400, если пароль неверный. 


Рецепт содержит следующие поля:

- String name
- String category
- String description
- String mainPicture
- int cookingDuration
- int portionNumber
- List<String> directions - последовательность шагов в рецепте
- List<String> stepsPictures
- String author - передавать сессию пользователя
- int views - передавать 0
- int likes - передавать 0
- int dislikes - передавать 0
